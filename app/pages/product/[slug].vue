<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useProductStore } from "@/stores/product.store";
import { useCart } from "~/composables/useCart";
import productMapper from "@/mappers/product.mapper";

const route = useRoute();
const slug = computed(() => route.params.slug);
const productStore = useProductStore();

const {
    data: detail,
    pending: isLoading,
    error,
} = await useAsyncData(
    "product-detail-" + slug.value,
    () => productStore.fetchFullProductDetail(slug.value),
    {
        watch: [slug],
    },
);

const currentVariant = computed(() => detail.value?.currentVariant);
const selectedColorIndex = ref(0);
const selectedImage = ref(null);

const mainImage = computed({
    get: () => {
        if (selectedImage.value) return selectedImage.value;
        const colorImage = currentVariant.value?.colors?.[selectedColorIndex.value]?.image;
        if (colorImage) return colorImage;
        return (
            detail.value?.currentVariant?.photos?.[0] ||
            "/assets/image/placeholder-product.webp"
        );
    },
    set: (val) => {
        selectedImage.value = val;
    },
});

const isPlaceholderActive = computed(() => {
    if (
        selectedImage.value &&
        selectedImage.value !== "/assets/image/placeholder-product.webp"
    )
        return false;
    return detail.value?.currentVariant?.image?.includes("placeholder-product");
});

const allPhotos = computed(() => detail.value?.currentVariant?.photos || []);
const formattedPrice = computed(() =>
    productMapper.formatPrice(currentVariant.value?.price),
);
const installmentPrice = computed(() => {
    const price = currentVariant.value?.price || 0;
    if (!price) return "0đ";
    // Dummy calc: (Price * 1.1) / 24 months
    const monthly = Math.round((price * 1.1) / 24 / 1000) * 1000;
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(monthly);
});
const variantName = computed(() => currentVariant.value?.name || "");
const specifications = computed(() => detail.value?.specifications || []);
const specGroups = computed(() => {
    if (!specifications.value.length) return [];
    
    const grouping = [
        {
            title: 'Động cơ & Truyền động',
            icon: 'gauge-high',
            keys: ['EngineType', 'engine_type', 'Displacement', 'displacement', 'BoreStroke', 'bore_stroke', 'CompressionRatio', 'compression_ratio', 'MaxPower', 'max_power', 'MaxTorque', 'max_torque', 'FuelSystem', 'fuel_system', 'TransmissionType', 'transmission_type', 'StarterSystem', 'starter_system', 'FuelConsumption', 'fuel_consumption', 'OilCapacity', 'oil_capacity']
        },
        {
            title: 'Kích thước & Trọng lượng',
            icon: 'ruler-combined',
            keys: ['Dimensions', 'dimensions', 'Wheelbase', 'wheelbase', 'SeatHeight', 'seat_height', 'GroundClearance', 'ground_clearance', 'Weight', 'weight', 'FuelCapacity', 'fuel_capacity']
        },
        {
            title: 'Khung xe & Phanh',
            icon: 'shield-halved',
            keys: ['FrameType', 'frame_type', 'FrontSuspension', 'front_suspension', 'RearSuspension', 'rear_suspension', 'FrontTireSize', 'front_tire_size', 'RearTireSize', 'rear_tire_size', 'FrontBrake', 'front_brake', 'RearBrake', 'rear_brake', 'TireSize', 'tire_size']
        },
        {
            title: 'Hệ thống điện',
            icon: 'bolt',
            keys: ['BatteryType', 'battery_type', 'LightingSystem', 'lighting_system', 'DashboardType', 'dashboard_type']
        }
    ];

    return grouping.map(g => ({
        ...g,
        specs: specifications.value.filter(s => g.keys.includes(s.key))
    })).filter(g => g.specs.length > 0);
});
const highlights = computed(() => detail.value?.product?.highlights || []);

// Accordion logic for specs
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

// Variant Grouping Logic
const variantGroups = computed(() => {
    if (!detail.value?.otherVariants) return {};
    const groups = {};
    const all = [...(detail.value.otherVariants || [])];
    if (detail.value.currentVariant) {
        all.push({
            ...detail.value.currentVariant,
            isCurrent: true
        });
    }

    all.forEach(v => {
        const name = v.name || 'Tiêu chuẩn';
        if (!groups[name]) groups[name] = [];
        groups[name].push(v);
    });
    return groups;
});

