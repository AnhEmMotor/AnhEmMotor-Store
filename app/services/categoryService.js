import { STATIC_CATEGORIES } from "../constants/categories";
import { PRODUCT_ENDPOINTS } from "../constants/endpoints/product";

export default (axiosInstance) => ({
	async getStaticCategories() {
		// Trả về dữ liệu tĩnh cho trang category.vue theo yêu cầu
		return Promise.resolve(STATIC_CATEGORIES);
	},

	async getApiCategories(params = {}) {
		// Gọi API thực tế cho các thành phần khác (ví dụ: Sidebar Filter)
		const { data } = await axiosInstance.get(PRODUCT_ENDPOINTS.CATEGORIES, {
			params,
		});
		return data;
	},
});
