import { defineStore } from "pinia";
import { ref } from "vue";
import categoryServiceFactory from "../services/category.service";
import { categoryMapper } from "../mappers/category.mapper";
import { useAxios } from "../composables/useAxios";

export const useCategoryStore = defineStore("category", () => {
	const axios = useAxios();
	const categoryService = categoryServiceFactory(axios);
	const categories = ref([]);
	const isLoading = ref(false);
	const error = ref(null);

	// Tác vụ cho trang category.vue (Dữ liệu tĩnh)
	const fetchStaticCategories = async () => {
		isLoading.value = true;
		error.value = null;
		try {
			const data = await categoryService.getStaticCategories();
			categories.value = categoryMapper.toUIList(data);
		} catch (err) {
			error.value = err.message || "Failed to load static categories";
		} finally {
			isLoading.value = false;
		}
	};

	// Tác vụ cho Sidebar Filter (Dữ liệu API)
	const getProductCategories = async (params = {}) => {
		return await categoryService.getApiCategories(params);
	};

	return {
		categories,
		isLoading,
		error,
		fetchStaticCategories,
		getProductCategories,
	};
});
