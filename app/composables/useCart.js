import { ref, computed, watch, h } from 'vue';
import { toast } from 'vue3-toastify';
import { useQuery } from '@tanstack/vue-query';
import { getImageUrl } from '~/utils/image';

const CART_KEY = 'cartItems';
const cartItems = ref([]);
const isCartPanelOpen = ref(false);

const keyPartsFor = (item) => {
  const rawVariantId = item.productVariantId ?? item.variantId ?? item.id;
  const rawString = String(rawVariantId || '');
  const variantPart = rawString.split(':')[0];
  let variantId = variantPart;
  // if it's purely numeric, convert to number, otherwise keep as string (for UUIDs)
  if (variantPart && !isNaN(Number(variantPart))) {
    variantId = Number(variantPart);
  }
  const rawColorId = item.productVariantColorId ?? item.colorId ?? rawString.split(':')[1] ?? null;
  let colorId = rawColorId;
  if (colorId === '0' || colorId === 0 || colorId === 'undefined' || colorId === 'null') {
    colorId = null;
  } else if (colorId != null && !isNaN(Number(colorId))) {
    colorId = Number(colorId);
  }
  return { variantId, colorId };
};

const cartKeyFor = (item) => {
  const { variantId, colorId } = keyPartsFor(item);
  return `${variantId}:${colorId}`;
};

const normalizeCartItem = (item) => {
  const { variantId, colorId } = keyPartsFor(item);
  return {
    ...item,
    id: `${variantId}:${colorId}`,
    cartKey: `${variantId}:${colorId}`,
    productVariantId: variantId,
    productVariantColorId: colorId || null,
    quantity: Math.max(Number(item.quantity || 1), 1),
  };
};

if (import.meta.client) {
  const stored = localStorage.getItem(CART_KEY);
  if (stored) {
    try {
      cartItems.value = JSON.parse(stored)
        .map(normalizeCartItem)
        .filter((item) => item.productVariantId != null && String(item.productVariantId) !== 'NaN');
    } catch {
      cartItems.value = [];
    }
  }
}

watch(
  cartItems,
  (val) => {
    if (import.meta.client) localStorage.setItem(CART_KEY, JSON.stringify(val));
  },
  { deep: true }
);

