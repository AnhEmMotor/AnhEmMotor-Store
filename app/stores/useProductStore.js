import { defineStore } from "pinia";
import { ref } from "vue";
import { useAxios } from "@/composables/useAxios";
import { ProductRepository } from "@/repositories/ProductRepository";
import { OptionRepository } from "@/repositories/OptionRepository";

export const useProductStore = defineStore("product", () => {
	const axios = useAxios();
	const productRepo = ProductRepository(axios);
	const optionRepo = OptionRepository(axios);

	const options = ref([]);
	const isLoadingOptions = ref(false);
	const optionsError = ref(null);

	const fetchOptions = async () => {
		isLoadingOptions.value = true;
		optionsError.value = null;
		try {
			const res = await optionRepo.getOptions();
			options.value = res || [];
		} catch (error) {
			optionsError.value = error.message || "An error occurred";
		} finally {
			isLoadingOptions.value = false;
		}
	};

	const getOptions = async () => {
		return await optionRepo.getOptions();
	};

	const getProducts = async (params) => {
		return await productRepo.getProducts(params);
	};

	const getProductStoreDetailBySlug = async (slug) => {
		return await productRepo.getProductStoreDetailBySlug(slug);
	};

	const getProductAttributeLabels = async () => {
		return await productRepo.getProductAttributeLabels();
	};

	return {
		options,
		isLoadingOptions,
		optionsError,
		fetchOptions,
		getOptions,
		getProducts,
		getProductStoreDetailBySlug,
		getProductAttributeLabels,
	};
});
