import { defineStore } from "pinia";
import { newsService } from "@/services/news.service";
import newsMapper from "@/mappers/news.mapper";

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
				this.featuredNews = newsMapper.mapNewsList(data);
			} catch {
			} finally {
				this.isLoading = false;
			}
		},

		async fetchNewsBySlug(slug) {
			this.isLoading = true;
			try {
				const data = await newsService.getNewsBySlug(slug);
				this.currentNews = newsMapper.mapNewsDetail(data);
				return this.currentNews;
			} catch {
				return null;
			} finally {
				this.isLoading = false;
			}
		},
	},
});

