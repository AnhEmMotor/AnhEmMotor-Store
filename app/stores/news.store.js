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
        if (data) {
          this.latestNews = data;
        }
        return data;
      } catch {
        return [];
      } finally {
        this.isLoading = false;
      }
    },

    async fetchRelatedNews(slug) {
      try {
        const data = await newsService.getRelatedNews(slug);
        return data || [];
      } catch {
        return [];
      }
    },

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
      } catch {
        this.banners = [];
      }
    },
  },
});
