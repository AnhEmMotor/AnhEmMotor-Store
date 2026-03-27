import { defineStore } from "pinia";
import { promotionService } from "@/services/promotion.service";

export const usePromotionStore = defineStore("promotion", {
	state: () => ({
		promotions: [],
		currentPromotion: null,
		isLoading: false,
	}),

	actions: {
		/**
		 * Fetch tất cả khuyến mãi
		 */
		async fetchAllPromotions() {
			this.isLoading = true;
			try {
				const data = await promotionService.getAllPromotions();
				this.promotions = data;
			} catch {
				// Xử lý lỗi
			} finally {
				this.isLoading = false;
			}
		},

		/**
		 * Fetch chi tiết khuyến mãi theo slug
		 */
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
