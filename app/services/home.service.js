

/**
 * Application Layer - Home Service
 * Orchestrates business logic for the Home page
 */
const homeService = {
	async getBrands() {
		try {
			return await homeRepository.getBrands();
		} catch (error) {
			console.error("Service: Failed to fetch brands:", error);
			return [];
		}
	},

	async getHeroStats() {
		return await homeRepository.getHeroStats();
	},

	async getSearchPhrases() {
		return await homeRepository.getSearchPhrases();
	},

	async getFeaturedProducts() {
		try {
			return await homeRepository.getFeaturedProducts();
		} catch (error) {
			console.error("Service: Failed to fetch featured products:", error);
			return [];
		}
	},

	async getBanners(placement) {
		try {
			return await homeRepository.getBanners(placement);
		} catch (error) {
			console.error("Service: Failed to fetch banners:", error);
			return [];
		}
	},
};

export default homeService;
