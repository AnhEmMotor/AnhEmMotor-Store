import { promotionData } from "@/constants/promotion";

/**
 * Application Layer - Promotion Service
 */
export const promotionService = {
	async getAllPromotions() {
		try {
			return await promotionRepository.getAllPromotions();
		} catch (error) {
			console.error("Service: Failed to fetch promotions:", error);
			return [];
		}
	},

	async getPromotionBySlug(slug) {
		try {
			return await promotionRepository.getPromotionBySlug(slug);
		} catch (error) {
			console.error(`Service: Failed to fetch promotion detail for ${slug}:`, error);
			return null;
		}
	},

	async getHotPromotions() {
		try {
			return await promotionRepository.getHotPromotions();
		} catch (error) {
			console.error("Service: Failed to fetch hot promotions:", error);
			return [];
		}
	},
};

export default promotionService;
