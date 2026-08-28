<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import ProductBookingModal from '~/components/product/BookingModal.vue';
definePageMeta({
  path: '/product/:slug',
});

const route = useRoute();
const slug = computed(() => route.params.slug);
const productStore = useProductStore();
const nuxtApp = useNuxtApp();

const {
  data: detail,
  pending: isLoading,
  error,
} = await useAsyncData(
  'product-detail-' + slug.value,
  () => productStore.fetchFullProductDetail(slug.value),
  {
    watch: [slug],
  }
);

let viewStartAt = null;
let trackedProductId = null;

const flushProductView = () => {
  if (!trackedProductId || !viewStartAt) return;
  const dwellTimeMs = Date.now() - viewStartAt;
  const productId = trackedProductId;
  trackedProductId = null;
  viewStartAt = null;
  nuxtApp.runWithContext(() =>
    productStore.trackView(productId, dwellTimeMs, getOrCreateVisitorKey())
  );
};

const startTrackingCurrentProduct = () => {
  const productId = detail.value?.product?.id;
  if (!productId) return;
  trackedProductId = productId;
  viewStartAt = Date.now();
};

const handleVisibilityChange = () => {
  if (document.hidden) {
    flushProductView();
  } else {
    startTrackingCurrentProduct();
  }
};

watch(
  () => detail.value?.product?.id,
  () => {
    flushProductView();
    startTrackingCurrentProduct();
  }
);

onMounted(() => {
  startTrackingCurrentProduct();
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('beforeunload', flushProductView);
});

onBeforeUnmount(() => {
  flushProductView();
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  window.removeEventListener('beforeunload', flushProductView);
});

const currentVariant = computed(() => detail.value?.currentVariant);
const selectedColorIndex = ref(0);
const selectedImage = ref(null);

const mainImage = computed({
  get: () => {
    if (selectedImage.value) return selectedImage.value;
    const colorImage =
      currentVariant.value?.colors?.[selectedColorIndex.value]?.image ||
      currentVariant.value?.colors?.[selectedColorIndex.value]?.coverImageUrl;
    if (colorImage) return colorImage;
    return (
      detail.value?.currentVariant?.photos?.[0] ||
      detail.value?.currentVariant?.image ||
      detail.value?.currentVariant?.coverImageUrl ||
      detail.value?.currentVariant?.cover_image_url ||
      '/assets/image/placeholder-product.webp'
    );
  },
  set: (val) => {
    selectedImage.value = val;
  },
});

const isPlaceholderImage = computed(() => {
  const img = mainImage.value || '';
  return img.includes('placeholder-product') || img.includes('placeholder');
});

const formattedPrice = computed(() => productMapper.formatPrice(currentVariant.value?.price));
const { depositSettings } = useStoreSettings();

const showDepositInfo = computed(() => {
  const price = currentVariant.value?.price || 0;
  const limit = depositSettings.value.orderValueExceeds || 60000000;
  return price >= limit;
});

const depositAmount = computed(() => {
  const price = currentVariant.value?.price || 0;
  const ratio = depositSettings.value.depositRatio || 30;
  return productMapper.formatPrice(price * (ratio / 100));
});
const variantName = computed(() => currentVariant.value?.name || '');
const specifications = computed(() => detail.value?.specifications || []);
const specGroups = computed(() => {
  if (!specifications.value.length) return [];

  const grouping = [
    {
      title: 'Động cơ & Truyền động',
      icon: 'gauge-high',
      keys: [
        'EngineType',
        'engine_type',
        'Displacement',
        'displacement',
        'BoreStroke',
        'bore_stroke',
        'CompressionRatio',
        'compression_ratio',
        'MaxPower',
        'max_power',
        'MaxTorque',
        'max_torque',
        'FuelSystem',
        'fuel_system',
        'TransmissionType',
        'transmission_type',
        'StarterSystem',
        'starter_system',
        'FuelConsumption',
        'fuel_consumption',
        'OilCapacity',
        'oil_capacity',
      ],
    },
    {
      title: 'Kích thước & Trọng lượng',
      icon: 'ruler-combined',
      keys: [
        'Dimensions',
        'dimensions',
        'Wheelbase',
        'wheelbase',
        'SeatHeight',
        'seat_height',
        'GroundClearance',
        'ground_clearance',
        'Weight',
        'weight',
        'FuelCapacity',
        'fuel_capacity',
      ],
    },
    {
      title: 'Khung xe & Phanh',
      icon: 'shield-halved',
      keys: [
        'FrameType',
        'frame_type',
        'FrontSuspension',
        'front_suspension',
        'RearSuspension',
        'rear_suspension',
        'FrontTireSize',
        'front_tire_size',
        'RearTireSize',
        'rear_tire_size',
        'FrontBrake',
        'front_brake',
        'RearBrake',
        'rear_brake',
        'TireSize',
        'tire_size',
      ],
    },
    {
      title: 'Hệ thống điện',
      icon: 'bolt',
      keys: [
        'BatteryType',
        'battery_type',
        'LightingSystem',
        'lighting_system',
        'DashboardType',
        'dashboard_type',
      ],
    },
  ];

  return grouping
    .map((g) => ({
      ...g,
      specs: specifications.value.filter((s) => g.keys.includes(s.key)),
    }))
    .filter((g) => g.specs.length > 0);
});
const highlights = computed(() => detail.value?.product?.highlights || []);

