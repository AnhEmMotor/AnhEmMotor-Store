import { defineStore } from "pinia";
import { ref } from "vue";
import brandServiceFactory from "../services/brand.service";
import { useAxios } from "../composables/useAxios";

export const useBrandStore = defineStore("brand", () => {
	const axios = useAxios();
	const brandService = brandServiceFactory(axios);
	const brands = ref([]);
	const isLoading = ref(false);
	const error = ref(null);

	const getBrands = async (params = {}) => {
		return await brandService.getBrands(params);
	};

	return {
		brands,
		isLoading,
		error,
		getBrands,
	};
});
