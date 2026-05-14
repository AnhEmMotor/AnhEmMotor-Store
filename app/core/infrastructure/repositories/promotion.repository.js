import { promotionData } from "../../domain/constants/promotion";

/**
 * Infrastructure Layer - Promotion Repository
 */
export const promotionRepository = {
	async getAllPromotions() {
		return promotionData;
	},

	async getPromotionBySlug(slug) {
		const promotion = promotionData.find((p) => p.slug === slug);
		return promotion || null;
	},

	async getHotPromotions() {
		return promotionData.filter((p) => p.isHot);
	},
};