const expandedGroups = ref([]);
const toggleGroup = (title) => {
  const index = expandedGroups.value.indexOf(title);
  if (index > -1) {
    expandedGroups.value.splice(index, 1);
  } else {
    expandedGroups.value.push(title);
  }
};
const isGroupExpanded = (title) => expandedGroups.value.includes(title);

const variantGroups = computed(() => {
  if (!detail.value?.otherVariants) return {};
  const groups = {};
  const all = [...(detail.value.otherVariants || [])];
  if (detail.value.currentVariant) {
    all.push({
      ...detail.value.currentVariant,
      isCurrent: true,
    });
  }

  all.forEach((v) => {
    const name = v.name || 'Tiêu chuẩn';
    if (!groups[name]) groups[name] = [];
    groups[name].push(v);
  });
  return groups;
});

const requestedVariantId = computed(() =>
  route.query.variant ? Number(route.query.variant) : null
);
const findVariantGroupContaining = (variantId, groups) =>
  Object.entries(groups).find(([, variants]) =>
    variants.some((v) => Number(v.id) === variantId)
  )?.[0];

const selectedVariantGroup = ref('');
watch(
  [requestedVariantId, variantGroups],
  ([variantId, groups]) => {
    const fallback = variantName.value || Object.keys(groups)[0] || '';
    const requestedGroup = variantId ? findVariantGroupContaining(variantId, groups) : null;
    selectedVariantGroup.value = requestedGroup || fallback;
  },
  { immediate: true }
);

const currentGroupVariants = computed(() => {
  return variantGroups.value[selectedVariantGroup.value] || [];
});

watch(selectedVariantGroup, (newGroup) => {
  const groupVariants = variantGroups.value[newGroup] || [];
  if (groupVariants.length > 0) {
    const exists = groupVariants.find((v) => v.slug === slug.value);
    if (!exists) {
      navigateTo(`/product/${groupVariants[0].slug}`);
    }
  }
});

const requestedColorId = computed(() => (route.query.color ? Number(route.query.color) : null));
watch(
  [requestedColorId, currentVariant],
  ([colorId, variant]) => {
    const colors = variant?.colors || [];
    const requestedIndex = colorId ? colors.findIndex((c) => Number(c.id) === colorId) : -1;
    selectedColorIndex.value = requestedIndex >= 0 ? requestedIndex : 0;
  },
  { immediate: true }
);

watch(slug, () => {
  selectedImage.value = null;
});

useSeoMeta(productMapper.toSeoMeta(detail.value));

useHead({
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
});

const { addItem } = useCart();
const onAddToCart = () => {
  const cartItem = productMapper.toCartItem(detail.value, selectedColorIndex.value);
  if (cartItem) addItem(cartItem, 1);
};

const buyNow = () => {
  onAddToCart();
  navigateTo('/process-order');
};

const isMotorbike = computed(() => {
  const cat = detail.value?.product?.category?.toLowerCase() || '';
  return cat.includes('xe máy') || cat.includes('motor');
});

const openConsultation = () => {
  window.open('https://zalo.me/your-zalo-id', '_blank');
};

