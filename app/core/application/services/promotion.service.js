

export const promotionService = {
	getAllPromotions: async () => {
		return promotionData;
	},

	getPromotionBySlug: async (slug) => {
		const promotion = promotionData.find((p) => p.slug === slug);
		return promotion || null;
	},

	getHotPromotions: async () => {
		return promotionData.filter((p) => p.isHot);
	},
};
