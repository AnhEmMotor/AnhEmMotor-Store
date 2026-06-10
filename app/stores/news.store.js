import { defineStore } from "pinia";
import { newsService } from "@/services/news.service";
import homeService from "@/services/home.service";

export const useNewsStore = defineStore("news", {
	state: () => ({
		featuredNews: [],
		latestNews: [],
		currentNews: null,
		banners: [],
		isLoading: false,
	}),

	actions: {
		async fetchLatestNews() {
			this.isLoading = true;
			try {
				const data = await newsService.getLatestNews();
				this.latestNews = data;
				return this.latestNews;
			} catch {
				return [];
			} finally {
				this.isLoading = false;
			}
		},

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
				return this.currentNews;
			} catch {
				return null;
			} finally {
				this.isLoading = false;
			}
		},

		async fetchBanners() {
			try {
				const data = await homeService.getBanners("News");
				this.banners = data;
			} catch (error) {
				console.error("fetchBanners Error:", error);
				this.banners = [];
			}
		},
	},
});