const isBookingModalOpen = ref(false);
const bookTestDrive = () => {
  navigateTo('/test-drive');
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
      <nav
        v-if="detail?.product"
        class="flex mb-10 text-[10px] font-black uppercase tracking-[0.2em]"
        aria-label="Breadcrumb"
      >
        <ol class="inline-flex items-center gap-2">
          <li>
            <NuxtLink to="/" class="text-gray-400 hover:text-primary transition-colors"
              >Trang chủ</NuxtLink
            >
          </li>
          <Icon name="fa6-solid:chevron-right" class="text-gray-300 text-[8px]" />
          <li>
            <NuxtLink to="/products" class="text-gray-400 hover:text-primary transition-colors"
              >Sản phẩm</NuxtLink
            >
          </li>
          <Icon name="fa6-solid:chevron-right" class="text-gray-300 text-[8px]" />
          <li class="text-gray-900 truncate max-w-[200px]">
            {{ detail.product.name }}
          </li>
        </ol>
      </nav>

      <div
        v-if="error || (!isLoading && !detail)"
        class="text-center py-32 bg-gray-50 rounded-[3rem]"
      >
        <div class="inline-flex items-center justify-center w-24 h-24 bg-red-50 rounded-full mb-8">
          <Icon name="fa6-solid:triangle-exclamation" class="text-4xl text-primary" />
        </div>
        <h2 class="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
          Không tìm thấy sản phẩm
        </h2>
        <p class="text-gray-500 mb-10 font-medium">
          Sản phẩm có thể đã bị xóa hoặc đường dẫn không chính xác.
        </p>
        <NuxtLink
          to="/products"
          class="inline-flex items-center px-10 py-5 bg-gray-900 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-primary transition-all transform hover:-translate-y-1 shadow-2xl shadow-black/10"
        >
          Quay lại danh sách
        </NuxtLink>
      </div>

      <div
        v-else-if="isLoading && !detail"
        class="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse"
      >
        <div class="lg:col-span-7 aspect-[4/3] bg-gray-100 rounded-[3rem]" />
        <div class="lg:col-span-5 space-y-8">
          <div class="h-12 bg-gray-100 rounded-2xl w-3/4" />
          <div class="h-6 bg-gray-100 rounded-xl w-1/2" />
          <div class="h-32 bg-gray-100 rounded-3xl w-full" />
          <div class="h-16 bg-gray-100 rounded-2xl w-1/3" />
        </div>
      </div>

      <div v-else class="space-y-16 lg:space-y-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative">
          <div class="absolute -top-12 left-0 w-full h-full spotlight pointer-events-none" />

          <div class="lg:col-span-7 space-y-8">
            <div class="relative">
              <div
                class="relative aspect-[16/10] rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 group z-10"
                :class="isPlaceholderImage ? 'bg-gray-50' : 'bg-white'"
              >
                <div class="absolute top-6 left-6 z-20 flex flex-col gap-2">
                  <span
                    class="px-4 py-1.5 bg-gradient-premium text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg animate-glow"
                    >Exclusive Deal</span
                  >
                  <span
                    v-if="detail.product.brand"
                    class="px-4 py-1.5 bg-white/80 backdrop-blur-md text-gray-900 text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-md border border-gray-100"
                    >{{ detail.product.brand }}</span
                  >
                </div>
                <img
                  :src="mainImage"
                  :alt="detail.product.name"
                  class="w-full h-full transition-transform duration-1000 group-hover:scale-105"
                  :class="isPlaceholderImage ? 'object-contain p-8' : 'object-cover'"
                  loading="eager"
                  fetchpriority="high"
                  @error="$event.target.src = '/assets/image/placeholder-product.webp'"
                />
              </div>
              <div
                class="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-20 reflection opacity-30 z-0"
              />
            </div>

            <div
              v-if="currentVariant?.colors?.length > 0"
              class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2"
            >
              <button
                v-for="(color, index) in currentVariant.colors"
                :key="index"
                class="relative w-20 h-20 rounded-[1.5rem] overflow-hidden flex-shrink-0 transition-all duration-500 border-2"
                :class="
                  selectedColorIndex === index
                    ? 'border-primary ring-4 ring-primary/5 scale-105 shadow-xl bg-slate-900'
                    : 'border-transparent hover:border-gray-200 shadow-sm opacity-50 hover:opacity-100 bg-slate-900/80'
                "
                @click="
                  selectedColorIndex = index;
                  selectedImage = null;
                "
              >
                <img
                  :src="
                    color.image ||
                    color.coverImageUrl ||
                    currentVariant.image ||
                    '/assets/image/placeholder-product.webp'
                  "
                  class="w-full h-full object-contain p-2"
                  loading="lazy"
                  @error="$event.target.src = '/assets/image/placeholder-product.webp'"
                />
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
              <div class="md:col-span-7 space-y-4 border-l-2 border-primary/20 pl-6">
                <div class="text-primary font-black uppercase tracking-[0.3em] text-xs">
                  ⚡ ĐỘT PHÁ CÔNG NGHỆ
                </div>
                <p class="text-gray-500 font-medium leading-relaxed max-w-xl text-base">
                  {{
                    detail.product.shortDescription ||
                    'Đỉnh cao kỹ thuật và thiết kế, mang lại trải nghiệm lái đầy phấn khích.'
                  }}
                </p>
              </div>
              <div class="md:col-span-5 grid grid-cols-3 gap-3">
                <div
                  v-for="trust in [
                    { i: 'shield-halved', t: 'Bảo hành', s: '3 năm' },
                    { i: 'truck-fast', t: 'Giao nhanh', s: 'Toàn quốc' },
                    { i: 'headset', t: 'Hỗ trợ', s: '24/7' },
                  ]"
                  :key="trust.t"
                  class="flex flex-col items-center gap-2 p-3 rounded-2xl text-center group hover:bg-white hover:shadow-xl transition-all border border-gray-100/30"
                >
                  <div
                    class="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all"
                  >
                    <Icon :name="`fa6-solid:${trust.i}`" class="text-base" />
                  </div>
                  <div
                    class="text-[8px] font-black text-gray-900 uppercase leading-tight tracking-widest"
                  >
                    {{ trust.t }}<br /><span class="text-gray-400">{{ trust.s }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5">
            <div class="sticky top-28 space-y-8">
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="h-[1px] w-8 bg-primary" />
                  <span class="text-[9px] font-black text-primary uppercase tracking-[0.4em]">{{
                    detail.product.category
                  }}</span>
                </div>
                <h1
                  class="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[0.9] tracking-tighter uppercase reveal-up"
                >
                  {{ detail.product.name }}
                </h1>
              </div>

              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-2">
                  <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest"
                    >Giá từ</span
                  >
                  <div
                    class="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black rounded-md"
                  >
                    GIÁ TỐT NHẤT
                  </div>
                </div>
                <div
                  class="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter"
                >
                  {{ formattedPrice }}
                </div>
                <div
                  v-if="showDepositInfo"
                  class="flex items-center gap-2 text-gray-500 font-bold text-xs"
                >
                  <Icon name="fa6-solid:calendar-check" class="text-primary" />
                  <span
                    >Yêu cầu đặt cọc trước ({{ depositSettings.depositRatio }}%):
                    <span class="text-red-600 font-black text-sm">{{ depositAmount }}</span></span
                  >
                </div>
              </div>

              <div v-if="Object.keys(variantGroups).length > 0" class="space-y-4">
                <div class="space-y-3">
                  <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest"
                    >Cấu hình & Màu sắc
                    <span
                      v-if="currentVariant?.colors?.[selectedColorIndex]"
                      class="text-gray-900 ml-1 text-[11px] normal-case tracking-normal"
                      >-
                      {{
                        currentVariant.colors[selectedColorIndex].name ||
                        currentVariant.colors[selectedColorIndex].colorName ||
                        ''
                      }}</span
                    >
                  </label>
                  <div class="flex flex-wrap items-center gap-4">
                    <div class="relative flex-grow">
                      <select
                        v-model="selectedVariantGroup"
                        class="w-full h-12 pl-4 pr-10 bg-gray-50 border-none rounded-xl font-black text-[10px] text-gray-900 focus:ring-2 focus:ring-primary/5 transition-all cursor-pointer uppercase tracking-wider appearance-none"
                      >
                        <option v-for="(variants, name) in variantGroups" :key="name" :value="name">
                          {{ name }}
                        </option>
                      </select>
                      <Icon
                        name="fa6-solid:chevron-down"
                        class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[8px] pointer-events-none"
                      />
                    </div>
                    <div class="flex items-center gap-2">
                      <template v-for="v in currentGroupVariants" :key="v.slug">
                        <div v-for="(color, cIdx) in v.colors" :key="cIdx" class="relative group">
                          <NuxtLink
                            v-if="v.slug !== currentVariant.slug"
                            :to="`/product/${v.slug}`"
                            class="block w-8 h-8 rounded-full border-2 border-white shadow-sm p-0.5 hover:scale-110 transition-transform"
                            :title="color.name || color.colorName"
                          >
                            <div
                              class="w-full h-full rounded-full border border-black/5"
                              :style="{
                                background: getColorBackground(
                                  color.name || color.colorName || color.code || ''
                                ),
                              }"
                            />
                          </NuxtLink>
                          <button
                            v-else
                            class="block w-8 h-8 rounded-full border-2 transition-all p-0.5 focus:outline-none scale-110"
                            :class="
                              selectedColorIndex === cIdx
                                ? 'border-primary shadow-md ring-2 ring-primary/10'
                                : 'border-white shadow-sm hover:scale-110'
                            "
                            :title="color.name || color.colorName"
                            @click="
                              selectedColorIndex = cIdx;
                              selectedImage = null;
                            "
                          >
                            <div
                              class="w-full h-full rounded-full border border-black/5"
                              :style="{
                                background: getColorBackground(
                                  color.name || color.colorName || color.code || ''
                                ),
                              }"
                            />
                          </button>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-4 pt-2">
                <div class="grid grid-cols-1 gap-3">
                  <template v-if="isMotorbike">
                    <button
                      class="w-full py-5 bg-primary text-white font-black text-xs rounded-[1.5rem] hover:scale-[1.01] active:scale-95 transition-all shadow-lg flex flex-col items-center justify-center gap-1 uppercase tracking-[0.2em] group relative overflow-hidden"
                      @click="openConsultation"
                    >
                      <div class="flex items-center gap-2">
                        TƯ VẤN & BÁO GIÁ
                        <Icon name="fa6-solid:phone-volume" class="text-[10px] animate-bounce" />
                      </div>
                      <span class="text-[7px] opacity-70 normal-case tracking-normal font-bold"
                        >Báo giá lăn bánh & Thủ tục trả góp</span
                      >
                    </button>
                    <button
                      class="w-full py-4 bg-white text-gray-900 border border-primary font-black text-[10px] rounded-[1.5rem] hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-1 uppercase tracking-[0.15em]"
                      @click="bookTestDrive"
                    >
                      <div class="flex items-center gap-2">
                        <Icon name="fa6-solid:motorcycle" class="text-primary" />
                        ĐĂNG KÝ LÁI THỬ
                      </div>
                      <span class="text-[7px] text-gray-400 normal-case tracking-normal font-bold"
                        >Trải nghiệm thực tế tại cửa hàng AnhEm Motor</span
                      >
                    </button>
                  </template>
                  <template v-else>
                    <button
                      class="w-full py-5 bg-primary text-white font-black text-xs rounded-[1.5rem] hover:scale-[1.01] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3 uppercase tracking-[0.2em] group relative overflow-hidden"
                      @click="buyNow"
                    >
                      MUA NGAY — NHẬN ƯU ĐÃI
                      <Icon
                        name="fa6-solid:arrow-right"
                        class="text-[10px] group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                    <button
                      class="w-full py-4 bg-white text-gray-900 border border-primary font-black text-[10px] rounded-[1.5rem] hover:bg-primary/5 transition-all flex items-center justify-center gap-2 uppercase tracking-[0.15em]"
                      @click="onAddToCart"
                    >
                      <Icon name="fa6-solid:cart-plus" class="text-primary" />
                      THÊM VÀO GIỎ
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="product-story overflow-hidden rounded-[2rem] lg:rounded-[3rem]">
          <section
            v-if="detail.product.description"
            id="overview"
            class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 px-6 py-12 sm:px-10 lg:px-16 lg:py-20"
          >
            <div class="lg:col-span-5 lg:sticky lg:top-32 lg:self-start space-y-8">
              <div class="section-kicker">
                <span>01</span>
                Tổng quan
              </div>
              <div class="space-y-5">
                <h2 class="section-title">
                  Một thiết kế.<br />
                  <span>Một tuyên ngôn.</span>
                </h2>
                <p class="max-w-sm text-sm font-medium leading-7 text-slate-500">
                  Khám phá câu chuyện, thiết kế và trải nghiệm tạo nên
                  {{ detail.product.name }}.
                </p>
              </div>
              <div
                class="hidden lg:flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400"
              >
                <span class="h-px w-10 bg-primary" />
                Cuộn để khám phá
              </div>
            </div>

            <div class="lg:col-span-7">
              <div class="story-copy html-content">
                <div v-html="detail.product.description" />
              </div>
            </div>
          </section>

          <section
            v-if="highlights.length > 0"
            id="highlights"
            class="border-t border-slate-200/70 px-6 py-12 sm:px-10 lg:px-16 lg:py-20"
          >
            <div
              class="mb-10 flex flex-col gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
            >
              <div class="space-y-4">
                <div class="section-kicker">
                  <span>02</span>
                  Điểm nổi bật
                </div>
                <h2 class="section-title">
                  Công nghệ tạo nên<br />
                  <span>khác biệt.</span>
                </h2>
              </div>
              <p class="max-w-md text-sm font-medium leading-7 text-slate-500">
                Mỗi chi tiết đều được hoàn thiện để hành trình hàng ngày trở nên tiện nghi, an toàn
                và đầy cảm hứng hơn.
              </p>
            </div>

            <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <article
                v-for="(hl, idx) in highlights"
                :key="idx"
                class="highlight-card group"
                :class="idx === 0 ? 'lg:col-span-2 lg:grid lg:grid-cols-2' : ''"
              >
                <div class="highlight-media" :class="idx === 0 ? 'lg:min-h-[460px]' : ''">
                  <img :src="hl.image" :alt="hl.title" loading="lazy" />
                  <div class="highlight-index">{{ String(idx + 1).padStart(2, '0') }}</div>
                </div>
                <div class="flex flex-col justify-between gap-8 p-7 sm:p-9 lg:p-10">
                  <div class="space-y-4">
                    <div
                      class="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.22em] text-primary"
                    >
                      <span class="h-px w-8 bg-primary" />
                      Công nghệ nổi bật
                    </div>
                    <h3
                      class="text-2xl font-black uppercase leading-tight tracking-[-0.04em] text-slate-950 lg:text-3xl"
                    >
                      {{ hl.title }}
                    </h3>
                    <p class="text-sm font-medium leading-7 text-slate-500">
                      {{ hl.description }}
                    </p>
                  </div>
                  <div
                    class="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-950"
                  >
                    <span
                      class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white"
                    >
                      <Icon name="fa6-solid:arrow-right" />
                    </span>
                    Chi tiết nổi bật
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section id="ownership" class="ownership-section px-6 py-12 sm:px-10 lg:px-16 lg:py-20">
            <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div class="lg:col-span-5 space-y-6">
                <div class="section-kicker section-kicker-dark">
                  <span>{{ highlights.length > 0 ? '03' : '02' }}</span>
                  An tâm sở hữu
                </div>
                <h2
                  class="text-4xl font-black uppercase leading-[0.96] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl"
                >
                  Đồng hành<br />
                  <span class="text-primary">trọn hành trình.</span>
                </h2>
                <p class="max-w-md text-sm font-medium leading-7 text-white/55">
                  Không chỉ là một chiếc xe mới. Bạn nhận được hệ sinh thái chăm sóc riêng từ AnhEm
                  Motor, từ tư vấn đến hậu mãi.
                </p>
                <div class="flex items-center gap-4 pt-2">
                  <div class="flex -space-x-3">
                    <div
                      v-for="letter in ['A', 'N', 'H']"
                      :key="letter"
                      class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#111318] bg-primary text-[10px] font-black text-white"
                    >
                      {{ letter }}
                    </div>
                  </div>
                  <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                    Đội ngũ hỗ trợ<br /><span class="text-white">luôn sẵn sàng</span>
                  </p>
                </div>
              </div>

              <div class="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <article
                  v-for="benefit in [
                    { icon: 'shield-halved', value: '05 năm', label: 'Bảo hành chính hãng' },
                    { icon: 'truck-fast', value: '24/7', label: 'Cứu hộ trên toàn quốc' },
                    { icon: 'headset', value: '1:1', label: 'Chuyên gia hỗ trợ riêng' },
                    { icon: 'stopwatch', value: '< 15 phút', label: 'Hỗ trợ thủ tục trả góp' },
                  ]"
                  :key="benefit.label"
                  class="benefit-card"
                >
                  <div class="benefit-icon">
                    <Icon :name="`fa6-solid:${benefit.icon}`" />
                  </div>
                  <div>
                    <div
                      class="text-2xl sm:text-3xl font-black uppercase tracking-[-0.05em] text-white"
                    >
                      {{ benefit.value }}
                    </div>
                    <div
                      class="mt-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-white/45"
                    >
                      {{ benefit.label }}
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section
            v-if="specifications.length > 0"
            id="specifications"
            class="border-t border-slate-200/70 px-6 py-12 sm:px-10 lg:px-16 lg:py-20"
          >
            <div
              class="mb-10 flex flex-col gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
            >
              <div class="space-y-4">
                <div class="section-kicker">
                  <span>{{ highlights.length > 0 ? '04' : '03' }}</span>
                  Dữ liệu sản phẩm
                </div>
                <h2 class="section-title">
                  Thông số<br />
                  <span>kỹ thuật.</span>
                </h2>
              </div>
              <p class="max-w-md text-sm font-medium leading-7 text-slate-500">
                Chọn từng nhóm để xem đầy đủ thông số của phiên bản {{ variantName }}.
              </p>
            </div>

            <div class="specification-list">
              <article
                v-for="(group, groupIndex) in specGroups"
                :key="group.title"
                class="specification-group"
                :class="isGroupExpanded(group.title) ? 'is-open' : ''"
              >
                <button class="specification-trigger" @click="toggleGroup(group.title)">
                  <span class="specification-number">{{
                    String(groupIndex + 1).padStart(2, '0')
                  }}</span>
                  <span class="specification-icon">
                    <Icon :name="`fa6-solid:${group.icon}`" />
                  </span>
                  <span class="min-w-0 flex-1">
                    <span
                      class="block text-left text-base font-black uppercase tracking-[-0.02em] text-slate-950 sm:text-xl"
                    >
                      {{ group.title }}
                    </span>
                    <span
                      class="mt-1 block text-left text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400"
                    >
                      {{ group.specs.length }} thông số
                    </span>
                  </span>
                  <span class="specification-toggle">
                    <Icon
                      name="fa6-solid:plus"
                      class="transition-transform duration-300"
                      :class="isGroupExpanded(group.title) ? 'rotate-45' : ''"
                    />
                  </span>
                </button>

                <div
                  class="grid transition-all duration-500 ease-in-out"
                  :class="isGroupExpanded(group.title) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
                >
                  <div class="overflow-hidden">
                    <div
                      class="grid grid-cols-1 gap-x-10 px-4 pb-7 sm:grid-cols-2 sm:px-24 lg:px-32"
                    >
                      <div
                        v-for="spec in group.specs"
                        :key="spec.key"
                        class="flex items-start justify-between gap-5 border-t border-slate-100 py-4"
                      >
                        <span class="text-xs font-semibold leading-5 text-slate-400">{{
                          spec.label
                        }}</span>
                        <span
                          class="max-w-[55%] text-right text-xs font-black leading-5 text-slate-900"
                          >{{ spec.value }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section
            id="reviews"
            class="border-t border-slate-200/70 px-6 py-12 sm:px-10 lg:px-16 lg:py-20"
          >
            <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <div class="lg:col-span-4 space-y-6">
                <div class="section-kicker">
                  <span>{{ highlights.length > 0 ? '05' : '04' }}</span>
                  Khách hàng nói gì
                </div>
                <h2 class="section-title">
                  Trải nghiệm<br />
                  <span>thật.</span>
                </h2>
                <div class="flex items-center gap-4">
                  <div class="text-5xl font-black tracking-[-0.06em] text-slate-950">5.0</div>
                  <div>
                    <div class="flex gap-1 text-amber-400">
                      <Icon v-for="i in 5" :key="i" name="fa6-solid:star" class="text-xs" />
                    </div>
                    <div
                      class="mt-2 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400"
                    >
                      Khách hàng xác thực
                    </div>
                  </div>
                </div>
              </div>

              <div class="lg:col-span-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                <article
                  v-for="(review, index) in [
                    {
                      name: 'Lê Tuấn Anh',
                      product: 'Winner X V3',
                      content: 'Xe vận hành bốc, tư vấn chuyên nghiệp. Lấy xe trong 30 phút!',
                    },
                    {
                      name: 'Nguyễn Quang',
                      product: 'Exciter 155',
                      content: 'Bảo hành tuyệt vời, hỗ trợ cứu hộ nhanh chóng. Rất tin tưởng.',
                    },
                    {
                      name: 'Hoàng Nam',
                      product: 'Vario 160',
                      content: 'Ưu đãi hội viên rất tốt, thường xuyên có quà tặng. 10 điểm!',
                    },
                  ]"
                  :key="review.name"
                  class="review-card"
                  :class="index === 2 ? 'md:col-span-2' : ''"
                >
                  <Icon name="fa6-solid:quote-left" class="text-2xl text-primary/20" />
                  <p class="text-base font-bold leading-7 text-slate-700">{{ review.content }}</p>
                  <div
                    class="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-5"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white"
                      >
                        {{ review.name[0] }}
                      </div>
                      <div>
                        <div class="text-xs font-black text-slate-950">{{ review.name }}</div>
                        <div
                          class="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400"
                        >
                          {{ review.product }}
                        </div>
                      </div>
                    </div>
                    <Icon name="fa6-solid:circle-check" class="text-sm text-emerald-500" />
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section class="purchase-cta group">
            <div class="purchase-cta-glow" />
            <div
              class="relative z-10 grid grid-cols-1 items-center gap-8 px-6 py-12 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-16"
            >
              <div class="space-y-6">
                <div
                  class="inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.24em] text-primary"
                >
                  <span class="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Sẵn sàng trải nghiệm
                </div>
                <h2
                  class="text-4xl font-black uppercase leading-[0.96] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl"
                >
                  Đưa {{ detail.product.name }}<br />
                  <span class="text-primary">về nhà hôm nay.</span>
                </h2>
                <p class="max-w-lg text-sm font-medium leading-7 text-white/55">
                  Nhận báo giá lăn bánh, phương án trả góp và ưu đãi phù hợp nhất từ chuyên viên
                  AnhEm Motor.
                </p>
                <div class="flex flex-col gap-3 pt-2 sm:flex-row">
                  <template v-if="isMotorbike">
                    <button class="cta-primary" @click="openConsultation">
                      Tư vấn & Báo giá
                      <Icon name="fa6-solid:phone-volume" />
                    </button>
                    <button class="cta-secondary" @click="bookTestDrive">
                      Đăng ký lái thử
                      <Icon name="fa6-solid:motorcycle" />
                    </button>
                  </template>
                  <template v-else>
                    <button class="cta-primary" @click="buyNow">
                      Đặt mua ngay
                      <Icon name="fa6-solid:arrow-right" />
                    </button>
                    <button class="cta-secondary" @click="openConsultation">
                      Liên hệ tư vấn
                      <Icon name="fa6-solid:headset" />
                    </button>
                  </template>
                </div>
              </div>

              <div class="relative flex min-h-[260px] items-center justify-center lg:min-h-[360px]">
                <div
                  class="absolute h-52 w-52 rounded-full border border-white/10 sm:h-72 sm:w-72"
                />
                <div
                  class="absolute h-36 w-36 rounded-full border border-primary/20 sm:h-52 sm:w-52"
                />
                <img
                  :src="mainImage"
                  :alt="detail.product.name"
                  loading="lazy"
                  class="relative z-10 max-h-[340px] w-full object-contain drop-shadow-[0_28px_30px_rgba(0,0,0,0.55)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-105"
                  @error="$event.target.src = '/assets/image/placeholder-product.webp'"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <ProductBookingModal
      :is-open="isBookingModalOpen"
      :product="detail?.product"
      :variant="currentVariant"
      @close="isBookingModalOpen = false"
    />
  </div>
