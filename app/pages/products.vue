<script setup>
import { ref } from "vue";
import BasePagination from "@/components/ui/BasePagination.vue";

const route = useRoute();
const productStore = useProductStore();
const isSidebarOpen = ref(false);

function parseArrayQuery(val) {
	if (!val) return [];
	const strVal = String(val);
	return strVal
		.split(",")
		.map(Number)
		.filter((n) => !Number.isNaN(n));
}

const pageMode = computed(() => {
	const ids = parseArrayQuery(route.query.category_ids);
	if (ids.includes(1) && ids.length === 1) return 'motorcycles';
	if (ids.some(id => [2, 3].includes(id))) return 'accessories';
	return 'all';
});

const pageConfig = computed(() => {
	if (pageMode.value === 'motorcycles') {
		return {
			title: "Danh sách Xe máy",
			description: "Khám phá các dòng xe máy Honda, Yamaha, Suzuki, Kawasaki mới nhất tại AnhEm Motor.",
			heading: "Xe Máy"
		};
	}
	if (pageMode.value === 'accessories') {
		return {
			title: "Phụ tùng & Phụ kiện",
			description: "Cung cấp phụ tùng chính hãng, đồ chơi xe máy và phụ kiện bảo hộ cao cấp.",
			heading: "Phụ tùng & Phụ kiện"
		};
	}
	return {
		title: "Tất cả sản phẩm",
		description: "Khám phá tất cả các dòng xe máy và phụ tùng chính hãng tại AnhEm Motor.",
		heading: "Sản phẩm"
	};
});

useSeoMeta({
	title: () => `${pageConfig.value.title} | AnhEm Motor`,
	ogTitle: () => `${pageConfig.value.title} | AnhEm Motor`,
	description: () => pageConfig.value.description,
	ogDescription: () => pageConfig.value.description,
	ogImage: "/assets/image/index/index-banner-bg.webp",
	twitterTitle: () => `${pageConfig.value.title} | AnhEm Motor`,
	twitterDescription: () => pageConfig.value.description,
	twitterImage: "/assets/image/index/index-banner-bg.webp",
});

const filters = ref({
	search: route.query.search || "",
	optionValueIds: parseArrayQuery(route.query.optionValueIds),
	category_ids: parseArrayQuery(route.query.category_ids),
	brand_ids: parseArrayQuery(route.query.brand_ids),
	minPrice: route.query.minPrice ? Number(route.query.minPrice) : null,
	maxPrice: route.query.maxPrice ? Number(route.query.maxPrice) : null,
});

const {
	data: products,
	isLoading,
	pagination,
} = usePaginatedQuery({
	queryKey: ["products"],
	queryFn: (params) => {
		const sieveParams = { ...params };

		if (filters.value.search) {
			sieveParams.filters = `search@=${filters.value.search}`;
		}

		if (filters.value.optionValueIds.length > 0) {
			sieveParams.optionValueIds = filters.value.optionValueIds.join(",");
		}
		if (filters.value.category_ids.length > 0) {
			sieveParams.categoryIds = filters.value.category_ids.join(",");
		}
		if (filters.value.brand_ids.length > 0) {
			sieveParams.brandIds = filters.value.brand_ids.join(",");
		}

		if (filters.value.minPrice !== null) sieveParams.minPrice = Math.round(filters.value.minPrice);
		if (filters.value.maxPrice !== null) sieveParams.maxPrice = Math.round(filters.value.maxPrice);

		return productStore.getProducts(sieveParams);
	},
	itemsPerPage: 12,
	filters: filters,
	debouncedFields: ["search"],
	dataKey: (res) => res.items,
});

// Watch for URL changes to sync filters back (Crucial for Header links)
watch(
	() => route.query,
	(newQuery) => {
		filters.value.search = newQuery.search || "";
		filters.value.optionValueIds = parseArrayQuery(newQuery.optionValueIds);
		filters.value.category_ids = parseArrayQuery(newQuery.category_ids);
		filters.value.brand_ids = parseArrayQuery(newQuery.brand_ids);
		filters.value.minPrice = newQuery.minPrice ? Number(newQuery.minPrice) : null;
		filters.value.maxPrice = newQuery.maxPrice ? Number(newQuery.maxPrice) : null;
	},
	{ deep: true }
);

