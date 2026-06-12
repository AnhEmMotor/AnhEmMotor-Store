import { promotionData } from "../../../constants/promotion";


export const promotionRepository = {
	async getAllPromotions() {
		
		await new Promise(resolve => setTimeout(resolve, 500));
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
