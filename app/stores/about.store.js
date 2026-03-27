import { defineStore } from "pinia";
import { aboutService } from "@/services/about.service";

export const useAboutStore = defineStore("about", {
	state: () => ({
		aboutContent: null,
		locations: [],
		isLoading: false,
	}),

	actions: {
		/**
		 * Lấy nội dung giới thiệu của trang About
		 */
		async fetchAboutContent() {
			this.isLoading = true;
			try {
				const data = await aboutService.getAboutContent();
				this.aboutContent = data;
			} catch {
				// Xử lý lỗi nếu cần thiết
			} finally {
				this.isLoading = false;
			}
		},

		/**
		 * Lấy danh sách các cơ sở của AnhEm Motor
		 */
		async fetchLocations() {
			try {
				const data = await aboutService.getLocations();
				this.locations = data;
			} catch {
				// Xử lý lỗi nếu cần thiết
			}
		},
	},
});
