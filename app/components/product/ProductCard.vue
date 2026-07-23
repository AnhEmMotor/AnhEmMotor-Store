<script setup>
import { ref, computed, watch } from "vue";
import { toast } from "vue3-toastify";
import { useCart } from "~/composables/useCart";

import ProductColorChip from "./ProductColorChip.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  showAction: {
    type: Boolean,
    default: false,
  },
});

const selectedVariant = ref(null);
const selectedColorKey = ref(null);
const { addItem } = useCart();
const route = useRoute();

const colorKey = (color, index) => color?.id ?? `index:${index}`;
const normalizeText = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("vi-VN")
    .trim();

watch(
  [() => props.product, () => route.query.versions, () => route.query.colors],
  ([newProd, urlVersions, urlColors]) => {
    if (!newProd) {
      selectedVariant.value = null;
      selectedColorKey.value = null;
      return;
    }

    const versionsList = urlVersions ? String(urlVersions).split(",").map(v => v.trim().toLowerCase()) : [];
    const colorsList = urlColors ? String(urlColors).split(",").map(c => c.trim().toLowerCase()) : [];

    let matchedVariant = null;
    let matchedColor = null;
    let matchedColorIndex = -1;

    for (const v of newProd.variants || []) {
      const fullVName = (v.option_values_text || v.variantName || v.name || "").trim();
      const cleanVName = fullVName.split(" - ")[0].trim().toLowerCase();
      const matchesVersion = versionsList.length === 0 || versionsList.includes(cleanVName);

      if (matchesVersion) {
        if (colorsList.length > 0) {
          const colors = v.colors || [];
          for (let i = 0; i < colors.length; i++) {
            const cName = (colors[i].name || colors[i].colorName || "").trim().toLowerCase();
            if (colorsList.includes(cName)) {
              matchedVariant = v;
              matchedColor = colors[i];
              matchedColorIndex = i;
              break;
            }
          }
        } else {
          matchedVariant = v;
          break;
        }
      }
      if (matchedVariant) break;
    }

    selectedVariant.value = matchedVariant || newProd.variants?.[0] || null;
    
    if (matchedColor) {
      selectedColorKey.value = colorKey(matchedColor, matchedColorIndex);
    } else {
      selectedColorKey.value = null;
    }
  },
  { immediate: true },
);

const selectedVariantColors = computed(() => selectedVariant.value?.colors ?? []);

const selectedColor = computed(() => {
  const colors = selectedVariantColors.value;
  if (!colors.length || selectedColorKey.value === null) return null;
  return colors.find((color, index) => colorKey(color, index) === selectedColorKey.value) ?? null;
});

const currentPrice = computed(() => {
  const price = selectedVariant.value?.price ?? props.product.price;
  if (!price) return "N/A";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
});

const currentImage = computed(() => {
  return (
    selectedColor.value?.image ||
    selectedColor.value?.coverImageUrl ||
    selectedColor.value?.cover_image_url ||
    selectedVariant.value?.coverImageUrl ||
    selectedVariant.value?.cover_image_url ||
    selectedVariant.value?.image ||
    props.product?.coverImageUrl ||
    props.product?.image ||
    "/assets/image/placeholder-product.webp"
  );
});

const isPlaceholderImage = computed(() =>
  currentImage.value.includes("dummyimage.com"),
);

const currentUrl = computed(() => {
  const slug =
    selectedVariant.value?.url ||
    selectedVariant.value?.url_slug ||
    selectedVariant.value?.urlSlug ||
    props.product?.slug;
  return slug ? `/product/${slug}` : "#";
});

