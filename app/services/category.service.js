import { STATIC_CATEGORIES } from "../constants/categories";
import { PRODUCT_ENDPOINTS } from "../constants/endpoints/product.endpoint";

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
