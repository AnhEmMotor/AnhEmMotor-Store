import { defineStore } from "pinia";
import { ref, computed } from "vue";
import homeService from "@/services/home.service";
import homeMapper from "@/mappers/home.mapper";

export const useHomeStore = defineStore("home", () => {
	const brands = ref([]);
	const stats = ref([]);
	const searchPhrases = ref([]);
	const isLoading = ref(false);

	const activeCategory = ref("");
	const searchFilters = ref({
		keyword: "",
		model: "",
		priceRange: "",
	});

	const featuredProducts = ref([]);
	const banners = ref([]);

	const filteredProducts = computed(() => {
		return featuredProducts.value.filter((p) => {
			const matchesCategory =
				!activeCategory.value || p.category === activeCategory.value;
			const matchesKeyword =
				!searchFilters.value.keyword ||
				p.name
					.toLowerCase()
					.includes(searchFilters.value.keyword.toLowerCase());
			const matchesPrice =
				!searchFilters.value.priceRange ||
				checkPriceRange(p.price, searchFilters.value.priceRange);
			return matchesCategory && matchesKeyword && matchesPrice;
		});
	});

	const checkPriceRange = (price, range) => {
		const [min, max] = range
			.split("-")
			.map((v) => (v === "plus" ? Infinity : parseInt(v) * 1000000));
		return price >= min && price <= (max || Infinity);
	};

	const fetchHomeData = async () => {
		if (isLoading.value) return;
		isLoading.value = true;
		try {
			const [rawBrands, rawStats, rawPhrases, rawProducts, rawBanners] =
				await Promise.all([
					homeService.getBrands(),
					homeService.getHeroStats(),
					homeService.getSearchPhrases(),
					homeService.getFeaturedProducts(),
					homeService.getBanners(),
				]);

			brands.value = homeMapper.mapBrands(rawBrands);
			stats.value = homeMapper.mapHeroStats(rawStats);
			searchPhrases.value = rawPhrases;
			featuredProducts.value = homeMapper.mapProducts(rawProducts);
			banners.value = homeMapper.mapBanners(rawBanners);
		} catch (error) {
			console.error("Home data fetch error:", error);
		} finally {
			isLoading.value = false;
		}
	};

	return {
		brands,
		stats,
		searchPhrases,
		isLoading,
		featuredProducts,
		filteredProducts,
		activeCategory,
		searchFilters,
		banners,
		fetchHomeData,
	};
});

