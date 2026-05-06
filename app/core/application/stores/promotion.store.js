import { defineStore } from "pinia";


export const usePromotionStore = defineStore("promotion", {
	state: () => ({
		promotions: [],
		currentPromotion: null,
		isLoading: false,
	}),

	actions: {
		async fetchAllPromotions() {
			this.isLoading = true;
			try {
				const data = await promotionService.getAllPromotions();
				this.promotions = data;
			} catch {
			} finally {
				this.isLoading = false;
			}
		},

		async fetchPromotionBySlug(slug) {
			this.isLoading = true;
			try {
				const data = await promotionService.getPromotionBySlug(slug);
				this.currentPromotion = data;
				return data;
			} catch {
				return null;
			} finally {
				this.isLoading = false;
			}
		},
	},
});
