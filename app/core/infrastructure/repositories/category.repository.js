export const categoryRepository = {
	async getCategories() {
		const axios = useAxios();
		const response = await axios.get("/api/v1/ProductCategory");
		return response.data;
	}
};
