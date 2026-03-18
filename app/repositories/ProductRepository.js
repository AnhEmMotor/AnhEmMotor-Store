export const ProductRepository = (axios) => ({
	async getProducts(params) {
		const response = await axios.get("/api/v1/product", { params });
		return response.data;
	},
	async getProductStoreDetailBySlug(slug) {
		const response = await axios.get(`/api/v1/product/store/${slug}`);
		return response.data;
	},
	async getProductAttributeLabels() {
		const response = await axios.get("/api/v1/product/store/attribute-labels");
		return response.data;
	},
});
