
export const promotionService = {
	async getAllPromotions() {
		try {
			return await promotionRepository.getAllPromotions();
		} catch {

			return [];
		}
	},

	async getPromotionBySlug(slug) {
		try {
			return await promotionRepository.getPromotionBySlug(slug);
		} catch {

			return null;
		}
	},

	async getHotPromotions() {
		try {
			return await promotionRepository.getHotPromotions();
		} catch {

			return [];
		}
	},
};

export default promotionService;
