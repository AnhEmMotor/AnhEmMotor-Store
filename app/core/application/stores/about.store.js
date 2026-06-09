import { defineStore } from "pinia";
import { aboutService } from "@/core/infrastructure/services/about.service";

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
				// Convert to POJO for Pinia serialization
				this.aboutContent = JSON.parse(JSON.stringify(data));
			} catch (error) {
				console.error("Failed to fetch about content:", error);
			} finally {
				this.isLoading = false;
			}
		},

		async fetchLocations() {
			try {
				const data = await aboutService.getLocations();
				// Convert to POJO for Pinia serialization
				this.locations = JSON.parse(JSON.stringify(data));
			} catch (error) {
				console.error("Failed to fetch locations:", error);
			}
		},
	},
});
