/**
 * Application Layer - Product Service
 */
import { IProductRepository } from "@/core/domain/repositories/product.repository.interface";

/**
 * Factory function to create product service with dependency injection
 * @param {IProductRepository} repository
 * @returns {IProductRepository}
 */
export const createProductService = (repository) => ({
	async getProducts(params) {
		try {
			const data = await repository.getProducts(params);
			return {
				items: data.items || [],
				totalCount: data.totalCount,
				totalPages: data.totalPages,
			};
		} catch (error) {
			return { items: [], totalCount: 0 };
		}
	},

	async getProductDetail(slug) {
		try {
			const data = await repository.getProductDetail(slug);
			return data || null;
		} catch (error) {
			return null;
		}
	},

	async getOptions() {
		return await repository.getOptions();
	},

	async getAttributeLabels() {
		return await repository.getAttributeLabels();
	},
});

export default createProductService;
