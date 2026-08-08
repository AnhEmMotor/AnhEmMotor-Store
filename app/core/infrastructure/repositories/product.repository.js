import { PRODUCT_ENDPOINTS } from "../endpoints/product.endpoint";
import { useAuthStore } from "@/stores/auth.store";

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

	async getBrands(params) {
		const axios = useAxios();
		const response = await axios.get(PRODUCT_ENDPOINTS.BRANDS, { params });
		return response.data;
	},

	async getRecommendations(params) {
		const axios = useAxios();
		const response = await axios.get(PRODUCT_ENDPOINTS.RECOMMENDATIONS, { params });
		return response.data;
	},

	async trackView(productId, dwellTimeMs, visitorKey) {
		const config = useRuntimeConfig();
		const baseURL = import.meta.server
			? config.internalApiUrlForServer
			: config.public.apiUrlForBrowserClient;
		const authStore = useAuthStore();
		await fetch(`${baseURL}${PRODUCT_ENDPOINTS.TRACK_VIEW(productId)}`, {
			method: "POST",
			keepalive: true,
			headers: {
				"Content-Type": "application/json",
				...(authStore.accessToken ? { Authorization: `Bearer ${authStore.accessToken}` } : {}),
			},
			body: JSON.stringify({ dwellTimeMs, visitorKey }),
		});
	},
};
