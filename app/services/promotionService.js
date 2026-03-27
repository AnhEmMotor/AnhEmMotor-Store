import { promotionData } from "@/constants/promotion";

export const promotionService = {
	/**
	 * Lấy tất cả danh sách khuyến mãi
	 */
	getAllPromotions: async () => {
		// Giả lập gọi API
		return promotionData;
	},

	/**
	 * Lấy chi tiết khuyến mãi theo slug
	 */
	getPromotionBySlug: async (slug) => {
		const promotion = promotionData.find((p) => p.slug === slug);
		return promotion || null;
	},

	/**
	 * Lấy danh sách khuyến mãi nổi bật
	 */
	getHotPromotions: async () => {
		return promotionData.filter((p) => p.isHot);
	},
};
