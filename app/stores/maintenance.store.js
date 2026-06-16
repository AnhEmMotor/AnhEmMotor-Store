import { defineStore } from "pinia";
import { maintenanceRepository } from "@/core/infrastructure/repositories/maintenance.repository";
import { createMaintenanceService } from "@/services/maintenance.service";

const maintenanceService = createMaintenanceService(maintenanceRepository);

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
