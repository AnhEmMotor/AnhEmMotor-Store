export const categoryRepository = {
	async getCategories(params = {}) {
		const axios = useAxios();
		const response = await axios.get("/api/v1/ProductCategory", { params });
		return response.data;
	},
};
