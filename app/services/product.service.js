export const productService = {
	async getProducts(params) {
		try {
			const data = await productRepository.getProducts(params);
			return {
				items: data.items || [],
				totalCount: data.totalCount,
				totalPages: data.totalPages,
			};
		} catch {
			return { items: [], totalCount: 0 };
		}
	},

	async getProductDetail(slug) {
		try {
			const data = await productRepository.getProductDetail(slug);
			return data || null;
		} catch (error) {
			console.error("[SSR Fetch Error getProductDetail]:", error);
			return null;
		}
	},

	async getOptions() {
		return await productRepository.getOptions();
	},

	async getAttributeLabels() {
		return await productRepository.getAttributeLabels();
	},

	async getBrands() {
		try {
			const data = await productRepository.getBrands();
			return data?.items || data || [];
		} catch {
			return [];
		}
	},
};

export default productService;
