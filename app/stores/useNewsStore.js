import { defineStore } from "pinia";
import { newsService } from "@/services/newsService";

export const useNewsStore = defineStore("news", {
	state: () => ({
		featuredNews: [],
		currentNews: null,
		isLoading: false,
	}),

	actions: {
		/**
		 * Fetch tin tức nổi bật
		 */
		async fetchFeaturedNews() {
			this.isLoading = true;
			try {
				const data = await newsService.getFeaturedNews();
				this.featuredNews = data;
			} catch {
				// Xử lý lỗi
			} finally {
				this.isLoading = false;
			}
		},

		/**
		 * Fetch chi tiết tin tức theo slug
		 */
		async fetchNewsBySlug(slug) {
			this.isLoading = true;
			try {
				const data = await newsService.getNewsBySlug(slug);
				this.currentNews = data;
				return data;
			} catch {
				return null;
			} finally {
				this.isLoading = false;
			}
		},
	},
});