</template>

<style scoped>
.html-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  margin: 1.5rem auto;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
}
.html-content :deep(h1),
.html-content :deep(h2),
.html-content :deep(h3) {
  font-weight: 900;
  color: #111827;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.html-content :deep(p) {
  margin-bottom: 1rem;
}
.html-content :deep(ul),
.html-content :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.html-content :deep(a) {
  color: #e31837;
  text-decoration: underline;
}

:deep(*) {
  font-family: 'Manrope', sans-serif;
}

.text-primary {
  color: #e31837;
}
.bg-primary {
  background-color: #e31837;
}

.bg-gradient-premium {
  background: linear-gradient(135deg, #e31837 0%, #9b1025 100%);
}
.bg-dark-900 {
  background-color: #0a0a0a;
}
.bg-dark-800 {
  background-color: #1a1a1a;
}

.spotlight {
  background: radial-gradient(circle at 50% 50%, rgba(227, 24, 55, 0.08) 0%, transparent 70%);
}
.reflection {
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.05) 100%);
  transform: perspective(1000px) rotateX(60deg) scaleY(0.5);
  filter: blur(10px);
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(227, 24, 55, 0.2);
  }
  50% {
    box-shadow: 0 0 40px rgba(227, 24, 55, 0.4);
  }
}
.animate-glow {
  animation: pulse-glow 3s infinite;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.reveal-up {
  animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.tracking-tighter {
  letter-spacing: -0.06em;
}
.tracking-widest {
  letter-spacing: 0.15em;
}

.premium-card {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.premium-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.1);
}

.product-story {
  background:
    linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.035) 1px, transparent 1px), #f8fafc;
  background-size: 48px 48px;
  border: 1px solid rgba(15, 23, 42, 0.06);
}

