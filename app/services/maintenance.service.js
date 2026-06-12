


export const maintenanceService = {
	async getMaintenanceServices() {
		try {
			return await maintenanceRepository.getMaintenanceServices();
		} catch {

			return [];
		}
	},
};

export default maintenanceService;
