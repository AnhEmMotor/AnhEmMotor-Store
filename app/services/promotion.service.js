/**
 * Application Layer - Promotion Service
 */
import { IPromotionRepository } from "@/core/domain/repositories/promotion.repository.interface";

/**
 * Factory function to create promotion service with dependency injection
 * @param {IPromotionRepository} repository
 * @returns {IPromotionRepository}
 */
export const createPromotionService = (repository) => ({
	async getAllPromotions() {
		try {
			return await repository.getAllPromotions();
		} catch (error) {
			return [];
		}
	},

	async getPromotionBySlug(slug) {
		try {
			return await repository.getPromotionBySlug(slug);
		} catch (error) {
			return null;
		}
	},

	async getHotPromotions() {
		try {
			return await repository.getHotPromotions();
		} catch (error) {
			return [];
		}
	},
});

export default createPromotionService;