.section-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: #64748b;
  font-size: 0.625rem;
  font-weight: 900;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.section-kicker span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background: #e31837;
  color: white;
  letter-spacing: 0;
}

.section-kicker-dark {
  color: rgba(255, 255, 255, 0.45);
}

.section-title {
  color: #0f172a;
  font-size: clamp(2.5rem, 5vw, 4.25rem);
  font-weight: 900;
  line-height: 0.96;
  letter-spacing: -0.065em;
  text-transform: uppercase;
}

.section-title span {
  color: #e31837;
}

.story-copy {
  padding: clamp(1.5rem, 4vw, 3.5rem);
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 24px 70px -38px rgba(15, 23, 42, 0.28);
  color: #475569;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.9;
}

.story-copy :deep(p:first-child) {
  color: #0f172a;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  font-weight: 700;
  line-height: 1.75;
}

.highlight-card {
  overflow: hidden;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 24px 70px -42px rgba(15, 23, 42, 0.35);
}

.highlight-media {
  position: relative;
  min-height: 280px;
  overflow: hidden;
  background: #e2e8f0;
}

.highlight-media::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(15, 23, 42, 0.42));
  content: '';
}

.highlight-media img {
  width: 100%;
  height: 100%;
  min-height: inherit;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.highlight-card:hover .highlight-media img {
  transform: scale(1.045);
}

.highlight-index {
  position: absolute;
  right: 1.5rem;
  bottom: 1rem;
  z-index: 1;
  color: rgba(255, 255, 255, 0.9);
  font-size: 3rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.08em;
}

.ownership-section {
  background:
    radial-gradient(circle at 8% 10%, rgba(227, 24, 55, 0.16), transparent 32%),
    radial-gradient(circle at 92% 90%, rgba(227, 24, 55, 0.08), transparent 28%), #111318;
}

.benefit-card {
  display: flex;
  min-height: 168px;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease,
    transform 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-4px);
  border-color: rgba(227, 24, 55, 0.45);
  background: rgba(255, 255, 255, 0.08);
}

