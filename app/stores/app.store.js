import { defineStore } from "pinia";

/**
 * Application Layer - App Store (Pinia)
 */
export const useAppStore = defineStore("app", {
	state: () => ({
		appContent: null,
		isLoading: false,
	}),

	actions: {
		async fetchAppContent() {
			this.isLoading = true;
			try {
				const data = await appService.getAppContent();
				this.appContent = JSON.parse(JSON.stringify(data));
			} catch (error) {
				console.error("Failed to fetch app content:", error);
			} finally {
				this.isLoading = false;
			}
		}
	}
});
