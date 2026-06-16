/**
 * Application Layer - App Service
 */
import { IAppRepository } from "@/core/domain/repositories/app.repository.interface";
import { AppContent } from "@/core/domain/models/app.model";

/**
 * Factory function to create app service with dependency injection
 * @param {IAppRepository} repository
 * @returns {IAppRepository}
 */
export const createAppService = (repository) => ({
	getAppContent: async () => {
		try {
			const data = await repository.getAppContent();
			return new AppContent(data);
		} catch (error) {
			throw error;
		}
	}
});

export default createAppService;
