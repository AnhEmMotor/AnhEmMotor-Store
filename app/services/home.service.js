


const homeService = {
	async getBrands() {
		try {
			return await homeRepository.getBrands();
		} catch {

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
		} catch {

			return [];
		}
	},

	async getBanners(placement) {
		try {
			return await homeRepository.getBanners(placement);
		} catch {

			return [];
		}
	},
};

export default homeService;
