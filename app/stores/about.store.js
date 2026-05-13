import { defineStore } from "pinia";
import { aboutService } from "@/services/about.service";

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
				this.aboutContent = data;
			} catch {
			} finally {
				this.isLoading = false;
			}
		},

		async fetchLocations() {
			try {
				const data = await aboutService.getLocations();
				this.locations = data;
			} catch {}
		},
	},
});
