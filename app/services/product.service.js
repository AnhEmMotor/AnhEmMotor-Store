
export const productService = {
	async getProducts(params) {
		try {
			const data = await productRepository.getProducts(params);
			return {
				items: (data.items || []).map(item => new Product(item)),
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
			return data ? new Product(data) : null;
		} catch {

			return null;
		}
	},

	async getOptions() {
		return await productRepository.getOptions();
	},

	async getAttributeLabels() {
		return await productRepository.getAttributeLabels();
	},
};

export default productService;
