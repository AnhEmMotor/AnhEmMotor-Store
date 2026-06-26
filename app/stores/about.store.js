import { defineStore } from "pinia";
import { aboutRepository } from "@/core/infrastructure/repositories/about.repository";
import { createAboutService } from "@/services/about.service";

const aboutService = createAboutService(aboutRepository);

export const useAboutStore = defineStore("about", {
	state: () => ({
		aboutContent: null,
		locations: [],
		isLoading: false,
	}),

	actions: {
		async fetchAboutContent() {
			this.isLoading = true;
			try {
				const data = await aboutService.getAboutContent();
				this.aboutContent = JSON.parse(JSON.stringify(data));
			} catch {
			} finally {
				this.isLoading = false;
			}
		},

		async fetchLocations() {
			try {
				const data = await aboutService.getLocations();
				this.locations = JSON.parse(JSON.stringify(data));
			} catch {}
		},
	},
});