.benefit-icon {
  display: flex;
  width: 2.75rem;
  height: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: #e31837;
  color: white;
  box-shadow: 0 14px 28px -12px rgba(227, 24, 55, 0.7);
}

.specification-list {
  overflow: hidden;
  border-top: 1px solid #e2e8f0;
}

.specification-group {
  border-bottom: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.6);
  transition: background-color 0.3s ease;
}

.specification-group.is-open {
  background: white;
}

.specification-trigger {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 0.25rem;
  outline: none;
}

.specification-trigger:focus-visible {
  outline: 2px solid #e31837;
  outline-offset: -2px;
}

.specification-number {
  display: none;
  width: 2rem;
  color: #94a3b8;
  font-size: 0.625rem;
  font-weight: 900;
  letter-spacing: 0.14em;
}

.specification-icon,
.specification-toggle {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
}

.specification-icon {
  width: 3rem;
  height: 3rem;
  background: #0f172a;
  color: #e31837;
}

.specification-toggle {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #e2e8f0;
  color: #0f172a;
}

.specification-group.is-open .specification-toggle {
  border-color: #e31837;
  background: #e31837;
  color: white;
}

.review-card {
  display: flex;
  min-height: 250px;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(15, 23, 42, 0.07);
  box-shadow: 0 22px 60px -42px rgba(15, 23, 42, 0.4);
}