const selectedVariantGroup = ref("");
onMounted(() => {
    selectedVariantGroup.value = variantName.value || Object.keys(variantGroups.value)[0] || "";
});

const currentGroupVariants = computed(() => {
    return variantGroups.value[selectedVariantGroup.value] || [];
});

// Auto-select first variant in group when group changes
watch(selectedVariantGroup, (newGroup) => {
    const groupVariants = variantGroups.value[newGroup] || [];
    if (groupVariants.length > 0) {
        // Find if current variant is in this group
        const exists = groupVariants.find(v => v.slug === slug.value);
        if (!exists) {
            // Navigate to the first variant of the new group
            navigateTo(`/product/${groupVariants[0].slug}`);
        }
    }
});

// Reset color index when product changes
watch(slug, () => {
    selectedColorIndex.value = 0;
    selectedImage.value = null;
});

const handleVariantChange = (event) => {
    const targetSlug = event.target.value;
    if (targetSlug) navigateTo(`/product/${targetSlug}`);
};

// Countdown Timer for FOMO
const timeLeft = ref(3600 * 5 + 1240); // 5h 20m 40s
let timer = null;
onMounted(() => {
    timer = setInterval(() => {
        if (timeLeft.value > 0) timeLeft.value--;
    }, 1000);
});
onUnmounted(() => clearInterval(timer));

const formattedCountdown = computed(() => {
    const h = Math.floor(timeLeft.value / 3600);
    const m = Math.floor((timeLeft.value % 3600) / 60);
    const s = timeLeft.value % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
});

useSeoMeta(productMapper.toSeoMeta(detail.value));

