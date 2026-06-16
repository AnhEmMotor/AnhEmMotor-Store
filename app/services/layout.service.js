/**
 * Application Layer - Layout Service
 */
import { ILayoutRepository } from "@/core/domain/repositories/layout.repository.interface";

/**
 * Factory function to create layout service with dependency injection
 * @param {ILayoutRepository} repository
 * @returns {ILayoutRepository}
 */
export const createLayoutService = (repository) => ({
	async getNavItems() {
		try {
			return await repository.getNavItems();
		} catch (error) {
			return [];
		}
	},

	async getFooterData() {
		try {
			return await repository.getFooterData();
		} catch (error) {
			return null;
		}
	},
});

export default createLayoutService;