.purchase-cta {
  position: relative;
  overflow: hidden;
  background: linear-gradient(110deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px), #0b0d11;
  background-size: 40px 40px;
}

.purchase-cta-glow {
  position: absolute;
  top: 20%;
  right: 10%;
  width: 20rem;
  height: 20rem;
  border-radius: 9999px;
  background: rgba(227, 24, 55, 0.18);
  filter: blur(100px);
}

.cta-primary,
.cta-secondary {
  display: inline-flex;
  min-height: 3.5rem;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0 1.5rem;
  border-radius: 1rem;
  font-size: 0.625rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition:
    transform 0.25s ease,
    background-color 0.25s ease,
    color 0.25s ease;
}

.cta-primary {
  background: #e31837;
  color: white;
  box-shadow: 0 18px 38px -16px rgba(227, 24, 55, 0.72);
}

.cta-secondary {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.13);
  color: white;
}

.cta-primary:hover,
.cta-secondary:hover {
  transform: translateY(-2px);
}

.cta-primary:hover {
  background: white;
  color: #e31837;
}

.cta-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
}

@media (min-width: 640px) {
  .specification-number {
    display: inline-block;
  }

  .specification-trigger {
    gap: 1.5rem;
    padding: 1.5rem 1rem;
  }

  .review-card {
    padding: 2rem;
  }
}

i {
  font-style: italic;
}
</style>
