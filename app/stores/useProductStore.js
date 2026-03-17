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
			if (Array.isArray(res)) {
				options.value = res;
			} else if (res && res.isSuccess) {
				options.value = res.value;
			} else {
				optionsError.value =
					res?.errors?.[0]?.message || "Failed to load options";
			}
		} catch (error) {
			optionsError.value = error.message || "An error occurred";
		} finally {
			isLoadingOptions.value = false;
		}
	};

	const getProducts = async (params) => {
		const res = await productRepo.getProducts(params);
		return res;
	};
	return {
		options,
		isLoadingOptions,
		optionsError,
		fetchOptions,
		getProducts,
	};
});
