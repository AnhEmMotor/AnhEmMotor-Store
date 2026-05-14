import { PRODUCT_ENDPOINTS } from "../../domain/constants/endpoints/product.endpoint";

/**
 * Infrastructure Layer - Product Repository
 */
export const productRepository = {
	async getProducts(params) {
		const axios = useAxios();
		const response = await axios.get(PRODUCT_ENDPOINTS.LIST, { params });
		return response.data;
	},

	async getProductDetail(slug) {
		const axios = useAxios();
		const response = await axios.get(`${PRODUCT_ENDPOINTS.DETAIL}/${slug}`);
		return response.data;
	},

	async getOptions() {
		const axios = useAxios();
		const response = await axios.get(PRODUCT_ENDPOINTS.OPTIONS);
		return response.data;
	},

	async getAttributeLabels() {
		const axios = useAxios();
		const response = await axios.get(PRODUCT_ENDPOINTS.ATTRIBUTE_LABELS);
		return response.data;
	},
};
