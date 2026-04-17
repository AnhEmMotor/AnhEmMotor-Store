import { BRAND_ENDPOINTS } from "@/constants/endpoints/brand.endpoint";

const brandService = (axios) => ({
	async getBrands(params) {
		const response = await axios.get(BRAND_ENDPOINTS.LIST, { params });
		return response.data;
	},
});

export default brandService;
