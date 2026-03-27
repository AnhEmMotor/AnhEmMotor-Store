import { PRODUCT_ENDPOINTS } from "@/constants/endpoints/product";

const productService = (axios) => ({
	async getProducts(params) {
		const response = await axios.get(PRODUCT_ENDPOINTS.LIST, { params });
		return response.data;
	},

	async getProductDetail(slug) {
		const response = await axios.get(`${PRODUCT_ENDPOINTS.DETAIL}/${slug}`);
		return response.data;
	},

	async getOptions() {
		const response = await axios.get(PRODUCT_ENDPOINTS.OPTIONS);
		return response.data;
	},

	async getAttributeLabels() {
		const response = await axios.get(PRODUCT_ENDPOINTS.ATTRIBUTE_LABELS);
		return response.data;
	},
});

export default productService;
