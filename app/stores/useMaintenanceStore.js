import { defineStore } from "pinia";
import { maintenanceService } from "@/services/maintenanceService";

export const useMaintenanceStore = defineStore("maintenance", {
	state: () => ({
		services: [],
		isLoading: false,
	}),

	actions: {
		/**
		 * Fetch danh sách dịch vụ
		 */
		async fetchServices() {
			this.isLoading = true;
			try {
				const data = await maintenanceService.getMaintenanceServices();
				this.services = data;
			} catch {
				// Xử lý lỗi
			} finally {
				this.isLoading = false;
			}
		},
	},
});
