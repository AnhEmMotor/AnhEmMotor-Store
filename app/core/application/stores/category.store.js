import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoryStore = defineStore("category", () => {
	const axios = useAxios();
	const service = categoryService(axios);
	const categories = ref([]);
	const isLoading = ref(false);
	const error = ref(null);

	const fetchStaticCategories = async () => {
		isLoading.value = true;
		error.value = null;
		try {
			const data = await service.getStaticCategories();
			categories.value = categoryMapper.toUIList(data);
		} catch (err) {
			error.value = err.message || "Failed to load static categories";
		} finally {
			isLoading.value = false;
		}
	};

	const getProductCategories = async (params = {}) => {
		return await service.getApiCategories(params);
	};

	return {
		categories,
		isLoading,
		error,
		fetchStaticCategories,
		getProductCategories,
	};
});

