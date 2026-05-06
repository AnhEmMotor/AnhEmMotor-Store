
export default (axiosInstance) => ({
	async getStaticCategories() {
		return Promise.resolve(STATIC_CATEGORIES);
	},

	async getApiCategories(params = {}) {
		const { data } = await axiosInstance.get(PRODUCT_ENDPOINTS.CATEGORIES, {
			params,
		});
		return data;
	},
});

