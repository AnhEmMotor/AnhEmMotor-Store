

/**
 * Application Layer - Category Service
 */
export const categoryService = {
	async getStaticCategories() {
		return STATIC_CATEGORIES;
	},

	async getApiCategories(params = {}) {
		try {
			return await categoryRepository.getCategories(params);
		} catch (error) {
			console.error("Service: Failed to fetch API categories:", error);
			return [];
		}
	},
};

export default categoryService;