const chipVariants = computed(() => {
  const list = props.product?.variants ?? [];
  const variants = list
    .filter(
      (v) => (v.option_values_text ?? v.variant_name ?? "").trim().length > 0,
    )
    .map((v) => {
      const fullLabel = (v.option_values_text ?? v.variant_name ?? "").trim();
      const label = fullLabel.includes(" - ") ? fullLabel.split(" - ")[0].trim() : fullLabel;
      return {
        variant: v,
        label: label,
      };
    });

  if (variants.length !== 1) return variants;

  const searchTerm = normalizeText(route.query.search);
  return searchTerm && normalizeText(variants[0].label).includes(searchTerm)
    ? variants
    : [];
});

const hasVariantControls = computed(
  () => chipVariants.value.length > 0 || selectedVariantColors.value.length > 0,
);

const applyVariant = (variant) => {
  selectedVariant.value = variant;
  selectedColorKey.value = null;
};

const applyColor = (color, index) => {
  selectedColorKey.value = colorKey(color, index);
};

const colorLabel = (color, index) =>
  color?.name || color?.colorName || color?.colorCode || color?.code || `Màu ${index + 1}`;

const handleAddToCart = () => {
  const variant = selectedVariant.value;
  if (!variant) return;

  if (selectedVariantColors.value.length > 0 && !selectedColor.value) {
    toast.warning("Vui lòng chọn màu sản phẩm.");
    return;
  }

  const colorId =
    selectedColor.value?.id && Number(selectedColor.value.id) > 0
      ? Number(selectedColor.value.id)
      : null;
  const variantLabel = variant.option_values_text || variant.variant_name || "";
  const selectedColorLabel = selectedColor.value
    ? colorLabel(selectedColor.value, 0)
    : "";
  const name = [props.product.name, variantLabel, selectedColorLabel]
    .filter(Boolean)
    .join(" - ");

  addItem(
    {
      id: `${variant.id}:${colorId ?? 0}`,
      cartKey: `${variant.id}:${colorId ?? 0}`,
      productVariantId: variant.id,
      productVariantColorId: colorId,
      name,
      displayName: name,
      price: variant.price,
      image: useAssetUrl(currentImage.value),
      effectiveMax:
        selectedColor.value?.effectiveMax ??
        selectedColor.value?.maxPurchaseQuantity ??
        variant.effectiveMax ??
        props.product.effectiveMax ??
        props.product.productLimit ??
        null,
    },
    1,
  );
};

const compareStore = useCompareStore();
const isCompared = computed(() =>
  compareStore.products.some((p) => p.id === props.product.id),
);

const toggleCompare = (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (isCompared.value) {
    compareStore.removeProduct(props.product.id);
  } else {
    compareStore.addProduct({
      id: props.product.id,
      name: props.product.name,
      slug: props.product.slug,
      brand: props.product.brand,
      image: useAssetUrl(currentImage.value),
      price: selectedVariant.value?.price,
    });
  }
};
</script>

