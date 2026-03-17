import { defineStore } from "pinia";
import { ref } from "vue";
import { useAxios } from "@/composables/useAxios";
import { ProductCategoryRepository } from "@/repositories/ProductCategoryRepository";

export const useCategoryStore = defineStore("category", () => {
	const axios = useAxios();
	const categoryRepo = ProductCategoryRepository(axios);

	const categories = ref([]);
	const isLoadingCategories = ref(false);
	const categoriesError = ref(null);

	const fetchCategories = async (params = {}) => {
		isLoadingCategories.value = true;
		categoriesError.value = null;
		try {
			const res = await categoryRepo.getProductCategories(params);
			if (res && res.items) {
				categories.value = res.items;
			} else if (Array.isArray(res)) {
				categories.value = res;
			} else {
				categoriesError.value = "Failed to load categories";
			}
		} catch (error) {
			categoriesError.value = error.message || "An error occurred";
		} finally {
			isLoadingCategories.value = false;
		}
	};

	return {
		categories,
		isLoadingCategories,
		categoriesError,
		fetchCategories,
	};
});
