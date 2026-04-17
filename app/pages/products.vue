<script setup>
import { ref } from "vue";
import { useProductStore } from "@/stores/product.store";
import { usePaginatedQuery } from "@/composables/usePaginatedQuery";
import BasePagination from "@/components/ui/BasePagination.vue";

useSeoMeta({
	title: "Danh sách sản phẩm",
	ogTitle: "Danh sách sản phẩm",
	description:
		"Khám phá tất cả các dòng xe máy và phụ tùng chính hãng tại AnhEm Motor.",
	ogDescription:
		"Khám phá tất cả các dòng xe máy và phụ tùng chính hãng tại AnhEm Motor.",
	ogImage: "/assets/image/index/index-banner-bg.webp",
	twitterTitle: "Danh sách sản phẩm",
	twitterDescription:
		"Khám phá tất cả các dòng xe máy và phụ tùng chính hãng tại AnhEm Motor.",
	twitterImage: "/assets/image/index/index-banner-bg.webp",
});

useHead({
	link: [
		{
			rel: "icon",
			type: "image/x-icon",
			href: "/favicon.ico",
		},
	],
});

const productStore = useProductStore();
const isSidebarOpen = ref(false);

const route = useRoute();

const parseArrayQuery = (val) => {
	if (!val) return [];
	const strVal = String(val);
	return strVal
		.split(",")
		.map(Number)
		.filter((n) => !Number.isNaN(n));
};

const filters = ref({
	search: route.query.search || "",
	optionValueIds: parseArrayQuery(route.query.optionValueIds),
	category_ids: parseArrayQuery(route.query.category_ids),
	brand_ids: parseArrayQuery(route.query.brand_ids),
	maxPrice: Number(route.query.maxPrice) || 200000000,
	sort: route.query.sort || "newest",
	needs: [],
});

