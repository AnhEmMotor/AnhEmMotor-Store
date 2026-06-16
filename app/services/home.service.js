

/**
 * Application Layer - Home Service
 * Orchestrates business logic for the Home page
 */
import { IHomeRepository } from "@/core/domain/repositories/home.repository.interface";

/**
 * Factory function to create home service with dependency injection
 * @param {IHomeRepository} repository
 * @returns {IHomeRepository}
 */
export const createHomeService = (repository) => ({
	async getBrands() {
		try {
			return await repository.getBrands();
		} catch (error) {
			return [];
		}
	},

	async getHeroStats() {
		return await repository.getHeroStats();
	},

	async getSearchPhrases() {
		return await repository.getSearchPhrases();
	},

	async getFeaturedProducts() {
		try {
			return await repository.getFeaturedProducts();
		} catch (error) {
			return [];
		}
	},

	async getBanners() {
		try {
			return await repository.getBanners();
		} catch (error) {
			return [];
		}
	},
});

export default createHomeService;
