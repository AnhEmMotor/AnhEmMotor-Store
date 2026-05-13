import { defineStore } from "pinia";


export const useMaintenanceStore = defineStore("maintenance", {
	state: () => ({
		services: [],
		isLoading: false,
	}),

	actions: {
		async fetchServices() {
			this.isLoading = true;
			try {
				const data = await maintenanceService.getMaintenanceServices();
				this.services = data;
			} catch {
			} finally {
				this.isLoading = false;
			}
		},
	},
});