useHead({
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

const { addItem } = useCart();
const onAddToCart = () => {
    const cartItem = productMapper.toCartItem(detail.value, selectedColorIndex.value);
    if (cartItem) addItem(cartItem, 1);
};

const buyNow = () => {
    onAddToCart();
    navigateTo("/cart");
};

const isMotorbike = computed(() => {
    const cat = detail.value?.product?.category?.toLowerCase() || "";
    return cat.includes("xe máy") || cat.includes("motor");
});

const openConsultation = () => {
    // Placeholder for consultation logic (e.g., open a modal or navigate to contact)
    window.open("https://zalo.me/your-zalo-id", "_blank");
};

const bookTestDrive = () => {
    if (currentVariant.value?.id) {
        navigateTo({
            path: '/test-drive',
            query: { 
                variantId: currentVariant.value.id,
                variantName: detail.value.product.name + ' ' + (currentVariant.value.versionName || '')
            }
        });
    } else {
        navigateTo('/test-drive');
    }
};

const variantSelectId = useId();
</script>

<template>
    <div class="min-h-screen bg-white">
        <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <!-- Breadcrumb -->
            <nav v-if="detail?.product" class="flex mb-10 text-[10px] font-black uppercase tracking-[0.2em]" aria-label="Breadcrumb">
                <ol class="inline-flex items-center gap-2">
                    <li><NuxtLink to="/" class="text-gray-400 hover:text-primary transition-colors">Trang chủ</NuxtLink></li>
                    <Icon name="fa6-solid:chevron-right" class="text-gray-300 text-[8px]" />
                    <li><NuxtLink to="/products" class="text-gray-400 hover:text-primary transition-colors">Sản phẩm</NuxtLink></li>
                    <Icon name="fa6-solid:chevron-right" class="text-gray-300 text-[8px]" />
                    <li class="text-gray-900 truncate max-w-[200px]">{{ detail.product.name }}</li>
                </ol>
            </nav>

            <div v-if="error" class="text-center py-32 bg-gray-50 rounded-[3rem]">
                <div class="inline-flex items-center justify-center w-24 h-24 bg-red-50 rounded-full mb-8">
                    <Icon name="fa6-solid:triangle-exclamation" class="text-4xl text-primary" />
                </div>
                <h2 class="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Không tìm thấy sản phẩm</h2>
                <p class="text-gray-500 mb-10 font-medium">Sản phẩm có thể đã bị xóa hoặc đường dẫn không chính xác.</p>
                <NuxtLink to="/products" class="inline-flex items-center px-10 py-5 bg-gray-900 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-primary transition-all transform hover:-translate-y-1 shadow-2xl shadow-black/10">
                    Quay lại danh sách
                </NuxtLink>
            </div>

            <div v-else-if="isLoading && !detail" class="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse">
                <div class="lg:col-span-7 aspect-[4/3] bg-gray-100 rounded-[3rem]" />
                <div class="lg:col-span-5 space-y-8">
                    <div class="h-12 bg-gray-100 rounded-2xl w-3/4" />
                    <div class="h-6 bg-gray-100 rounded-xl w-1/2" />
                    <div class="h-32 bg-gray-100 rounded-3xl w-full" />
                    <div class="h-16 bg-gray-100 rounded-2xl w-1/3" />
                </div>
            </div>

            <div v-else class="space-y-16 lg:space-y-24">
                <!-- Hero Section -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative">
                    <!-- Spotlight Effect -->
                    <div class="absolute -top-12 left-0 w-full h-full spotlight pointer-events-none"></div>

                    <!-- Image Gallery -->
                    <div class="lg:col-span-7 space-y-8">
                        <div class="relative">
                            <div class="relative aspect-[16/10] rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 group z-10">
                                <div class="absolute top-6 left-6 z-20 flex flex-col gap-2">
                                    <span class="px-4 py-1.5 bg-gradient-premium text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg animate-glow">Exclusive Deal</span>
                                    <span v-if="detail.product.brand" class="px-4 py-1.5 bg-white/80 backdrop-blur-md text-gray-900 text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-md border border-gray-100">{{ detail.product.brand }}</span>
                                </div>
                                <img :src="mainImage" :alt="detail.product.name" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="eager">
                            </div>
                            <!-- Reflection -->
                            <div class="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-20 reflection opacity-30 z-0"></div>
                        </div>

                        <div v-if="!isPlaceholderActive && allPhotos.length > 1" class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
                            <button v-for="(photo, index) in allPhotos" :key="index" 
                                class="relative w-20 h-20 rounded-[1.5rem] overflow-hidden flex-shrink-0 transition-all duration-500 border-2"
                                :class="mainImage === photo ? 'border-primary ring-4 ring-primary/5 scale-105 shadow-xl' : 'border-transparent hover:border-gray-200 shadow-sm opacity-50 hover:opacity-100'"
                                @click="mainImage = photo"
                            >
                                <img :src="photo" class="w-full h-full object-cover" loading="lazy">
                            </button>
                        </div>

                        <!-- Moved Description & Trust Badges here for balance -->
                        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
                            <div class="md:col-span-7 space-y-4 border-l-2 border-primary/20 pl-6">
                                <div class="text-primary font-black uppercase tracking-[0.3em] text-xs italic">
                                    ⚡ ĐỘT PHÁ CÔNG NGHỆ
                                </div>
                                <p class="text-gray-500 font-medium leading-relaxed max-w-xl text-base">
                                    {{ detail.product.shortDescription || 'Đỉnh cao kỹ thuật và thiết kế, mang lại trải nghiệm lái đầy phấn khích.' }}
                                </p>
                            </div>
                            <div class="md:col-span-5 grid grid-cols-3 gap-3">
                                <div v-for="trust in [{i:'shield-halved',t:'Bảo hành',s:'3 năm'},{i:'truck-fast',t:'Giao nhanh',s:'Toàn quốc'},{i:'headset',t:'Hỗ trợ',s:'24/7'}]" :key="trust.t" class="flex flex-col items-center gap-2 p-3 rounded-2xl text-center group hover:bg-white hover:shadow-xl transition-all border border-gray-100/30">
                                    <div class="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                        <Icon :name="`fa6-solid:${trust.i}`" class="text-base" />
                                    </div>
                                    <div class="text-[8px] font-black text-gray-900 uppercase leading-tight tracking-widest">{{ trust.t }}<br><span class="text-gray-400">{{ trust.s }}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Info Column -->
                    <div class="lg:col-span-5">
                        <div class="sticky top-28 space-y-8">
                            <div class="space-y-4">
                                <div class="flex items-center gap-3">
                                    <div class="h-[1px] w-8 bg-primary"></div>
                                    <span class="text-[9px] font-black text-primary uppercase tracking-[0.4em]">{{ detail.product.category }}</span>
                                </div>
                                <h1 class="text-5xl lg:text-6xl font-black text-gray-900 leading-[0.9] tracking-tighter uppercase italic reveal-up">
                                    {{ detail.product.name }}
                                </h1>
                            </div>

                            <div class="flex flex-col gap-3">
                                <div class="flex items-center gap-2">
                                    <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Giá từ</span>
                                    <div class="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black rounded-md">GIÁ TỐT NHẤT</div>
                                </div>
                                <div class="text-5xl lg:text-5xl font-black text-gray-900 tracking-tighter italic">
                                    {{ formattedPrice }}
                                </div>
                                <div class="flex items-center gap-2 text-gray-500 font-bold text-xs">
                                    <Icon name="fa6-solid:calendar-check" class="text-primary" />
                                    <span>Trả góp chỉ từ <span class="text-gray-900 font-black text-sm">{{ installmentPrice }}</span>/tháng</span>
                                </div>
                            </div>

                            <!-- Variant & Color Selection -->
                            <div v-if="Object.keys(variantGroups).length > 0" class="space-y-4">
                                <div class="space-y-3">
                                    <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Cấu hình & Màu sắc</label>
                                    <div class="flex flex-wrap items-center gap-4">
                                        <div class="relative flex-grow">
                                            <select v-model="selectedVariantGroup" class="w-full h-12 pl-4 pr-10 bg-gray-50 border-none rounded-xl font-black text-[10px] text-gray-900 focus:ring-2 focus:ring-primary/5 transition-all cursor-pointer uppercase tracking-wider appearance-none">
                                                <option v-for="(variants, name) in variantGroups" :key="name" :value="name">{{ name }}</option>
                                            </select>
                                            <Icon name="fa6-solid:chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[8px] pointer-events-none" />
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <template v-for="v in currentGroupVariants" :key="v.slug">
                                                <div v-for="(color, cIdx) in v.colors" :key="cIdx" class="relative group">
                                                    <NuxtLink v-if="v.slug !== currentVariant.slug" :to="`/product/${v.slug}`" class="block w-8 h-8 rounded-full border-2 border-white shadow-sm p-0.5 hover:scale-110 transition-transform">
                                                        <div class="w-full h-full rounded-full border border-black/5" :style="{ backgroundColor: color.code || '#ccc' }"></div>
                                                    </NuxtLink>
                                                    <button v-else @click="selectedColorIndex = cIdx; selectedImage = null" class="block w-8 h-8 rounded-full border-2 transition-all p-0.5 focus:outline-none scale-110" :class="selectedColorIndex === cIdx ? 'border-primary shadow-md ring-2 ring-primary/10' : 'border-white shadow-sm hover:scale-110'">
                                                        <div class="w-full h-full rounded-full border border-black/5" :style="{ backgroundColor: color.code || '#ccc' }"></div>
                                                    </button>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="space-y-4 pt-2">
                                <div class="flex items-center justify-between px-6 py-4 bg-dark-900 rounded-[1.5rem] border border-white/10 shadow-xl">
                                    <div class="flex items-center gap-3">
                                        <div class="relative">
                                            <Icon name="fa6-solid:bolt-lightning" class="text-primary text-base relative z-10" />
                                            <div class="absolute inset-0 bg-primary/50 blur-md animate-pulse"></div>
                                        </div>
                                        <div class="flex flex-col">
                                            <span class="text-[8px] font-black text-primary uppercase tracking-[0.1em]">Ưu đãi kết thúc</span>
                                            <span class="text-base font-black text-white font-mono tracking-wider">{{ formattedCountdown }}</span>
                                        </div>
                                    </div>
                                    <div class="h-8 w-[1px] bg-white/10"></div>
                                    <div class="text-right">
                                        <span class="text-[8px] font-black text-gray-400 uppercase tracking-[0.1em]">Còn lại</span>
                                        <div class="text-lg font-black text-white leading-none">08 <span class="text-[10px] text-primary italic">xe</span></div>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 gap-3">
                                    <template v-if="isMotorbike">
                                        <button @click="openConsultation" class="w-full py-5 bg-primary text-white font-black text-xs rounded-[1.5rem] hover:scale-[1.01] active:scale-95 transition-all shadow-lg flex flex-col items-center justify-center gap-1 uppercase tracking-[0.2em] group relative overflow-hidden">
                                            <div class="flex items-center gap-2">
                                                TƯ VẤN & BÁO GIÁ
                                                <Icon name="fa6-solid:phone-volume" class="text-[10px] animate-bounce" />
                                            </div>
                                            <span class="text-[7px] opacity-70 normal-case tracking-normal font-bold italic">Báo giá lăn bánh & Thủ tục trả góp</span>
                                        </button>
                                        <button @click="bookTestDrive" class="w-full py-4 bg-white text-gray-900 border border-primary font-black text-[10px] rounded-[1.5rem] hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-1 uppercase tracking-[0.15em]">
                                            <div class="flex items-center gap-2">
                                                <Icon name="fa6-solid:motorcycle" class="text-primary" />
                                                ĐĂNG KÝ LÁI THỬ
                                            </div>
                                            <span class="text-[7px] text-gray-400 normal-case tracking-normal font-bold italic">Trải nghiệm thực tế tại Showroom Biên Hòa</span>
                                        </button>
                                    </template>
                                    <template v-else>
                                        <button @click="buyNow" class="w-full py-5 bg-primary text-white font-black text-xs rounded-[1.5rem] hover:scale-[1.01] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3 uppercase tracking-[0.2em] group relative overflow-hidden">
                                            MUA NGAY — NHẬN ƯU ĐÃI
                                            <Icon name="fa6-solid:arrow-right" class="text-[10px] group-hover:translate-x-1 transition-transform" />
                                        </button>
                                        <button @click="onAddToCart" class="w-full py-4 bg-white text-gray-900 border border-primary font-black text-[10px] rounded-[1.5rem] hover:bg-primary/5 transition-all flex items-center justify-center gap-2 uppercase tracking-[0.15em]">
                                            <Icon name="fa6-solid:cart-plus" class="text-primary" />
                                            THÊM VÀO GIỎ
                                        </button>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Highlights Section -->
                <div v-if="highlights.length > 0" class="space-y-24 lg:space-y-32 relative">
                    <div class="absolute inset-0 bg-gradient-to-b from-gray-50/30 via-white to-gray-50/30 -z-10 rounded-[3rem]"></div>

                    <div class="text-center space-y-4 reveal-up">
                        <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full">
                            <div class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                            <span class="text-[8px] font-black text-primary uppercase tracking-[0.3em]">Innovation</span>
                        </div>
                        <h2 class="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tight italic leading-[1.1]">
                            Đột phá <span class="text-primary">Kỹ thuật</span>
                        </h2>
                    </div>

                    <div v-for="(hl, idx) in highlights" :key="idx" class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center reveal-up px-4 lg:px-12">
                        <div :class="['lg:col-span-7 relative group', idx % 2 !== 0 ? 'lg:order-2' : '']">
                            <div class="relative rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 transition-transform duration-700 group-hover:scale-[1.01]">
                                <img :src="hl.image" :alt="hl.title" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy">
                            </div>
                        </div>
                        <div :class="['lg:col-span-5 space-y-6', idx % 2 !== 0 ? 'lg:text-right' : '']">
                            <div class="space-y-3">
                                <h3 class="text-3xl lg:text-4xl font-black text-gray-900 leading-[1.15] uppercase italic tracking-tight">{{ hl.title }}</h3>
                            </div>
                            <p class="text-gray-500 font-medium leading-relaxed text-base">{{ hl.description }}</p>
                            <div :class="['flex', idx % 2 !== 0 ? 'justify-end' : '']">
                                <button class="px-8 py-3.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-primary transition-all">Khám phá</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Comparison Section -->
                <div class="space-y-20 relative">
                    <!-- Section Header -->
                    <div class="text-center space-y-6 reveal-up">
                        <div class="flex justify-center">
                            <span class="px-6 py-2 bg-dark-900 text-primary text-[10px] font-black uppercase tracking-[0.4em] rounded-full border border-primary/20 shadow-[0_0_20px_rgba(227,24,55,0.1)]">
                                Comparison Board
                            </span>
                        </div>
                        <h2 class="text-5xl lg:text-7xl font-black text-gray-900 uppercase tracking-tighter italic leading-none">
                            Đẳng cấp <span class="text-primary">Khác biệt</span>
                        </h2>
                        <p class="text-gray-400 font-bold text-xs uppercase tracking-widest max-w-lg mx-auto">
                            Chúng tôi không chỉ bán xe, chúng tôi trao gửi sự an tâm tuyệt đối và đặc quyền tối thượng
                        </p>
                    </div>

                    <div class="max-w-6xl mx-auto relative px-4">
                        <!-- Background Glows -->
                        <div class="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                        <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10"></div>

                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[3.5rem] overflow-hidden border border-gray-100 shadow-2xl bg-white/50 backdrop-blur-xl">
                            <!-- Left: Features -->
                            <div class="lg:col-span-4 p-8 lg:p-12 space-y-8 bg-gray-50/50">
                                <div class="space-y-2 pt-4">
                                    <h3 class="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">ĐẶC QUYỀN <span class="text-primary">SỞ HỮU</span></h3>
                                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dịch vụ chuẩn 5 sao</p>
                                </div>
                                <div class="space-y-12">
                                    <div v-for="feat in ['Thời gian Bảo hành', 'Cứu hộ tận nơi', 'Hỗ trợ kỹ thuật', 'Không gian chờ', 'Thủ tục Trả góp']" :key="feat" 
                                        class="h-10 flex items-center text-xs font-black text-gray-700 uppercase tracking-widest border-b border-gray-100 pb-2">
                                        {{ feat }}
                                    </div>
                                </div>
                            </div>

                            <!-- Middle: AnhEm Motor (The Premium One) -->
                            <div class="lg:col-span-4 bg-dark-900 p-8 lg:p-12 relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.3)] z-10 scale-105 lg:-my-6 lg:rounded-[3rem]">
                                <!-- Premium Accents -->
                                <div class="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] group-hover:bg-primary/20 transition-all duration-700"></div>
                                <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 blur-[80px]"></div>
                                
                                <div class="relative z-20 space-y-8">
                                    <div class="text-center space-y-3 pb-4">
                                        <div class="inline-block px-3 py-1 bg-primary text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-lg shadow-glow-sm">Recommended</div>
                                        <div class="text-2xl font-black text-white uppercase italic tracking-tighter">ANHEM MOTOR</div>
                                    </div>

                                    <div class="space-y-12 text-center">
                                        <div v-for="(v, i) in ['05 Năm', '24/7 Toàn quốc', 'Chuyên gia riêng', 'VIP Lounge', 'Dưới 15 phút']" :key="i" class="h-10 flex flex-col items-center justify-center gap-1">
                                            <div class="flex items-center gap-2">
                                                <Icon name="fa6-solid:shield-check" class="text-primary text-sm" />
                                                <span class="text-xs font-black text-white uppercase tracking-wider">{{ v }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="pt-8 text-center">
                                        <button class="w-full py-4 bg-gradient-premium text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-glow hover:scale-105 transition-all">Trở thành hội viên</button>
                                    </div>
                                </div>
                            </div>

                            <!-- Right: Competitors -->
                            <div class="lg:col-span-4 p-8 lg:p-12 space-y-8 bg-white/30 text-center">
                                <div class="space-y-2 pt-4 opacity-50">
                                    <h3 class="text-2xl font-black text-gray-400 uppercase italic tracking-tighter">PHỔ THÔNG</h3>
                                    <p class="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Tiêu chuẩn thị trường</p>
                                </div>

                                <div class="space-y-12 opacity-40">
                                    <div v-for="(v, i) in ['03 Năm', 'Giờ hành chính', 'Tổng đài viên', 'Khu vực chung', '30-60 phút']" :key="i" class="h-10 flex flex-col items-center justify-center gap-1">
                                        <div class="flex items-center gap-2">
                                            <Icon name="fa6-solid:circle-info" class="text-gray-400 text-xs" />
                                            <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">{{ v }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Social Proof -->
                <div class="space-y-16">
                    <div class="text-center space-y-4">
                        <div class="flex justify-center items-center gap-1 text-yellow-400">
                            <Icon v-for="i in 5" :key="i" name="fa6-solid:star" class="text-lg" />
                        </div>
                        <h2 class="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter italic leading-none">CỘNG ĐỒNG <span class="text-primary">ANHEM MOTOR</span></h2>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                        <div v-for="rv in [{n:'Lê Tuấn Anh',t:'Winner X V3',c:'Xe vận hành bốc, tư vấn chuyên nghiệp. Lấy xe trong 30p!'},{n:'Nguyễn Quang',t:'Exciter 155',c:'Bảo hành tuyệt vời, hỗ trợ cứu hộ nhanh chóng. Rất tin tưởng.'},{n:'Hoàng Nam',t:'Vario 160',c:'Ưu đãi hội viên rất tốt, thường xuyên có quà tặng. 10 điểm!'}]" :key="rv.n" class="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-lg space-y-6 hover:-translate-y-2 transition-all">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 rounded-2xl bg-gradient-premium flex items-center justify-center text-white font-black text-xl shadow-lg">{{ rv.n[0] }}</div>
                                <div class="space-y-0.5">
                                    <div class="font-black text-gray-900 text-base">{{ rv.n }}</div>
                                    <div class="flex items-center gap-1.5">
                                        <Icon name="fa6-solid:circle-check" class="text-green-500 text-[10px]" />
                                        <span class="text-[8px] font-black text-gray-400 uppercase tracking-widest">Verified Buyer</span>
                                    </div>
                                </div>
                            </div>
                            <p class="text-gray-600 italic font-bold leading-relaxed text-base">"{{ rv.c }}"</p>
                            <div class="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div class="text-[9px] font-black text-primary uppercase tracking-[0.2em] italic">{{ rv.t }}</div>
                                <div class="flex items-center gap-1 text-yellow-400">
                                    <Icon v-for="i in 5" :key="i" name="fa6-solid:star" class="text-[8px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Final CTA Section -->
                <div class="relative rounded-[3.5rem] overflow-hidden bg-dark-900 py-16 lg:py-24 shadow-2xl mx-4 lg:mx-0 group border border-white/5">
                    <!-- Dynamic Background Accents -->
                    <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>
                    <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
                    
                    <div class="relative z-10 max-w-6xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div class="space-y-8 reveal-up">
                            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
                                <span class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                                <span class="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Cơ hội sở hữu cuối cùng</span>
                            </div>
                            <h2 class="text-5xl lg:text-7xl font-black text-white leading-[1.1] uppercase italic tracking-tight">Đừng bỏ lỡ<br><span class="text-primary drop-shadow-lg">Chiến mã</span></h2>
                            <p class="text-white/60 font-bold text-lg max-w-md leading-relaxed">Sở hữu ngay siêu phẩm {{ detail.product.name }} với ưu đãi độc quyền chỉ có tại hệ thống AnhEm Motor.</p>
                            <div class="flex flex-wrap gap-4 pt-4">
                                <template v-if="isMotorbike">
                                    <button @click="openConsultation" class="px-12 py-5 bg-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white hover:text-primary transition-all animate-glow shadow-xl flex items-center gap-2">
                                        Tư vấn & Báo giá
                                        <Icon name="fa6-solid:phone-volume" class="text-[10px]" />
                                    </button>
                                    <button @click="bookTestDrive" class="px-10 py-5 bg-white/5 backdrop-blur-md text-white border border-white/10 font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2">
                                        Đăng ký lái thử
                                        <Icon name="fa6-solid:motorcycle" class="text-[10px]" />
                                    </button>
                                </template>
                                <template v-else>
                                    <button @click="buyNow" class="px-12 py-5 bg-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white hover:text-primary transition-all animate-glow shadow-xl">Đặt mua ngay</button>
                                    <button @click="openConsultation" class="px-10 py-5 bg-white/5 backdrop-blur-md text-white border border-white/10 font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all">Liên hệ tư vấn</button>
                                </template>
                            </div>
                        </div>

                        <!-- Product Cutout Image -->
                        <div class="relative lg:h-[400px] flex items-center justify-center reveal-up delay-200">
                            <div class="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-150 animate-pulse"></div>
                            <img :src="mainImage" :alt="detail.product.name" 
                                class="relative z-10 w-full object-contain transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700 drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
                            >
                            <!-- Reflection Shadow -->
                            <div class="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black/40 blur-2xl rounded-full"></div>
                        </div>
                    </div>
                </div>

                <!-- Specifications -->
                <div v-if="specifications.length > 0" class="space-y-16">
                    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-gray-100 pb-10">
                        <div class="space-y-3">
                            <span class="text-[9px] font-black text-primary uppercase tracking-[0.6em]">Technical Sheet</span>
                            <h2 class="text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tighter italic leading-none">Thông số <span class="text-primary">Kỹ thuật</span></h2>
                        </div>
                        <button class="flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-xl text-[9px] font-black text-gray-400 uppercase tracking-widest hover:bg-primary hover:text-white transition-all group">
                            <Icon name="fa6-solid:download" class="text-xs group-hover:-translate-y-0.5 transition-transform" />
                            Tải Catalogue
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                        <div v-for="group in specGroups" :key="group.title" 
                            class="premium-card rounded-[2.5rem] bg-white/50 backdrop-blur-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
                            :class="[isGroupExpanded(group.title) ? 'shadow-xl border-primary/20' : 'hover:border-primary/10']"
                        >
                            <!-- Accordion Header -->
                            <button 
                                @click="toggleGroup(group.title)"
                                class="flex items-center justify-between gap-5 p-8 w-full text-left group/header"
                            >
                                <div class="flex items-center gap-5">
                                    <div class="w-14 h-14 rounded-[1.5rem] bg-gray-900 flex items-center justify-center text-primary text-2xl shadow-xl transition-transform duration-500 group-hover/header:scale-110"
                                        :class="[isGroupExpanded(group.title) ? 'scale-110 ring-4 ring-primary/10' : '']"
                                    >
                                        <Icon :name="`fa6-solid:${group.icon}`" />
                                    </div>
                                    <div class="space-y-1">
                                        <h3 class="font-black text-gray-900 text-lg uppercase tracking-tight italic">{{ group.title }}</h3>
                                        <div class="h-1 bg-primary/20 rounded-full transition-all duration-500" :class="[isGroupExpanded(group.title) ? 'w-16' : 'w-8']"></div>
                                    </div>
                                </div>
                                <Icon 
                                    name="fa6-solid:chevron-down" 
                                    class="text-gray-300 text-sm transition-transform duration-500"
                                    :class="[isGroupExpanded(group.title) ? 'rotate-180 text-primary' : '']"
                                />
                            </button>

                            <!-- Accordion Content -->
                            <div 
                                class="grid transition-all duration-500 ease-in-out px-8"
                                :class="[isGroupExpanded(group.title) ? 'grid-rows-[1fr] opacity-100 pb-10' : 'grid-rows-[0fr] opacity-0 pb-0']"
                            >
                                <div class="overflow-hidden">
                                    <div class="grid grid-cols-1 gap-6 pt-6 border-t border-gray-100/50">
                                        <div v-for="spec in group.specs" :key="spec.key" class="flex flex-col gap-1.5 group/item">
                                            <div class="flex items-center gap-2">
                                                <div class="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover/item:bg-primary transition-colors"></div>
                                                <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover/item:text-primary transition-colors">{{ spec.label }}</span>
                                            </div>
                                            <span class="text-base font-black text-gray-900 tracking-tight pl-3.5">{{ spec.value }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap');

:deep(*) {
    font-family: 'Inter', sans-serif;
}

.text-primary { color: #e31837; }
.bg-primary { background-color: #e31837; }

/* Premium Gradients */
.bg-gradient-premium {
    background: linear-gradient(135deg, #e31837 0%, #9b1025 100%);
}
.bg-dark-900 { background-color: #0a0a0a; }
.bg-dark-800 { background-color: #1a1a1a; }

/* Spotlight & Reflection */
.spotlight {
    background: radial-gradient(circle at 50% 50%, rgba(227, 24, 55, 0.08) 0%, transparent 70%);
}
.reflection {
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 100%);
    transform: perspective(1000px) rotateX(60deg) scaleY(0.5);
    filter: blur(10px);
}

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

/* Custom Animations */
@keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(227, 24, 55, 0.2); }
    50% { box-shadow: 0 0 40px rgba(227, 24, 55, 0.4); }
}
.animate-glow { animation: pulse-glow 3s infinite; }

@keyframes fade-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
.reveal-up { animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

/* Typography */
.tracking-tighter { letter-spacing: -0.06em; }
.tracking-widest { letter-spacing: 0.15em; }

/* Card styles */
.premium-card {
    background: white;
    border: 1px solid rgba(0,0,0,0.05);
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.premium-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 40px 80px -20px rgba(0,0,0,0.1);
}

i { font-style: italic; }
</style>