const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
	if (isSidebarOpen.value) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "";
	}
};

const handleViewDetail = (product) => {
	if (product.slug) {
		navigateTo(`/product/${product.slug}`);
	}
};

const formatVND = (value) => {
	if (!value) return "0 ₫";
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(value);
};
</script>

<template>
	<div class="bg-white min-h-screen">
		<Transition name="fade">
			<div
				v-if="isSidebarOpen"
				class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
				@click="toggleSidebar"
			/>
		</Transition>

		<Transition name="slide">
			<aside
				v-show="isSidebarOpen"
				class="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] lg:hidden shadow-2xl"
			>
				<ProductFilterSidebar v-model="filters" @close="toggleSidebar" />
			</aside>
		</Transition>

		<div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
			<div class="flex flex-col lg:flex-row gap-12">
				<aside class="hidden lg:block w-80 flex-shrink-0">
					<div
						class="sticky top-24 border border-gray-100 rounded-3xl shadow-sm overflow-hidden"
					>
						<ProductFilterSidebar v-model="filters" />
					</div>
				</aside>

				<div class="flex-1 min-w-0">
					<div
						class="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6"
					>
						<div>
							<h1 class="text-3xl sm:text-5xl font-black text-gray-900 mb-2 italic uppercase tracking-tighter">
								{{ pageConfig.heading }}
							</h1>
							<p class="text-gray-400 font-medium text-sm">{{ pageConfig.description }}</p>
						</div>

						<div class="flex items-center gap-3">
							<button
								class="lg:hidden flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-900 hover:bg-gray-50 transition-colors shadow-sm"
								aria-label="Mở bộ lọc sản phẩm"
								@click="toggleSidebar"
							>
								<Icon name="fa6-solid:filter" class="text-primary" />
								Lọc
							</button>
						</div>
					</div>

					<div
						v-if="
							filters.optionValueIds.length > 0 ||
							filters.category_ids.length > 0 ||
							filters.brand_ids.length > 0 ||
							filters.minPrice !== null ||
							filters.maxPrice !== null
						"
						class="flex flex-wrap gap-3 mb-8"
					>
						<span
							class="text-xs font-bold text-gray-400 uppercase tracking-widest w-full mb-1"
							>Đang lọc theo:</span
						>

						<!-- Price Chip -->
						<button
							v-if="filters.minPrice !== null || filters.maxPrice !== null"
							class="group flex items-center gap-2 px-4 py-2 bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 rounded-full text-sm font-bold transition-all"
							@click="filters.minPrice = null; filters.maxPrice = null"
						>
							<Icon name="fa6-solid:money-bill-wave" class="text-xs" />
							<span>
								Giá: {{ filters.minPrice ? formatVND(filters.minPrice) : '0' }} - 
								{{ filters.maxPrice ? formatVND(filters.maxPrice) : 'Tối đa' }}
							</span>
							<Icon
								name="fa6-solid:xmark"
								class="ml-1 opacity-50 group-hover:opacity-100"
							/>
						</button>

						<button
							class="px-4 py-2 bg-primary/5 text-primary rounded-full text-xs font-bold border border-primary/10 hover:bg-primary/10 transition-colors flex items-center gap-2"
							aria-label="Xóa tất cả bộ lọc đang chọn"
							@click="
								filters.optionValueIds = [];
								filters.category_ids = [];
								filters.brand_ids = [];
							"
						>
							Xóa tất cả
							<Icon name="fa6-solid:xmark" />
						</button>
					</div>

					<ProductList
						:products="products"
						:is-loading="isLoading"
						@view-detail="handleViewDetail"
					/>

					<div v-if="pagination.totalPages > 1" class="flex justify-center">
						<BasePagination
							:current-page="pagination.currentPage"
							:total-pages="pagination.totalPages"
							@update:current-page="pagination.goToPage"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.text-primary {
	color: #e31837;
}
.bg-primary {
	background-color: #e31837;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
	transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from,
.slide-leave-to {
	transform: translateX(-100%);
}
</style>

