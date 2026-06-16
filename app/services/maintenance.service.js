/**
 * Application Layer - Maintenance Service
 */
import { IMaintenanceRepository } from "@/core/domain/repositories/maintenance.repository.interface";

/**
 * Factory function to create maintenance service with dependency injection
 * @param {IMaintenanceRepository} repository
 * @returns {IMaintenanceRepository}
 */
export const createMaintenanceService = (repository) => ({
	async getMaintenanceServices() {
		try {
			return await repository.getMaintenanceServices();
		} catch (error) {
			return [];
		}
	},
});

export default createMaintenanceService;