<template>
  <NuxtLink
    :to="currentUrl"
    class="group relative bg-white rounded-24 overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 border border-slate-100 flex flex-col h-full"
  >
    <div
      class="relative h-48 sm:h-52 lg:h-60 overflow-hidden"
      :class="isPlaceholderImage ? 'bg-slate-900' : 'bg-slate-50'"
    >
      <img
        :src="useAssetUrl(currentImage)"
        :alt="product.name"
        class="w-full h-full transition-transform duration-700"
        :class="isPlaceholderImage ? 'object-contain' : 'object-cover group-hover:scale-110'"
      >

      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <button
        class="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10 backdrop-blur-md border"
        :class="isCompared ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' : 'bg-white/80 border-slate-100 text-slate-400 hover:text-primary hover:bg-white'"
        :title="isCompared ? 'Xóa khỏi danh sách so sánh' : 'Thêm vào so sánh'"
        @click="toggleCompare"
      >
        <Icon :name="isCompared ? 'ph:check-bold' : 'ph:git-diff-bold'" class="text-lg" />
      </button>

      <div v-if="product.brand" class="absolute bottom-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
        {{ product.brand }}
      </div>
    </div>

    <div class="p-4 sm:p-5 flex flex-col flex-1">
      <h3
        class="text-slate-900 font-bold text-base sm:text-lg mb-2 line-clamp-2 min-h-[2.25rem] sm:min-h-[2.75rem] group-hover:text-primary transition-colors"
      >
        {{ product.name }}
      </h3>

      <div
        v-if="hasVariantControls"
        class="variant-selector mb-3"
        :class="{ 'variant-selector--single': chipVariants.length === 0 || selectedVariantColors.length === 0 }"
      >
        <div v-if="chipVariants.length > 0" class="variant-section">
          <div class="variant-section__label">
            <span>Phiên bản</span>
          </div>
          <div class="variant-section__chips">
            <ProductColorChip
              v-for="cv in chipVariants"
              :key="cv.variant.id"
              class="variant-chip"
              :label="cv.label"
              :selected="selectedVariant?.id === cv.variant.id"
              @select="applyVariant(cv.variant)"
            />
          </div>
        </div>

        <div
          v-if="selectedVariantColors.length > 0"
          class="variant-section"
          :class="{ 'variant-section--separated': chipVariants.length > 0 }"
        >
          <div class="variant-section__label">
            <span>Màu sắc</span>
          </div>
          <div class="variant-section__chips">
            <ProductColorChip
              v-for="(color, index) in selectedVariantColors"
              :key="colorKey(color, index)"
              class="variant-chip"
              :label="colorLabel(color, index)"
              :selected="selectedColorKey === colorKey(color, index)"
              @select="applyColor(color, index)"
            />
          </div>
        </div>
      </div>

      <div class="mt-auto flex flex-col gap-0.5 mb-3">
        <span class="text-xs text-slate-400 font-medium">Giá từ</span>
        <span class="text-primary font-bold text-xl sm:text-2xl tracking-tight">{{ currentPrice }}</span>
      </div>

      <div class="pt-3 border-t border-slate-50 flex items-center gap-2">
        <button
          type="button"
          class="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold transition-all duration-300 hover:bg-primary shadow-sm flex items-center justify-center gap-2"
          @click.prevent.stop="handleAddToCart"
        >
          <Icon name="fa6-solid:cart-plus" class="text-sm" />
          Thêm vào giỏ
        </button>
        <div
          v-if="showAction"
          class="h-11 w-11 shrink-0 bg-white border border-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-all duration-300 hover:border-primary hover:text-primary shadow-sm flex items-center justify-center"
          title="Xem chi tiết"
        >
          <Icon name="ph:arrow-right-bold" class="text-sm" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.text-primary {
  color: #e31837;
}
.group:hover .text-primary {
  color: #c4122d;
}

.variant-selector {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-height: 8.25rem;
  max-height: 12rem;
  overflow: hidden;
}

.variant-selector--single {
  min-height: 5.5rem;
  max-height: 5.5rem;
}

.variant-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-height: 0;
}

.variant-selector:not(.variant-selector--single) .variant-section:first-child {
  flex: 1 1 auto;
  max-height: 5.125rem;
}

.variant-selector:not(.variant-selector--single) .variant-section--separated {
  flex: 0 0 5rem;
  max-height: 5rem;
}

.variant-section--separated {
  padding-top: 0.25rem;
  border-top: 1px solid #f1f5f9;
}

.variant-section__label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 0.625rem;
  font-size: 0.625rem;
  font-weight: 900;
  line-height: 1;
  color: #94a3b8;
  text-transform: none;
  font-variant-caps: normal;
}

.variant-section__label::after {
  flex: 1;
  height: 1px;
  content: "";
  background: #f1f5f9;
}

.variant-section__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  align-content: flex-start;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: none;
}

.variant-section__chips::-webkit-scrollbar {
  display: none;
}

.variant-chip {
  height: 1.75rem;
  padding-right: 0.625rem;
  padding-left: 0.625rem;
  font-size: 0.71875rem;
}
</style>
