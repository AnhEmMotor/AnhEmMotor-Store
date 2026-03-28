import { defineStore } from "pinia";
import { newsService } from "@/services/news.service";

export const useNewsStore = defineStore("news", {
	state: () => ({
		featuredNews: [],
		currentNews: null,
		isLoading: false,
	}),

	actions: {
		async fetchFeaturedNews() {
			this.isLoading = true;
			try {
				const data = await newsService.getFeaturedNews();
				this.featuredNews = data;
			} catch {
			} finally {
				this.isLoading = false;
			}
		},

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
