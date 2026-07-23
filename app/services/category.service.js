import { STATIC_CATEGORIES } from "../constants/categories";
import { categoryRepository } from "../core/infrastructure/repositories/category.repository";

export const categoryService = {
	async getStaticCategories() {
		return STATIC_CATEGORIES;
	},

	async getApiCategories(params = {}) {
		try {
			return await categoryRepository.getCategories(params);
		} catch (error) {
			console.error("Failed to fetch categories:", error);
			return [];
		}
	},
};

export default categoryService;
