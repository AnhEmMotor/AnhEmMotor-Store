import { defineStore } from "pinia";
import { ref } from "vue";
import homeService from "@/services/homeService";
import homeMapper from "@/mappers/homeMapper";

export const useHomeStore = defineStore("home", () => {
	const brands = ref([]);
	const stats = ref([]);
	const searchPhrases = ref([]);
	const isLoading = ref(false);

	const fetchHomeData = async () => {
		isLoading.value = true;
		try {
			const [rawBrands, rawStats, rawPhrases] = await Promise.all([
				homeService.getBrands(),
				homeService.getHeroStats(),
				homeService.getSearchPhrases(),
			]);

			brands.value = homeMapper.mapBrands(rawBrands);
			stats.value = homeMapper.mapHeroStats(rawStats);
			searchPhrases.value = rawPhrases;
		} catch {
			// console.error("Error fetching home data:", error);
		} finally {
			isLoading.value = false;
		}
	};

	return {
		brands,
		stats,
		searchPhrases,
		isLoading,
		fetchHomeData,
	};
});
