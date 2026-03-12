<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { products as allProductsData } from "~/components/spare-parts/products-data";
import { useCart } from "~/composables/useCart";

useSeoMeta({
	title: "Phụ Tùng | AnhEm Motor",
	description:
		"Phụ tùng xe máy chính hãng, đảm bảo chất lượng tại AnhEm Motor.",
});

const router = useRouter();
const { addItem } = useCart();

const products = ref(allProductsData);
const currentPage = ref(1);
const itemsPerPage = 8;
const isFilterOpen = ref(false);
const isCartPanelOpen = ref(false);
const isDesktop = ref(true);
const productFilter = ref(null);

const currentFilters = ref({ productType: "all", priceRange: "all" });

const goToDetail = (product) => {
	router.push({ name: "spare-parts-id", params: { id: product.id } });
};

const filteredProducts = computed(() => {
	return products.value.filter((product) => {
		const typeMatch =
			currentFilters.value.productType === "all" ||
			product.type === currentFilters.value.productType;
		let priceMatch = true;
		if (currentFilters.value.priceRange !== "all") {
			const [minPriceStr, maxPriceStr] =
				currentFilters.value.priceRange.split("-");
			const minPrice = parseInt(minPriceStr) || 0;
			const maxPrice =
				maxPriceStr === "max" ? Infinity : parseInt(maxPriceStr) || Infinity;
			priceMatch = product.price >= minPrice && product.price <= maxPrice;
		}
		return typeMatch && priceMatch;
	});
});

const totalPages = computed(() =>
	Math.ceil(filteredProducts.value.length / itemsPerPage),
);

const paginatedProducts = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	return filteredProducts.value.slice(start, start + itemsPerPage);
});

const handleAddToCart = (product) => {
	addItem(product, 1);
};

const applyFilters = (newFilters) => {
	currentFilters.value = newFilters;
	currentPage.value = 1;
	closeFilter();
};

const clearFilters = () => {
	currentFilters.value = { productType: "all", priceRange: "all" };
	currentPage.value = 1;
	if (productFilter.value) productFilter.value.resetFilters();
};

const handlePageChange = (page) => {
	currentPage.value = page;
	window.scrollTo({ top: 0, behavior: "smooth" });
};

const openFilter = () => {
	isFilterOpen.value = true;
};
const closeFilter = () => {
	isFilterOpen.value = false;
};
const closeAllPanels = () => {
	isCartPanelOpen.value = false;
	isFilterOpen.value = false;
};

const checkScreenSize = () => {
	isDesktop.value = window.innerWidth >= 1024;
	if (isDesktop.value) isFilterOpen.value = false;
};

onMounted(() => {
	checkScreenSize();
	window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
	window.removeEventListener("resize", checkScreenSize);
});
</script>

<template>
	<div class="spare-parts-page">
		<div
			id="backdrop-overlay"
			:class="[isCartPanelOpen ? 'fixed inset-0 bg-black/60 z-40' : 'hidden']"
			@click="closeAllPanels"
		/>

		<div class="pt-6 md:pt-0 bg-gray-50">
			<CommonCategoryNav />
		</div>

		<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8 pb-12">
			<div class="lg:hidden flex justify-between items-center mb-6">
				<h1 class="text-2xl font-bold text-gray-800">Phụ Tùng</h1>
				<button
					class="bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 text-gray-700 hover:text-[#de0000] hover:border-[#de0000] transition"
					@click="openFilter"
				>
					<i class="fas fa-filter" />
					<span class="font-bold">LỌC</span>
				</button>
			</div>

			<div
				class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 sm:gap-6 md:gap-8 relative"
			>
				<div
					v-if="isFilterOpen"
					class="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
					@click="closeFilter"
				/>

				<div
					:class="[
						'fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-none lg:w-auto lg:bg-transparent lg:z-auto',
						isFilterOpen ? 'translate-x-0' : '-translate-x-full',
					]"
				>
					<div class="h-full overflow-y-auto p-4 lg:p-0">
						<div class="flex justify-between items-center lg:hidden mb-4">
							<h2 class="text-xl font-bold text-gray-800">Bộ Lọc</h2>
							<button
								class="text-gray-500 hover:text-red-500"
								@click="closeFilter"
							>
								<i class="fas fa-times text-xl" />
							</button>
						</div>
						<SparePartsProductFilter
							ref="productFilter"
							:products="products"
							@filter-change="applyFilters"
							@reset-filters="clearFilters"
						/>
					</div>
				</div>

				<main class="w-full min-w-0">
					<div class="flex justify-between items-center mb-6">
						<h2 class="hidden lg:block text-3xl font-bold text-gray-800">
							Phụ Tùng Chính Hãng
						</h2>
					</div>

					<div
						v-if="paginatedProducts.length === 0"
						class="text-center py-12 bg-white rounded-xl shadow-sm"
					>
						<div class="text-6xl text-gray-300 mb-4">
							<i class="fas fa-search" />
						</div>
						<p class="text-gray-500 text-lg">
							Không tìm thấy phụ tùng phù hợp.
						</p>
						<button
							class="mt-4 text-[#de0000] font-semibold hover:underline"
							@click="clearFilters"
						>
							Xóa bộ lọc
						</button>
					</div>

					<div
						v-else
						class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
					>
						<SparePartsProductCard
							v-for="product in paginatedProducts"
							:key="product.id"
							:product="product"
							@add-to-cart="handleAddToCart"
							@view-details="goToDetail"
						/>
					</div>

					<div class="mt-10">
						<UiBasePagination
							v-if="totalPages > 1"
							:current-page="currentPage"
							:total-pages="totalPages"
							@page-change="handlePageChange"
						/>
					</div>
				</main>
			</div>
		</div>
	</div>
</template>
