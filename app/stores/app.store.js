import { defineStore } from "pinia";
import { appRepository } from "@/core/infrastructure/repositories/app.repository";
import { createAppService } from "@/services/app.service";

const appService = createAppService(appRepository);

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
			} finally {
				this.isLoading = false;
			}
		}
	}
});
