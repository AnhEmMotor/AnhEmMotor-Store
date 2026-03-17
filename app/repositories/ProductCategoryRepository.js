export const ProductCategoryRepository = (axios) => ({
	async getProductCategories(params) {
		const response = await axios.get("/api/v1/ProductCategory", { params });
		return response.data;
	},
});