const {
	data: products,
	isLoading,
	pagination,
} = usePaginatedQuery({
	queryKey: ["products"],
	queryFn: (params) => {
		const sieveParams = { ...params };
		const filterParts = [];

		if (filters.value.search) {
			filterParts.push(`search@=${filters.value.search}`);
		}

		if (filters.value.maxPrice) {
			filterParts.push(`price<=${filters.value.maxPrice}`);
		}

		if (filterParts.length > 0) {
			sieveParams.filters = filterParts.join(",");
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

		// Sorting logic
		if (filters.value.sort === "price-asc") sieveParams.sorts = "price";
		else if (filters.value.sort === "price-desc") sieveParams.sorts = "-price";
		else if (filters.value.sort === "popular") sieveParams.sorts = "-hasBeenBooked";
		else sieveParams.sorts = "-id";

		return productStore.getProducts(sieveParams);
	},
	itemsPerPage: 12,
	filters: filters,
	debouncedFields: ["search"],
	dataKey: (res) => res.items,
});


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
</script>

<template>
	<div class="bg-gray-50/50 min-h-screen">
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

		<!-- Trust Signals Banner -->
		<div class="bg-white border-b border-gray-100 hidden sm:block">
			<div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
				<div class="grid grid-cols-4 gap-6">
					<div class="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50 transition-all hover:bg-white hover:shadow-sm">
						<div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-primary shadow-inner">
							<Icon name="fa6-solid:circle-check" />
						</div>
						<span class="text-[10px] font-black uppercase tracking-[0.15em] text-gray-600 leading-tight">Bảo hành<br>chính hãng 2 năm</span>
					</div>
					<div class="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50 transition-all hover:bg-white hover:shadow-sm">
						<div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
							<Icon name="fa6-solid:percent" />
						</div>
						<span class="text-[10px] font-black uppercase tracking-[0.15em] text-gray-600 leading-tight">Hỗ trợ trả góp<br>0% lãi suất</span>
					</div>
					<div class="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50 transition-all hover:bg-white hover:shadow-sm">
						<div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shadow-inner">
							<Icon name="fa6-solid:truck" />
						</div>
						<span class="text-[10px] font-black uppercase tracking-[0.15em] text-gray-600 leading-tight">Giao xe tận nơi<br>toàn quốc</span>
					</div>
					<div class="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50 transition-all hover:bg-white hover:shadow-sm">
						<div class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shadow-inner">
							<Icon name="fa6-solid:headset" />
						</div>
						<span class="text-[10px] font-black uppercase tracking-[0.15em] text-gray-600 leading-tight">Hỗ trợ kỹ thuật<br>tận tâm 24/7</span>
					</div>
				</div>
			</div>
		</div>

		<div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
			<!-- Breadcrumbs -->
			<div class="mb-10">
				<UiBaseBreadcrumbs :items="[{ label: 'Sản phẩm' }]" />
			</div>

			<div class="flex flex-col lg:flex-row gap-12 lg:gap-16">
				<!-- Sidebar -->
				<aside class="hidden lg:block w-64 flex-shrink-0">
					<div class="sticky top-24 border border-gray-100/50 rounded-[2rem] bg-gray-50/30 overflow-hidden">
						<ProductFilterSidebar v-model="filters" />
					</div>
				</aside>

				<div class="flex-1 min-w-0">
					<!-- Header & Sort -->
					<div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-6">
						<div>
							<h1 class="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
								Danh mục sản phẩm
							</h1>
							<p class="text-sm text-gray-500 font-medium">Tìm thấy <span class="text-primary font-bold">{{ pagination.totalItems || 0 }}</span> sản phẩm phù hợp</p>
						</div>

						<div class="flex items-center gap-3">
							<!-- Sort Dropdown -->
							<div class="relative group">
								<select 
									v-model="filters.sort"
									class="appearance-none pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl font-bold text-xs text-gray-900 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer hover:border-primary transition-all shadow-sm min-w-[180px]"
								>
									<option value="newest">Mới nhất</option>
									<option value="price-asc">Giá tăng dần</option>
									<option value="price-desc">Giá giảm dần</option>
									<option value="popular">Bán chạy</option>
								</select>
								<Icon name="fa6-solid:arrow-down-wide-short" class="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xs" />
								<Icon name="fa6-solid:chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]" />
							</div>

							<button
								class="lg:hidden flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-900 hover:bg-gray-50 transition-colors shadow-sm"
								@click="toggleSidebar"
							>
								<Icon name="fa6-solid:filter" class="text-primary" />
								Lọc
							</button>
						</div>
					</div>

					<!-- Active Filters -->
					<div
						v-if="
							filters.optionValueIds.length > 0 ||
							filters.category_ids.length > 0 ||
							filters.search
						"
						class="flex flex-wrap gap-2 mb-8"
					>
						<span class="text-[10px] font-black text-gray-400 uppercase tracking-widest w-full mb-1">Đang áp dụng:</span>
						
						<button
							v-if="filters.search"
							class="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-600 flex items-center gap-2 hover:border-primary transition-colors"
							@click="filters.search = ''"
						>
							Từ khóa: {{ filters.search }}
							<Icon name="fa6-solid:xmark" class="text-gray-400" />
						</button>

						<button
							class="px-3 py-1.5 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-black transition-all flex items-center gap-2"
							@click="
								filters.optionValueIds = [];
								filters.category_ids = [];
								filters.search = '';
							"
						>
							Xóa tất cả bộ lọc
							<Icon name="fa6-solid:trash-can" />
						</button>
					</div>

					<!-- Product List -->
					<div v-if="!isLoading && (!products || products.length === 0)" class="py-20 flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-100 shadow-sm px-6 text-center">
						<div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
							<Icon name="fa6-solid:motorcycle" class="text-4xl text-gray-200" />
						</div>
						<h3 class="text-xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm phù hợp</h3>
						<p class="text-gray-500 text-sm max-w-xs mb-8">Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm để có kết quả tốt hơn.</p>
						<button @click="filters.optionValueIds = []; filters.category_ids = []; filters.search = ''" class="px-8 py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-primary/20">
							Xem tất cả sản phẩm
						</button>
					</div>

					<ProductList
						v-else
						:products="products"
						:is-loading="isLoading"
						@view-detail="handleViewDetail"
					/>

					<!-- Pagination -->
					<div v-if="pagination.totalPages > 1" class="flex justify-center mt-12">
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
