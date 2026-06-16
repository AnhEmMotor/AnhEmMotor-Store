import { STATIC_CATEGORIES } from "../constants/categories";
import { ICategoryRepository } from "@/core/domain/repositories/category.repository.interface";

/**
 * Application Layer - Category Service
 */
export const createCategoryService = (repository) => ({
	async getStaticCategories() {
		return STATIC_CATEGORIES;
	},

	async getApiCategories(params = {}) {
		try {
			return await repository.getCategories(params);
		} catch (error) {
			return [];
		}
	},
});

export default createCategoryService;
