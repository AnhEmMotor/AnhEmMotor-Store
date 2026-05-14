

/**
 * Application Layer - Maintenance Service
 */
export const maintenanceService = {
	async getMaintenanceServices() {
		try {
			return await maintenanceRepository.getMaintenanceServices();
		} catch (error) {
			console.error("Service: Failed to fetch maintenance services:", error);
			return [];
		}
	},
};

export default maintenanceService;