export function useCart() {
  const axios = useAxios();

  const variantIds = computed(() => [
    ...new Set(
      cartItems.value
        .map((item) => keyPartsFor(item).variantId)
        .filter((id) => id && (Number.isFinite(id) || (typeof id === 'string' && id.trim() !== '')))
    ),
  ]);

  const {
    data: batchDetails,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['cart-details-batch', variantIds],
    queryFn: async () => {
      const ids = variantIds.value;
      if (ids.length === 0) return [];
      const { data } = await axios.post('/api/v1/Product/variants-cart-details-batch', ids);
      return data;
    },
    enabled: computed(() => !!variantIds.value.length),
    staleTime: 1000 * 60 * 10,
  });

  const detailMap = computed(() => {
    const map = new Map();
    (batchDetails.value || []).forEach((d) => map.set(String(d.id), d));
    return map;
  });

  const resolveEffectiveMax = (item) => {
    const { variantId, colorId } = keyPartsFor(item);
    const detail = detailMap.value.get(String(variantId));
    const color = (detail?.colors || []).find((c) => Number(c.id) === colorId);
    return (
      color?.effectiveMax ??
      color?.maxPurchaseQuantity ??
      detail?.effectiveMax ??
      detail?.productLimit ??
      detail?.product_limit ??
      item.effectiveMax ??
      null
    );
  };

  const warnMax = (limit) => {
    toast.warning(
      limit
        ? `Da dat so luong mua toi da (${limit}) cho san pham nay.`
        : 'Da dat so luong mua toi da cho san pham nay.'
    );
  };

  const cartDetails = computed(() =>
    cartItems.value.map((item) => {
      const { variantId, colorId } = keyPartsFor(item);
      const detail = detailMap.value.get(String(variantId));
      const color = (detail?.colors || []).find((c) => Number(c.id) === colorId);
      const key = `${variantId}:${colorId}`;
      return {
        ...item,
        id: key,
        cartKey: key,
        name: item.name || detail?.displayName || 'San pham',
        price: detail?.price ?? item.price ?? 0,
        image:
          (color?.coverImageUrl ? getImageUrl(color.coverImageUrl) : null) ||
          item.image ||
          (detail?.coverImageUrl ? getImageUrl(detail.coverImageUrl) : null) ||
          '/assets/image/placeholder-product.webp',
        loading: false,
        productVariantId: variantId,
        productVariantColorId: colorId || null,
        effectiveMax: resolveEffectiveMax(item),
        managementType: detail?.managementType || null,
      };
    })
  );

  const cartTotal = computed(() =>
    cartDetails.value.reduce((t, item) => t + item.price * item.quantity, 0)
  );

  function addItem(product, quantity = 1) {
    const { variantId, colorId } = keyPartsFor(product);

    const key = `${variantId}:${colorId}`;
    const probe = {
      ...product,
      productVariantId: variantId,
      productVariantColorId: colorId,
    };
    const effectiveMax = product.effectiveMax ?? resolveEffectiveMax(probe);

    if (effectiveMax != null && effectiveMax <= 0) {
      warnMax(effectiveMax);
      return;
    }
    if (effectiveMax != null && quantity > effectiveMax) {
      quantity = effectiveMax;
      warnMax(effectiveMax);
    }

    const idx = cartItems.value.findIndex((i) => cartKeyFor(i) === key);
    let newQuantity = quantity;

    if (idx === -1) {
      cartItems.value.push({
        id: key,
        cartKey: key,
        productVariantId: variantId,
        productVariantColorId: colorId || null,
        name: product.displayName || product.name,
        price: product.price,
        image: product.image || product.coverImageUrl,
        effectiveMax,
        quantity,
      });
    } else {
      const existing = cartItems.value[idx];
      const merged = existing.quantity + quantity;
      const clamped = effectiveMax != null ? Math.min(merged, effectiveMax) : merged;
      existing.quantity = clamped;
      existing.effectiveMax = effectiveMax;
      newQuantity = clamped;
      if (clamped < merged) warnMax(effectiveMax);
    }

    if (import.meta.client) {
      const toastId = toast.success(
        h('div', { class: 'flex flex-col gap-2' }, [
          h(
            'div',
            { class: 'text-base font-semibold text-gray-800' },
            `Đã thêm ${product.displayName || product.name} vào giỏ hàng.`
          ),
          h('div', { class: 'text-sm text-gray-500' }, `Số lượng: ${newQuantity}`),
          h(
            'button',
            {
              class:
                'mt-3 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors w-fit shadow-sm',
              onClick: (e) => {
                e.preventDefault();
                toast.remove(toastId);
                isCartPanelOpen.value = true;
              },
            },
            'Xem giỏ hàng & Thanh toán'
          ),
        ]),
        {
          autoClose: 4000,
          closeOnClick: false,
        }
      );
    }
  }

  function removeItem(indexOrKey) {
    if (typeof indexOrKey === 'number') {
      cartItems.value.splice(indexOrKey, 1);
      return;
    }
    const index = cartItems.value.findIndex((item) => cartKeyFor(item) === String(indexOrKey));
    if (index >= 0) cartItems.value.splice(index, 1);
  }

  function updateQuantity(idOrPayload, change) {
    const clampToLimit = (item, desiredQty) => {
      const limit = resolveEffectiveMax(item);
      if (limit != null && desiredQty > limit) return limit;
      return Math.max(desiredQty, 1);
    };

    if (typeof idOrPayload === 'object' && idOrPayload.index !== undefined) {
      const { index, change: c } = idOrPayload;
      const item = cartItems.value[index];
      if (!item) return;
      const newQty = item.quantity + c;
      const clamped = clampToLimit(item, newQty);
      if (clamped <= 0) cartItems.value.splice(index, 1);
      else item.quantity = clamped;
      if (clamped < newQty) warnMax(resolveEffectiveMax(item));
    } else {
      const qty = change;
      const item = cartItems.value.find((i) => cartKeyFor(i) === String(idOrPayload));
      if (!item) return;
      if (qty <= 0) {
        const idx = cartItems.value.indexOf(item);
        cartItems.value.splice(idx, 1);
      } else {
        const clamped = clampToLimit(item, qty);
        item.quantity = clamped;
        if (clamped < qty) warnMax(resolveEffectiveMax(item));
      }
    }
  }

  function clearCart() {
    cartItems.value = [];
  }

  return {
    cartItems,
    cartDetails,
    cartTotal,
    isPending,
    refreshDetails: refetch,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isCartPanelOpen,
  };
}

export default useCart;
