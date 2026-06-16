/**
 * Application Layer - About Service
 * Orchestrates business logic and data flow between UI and Infrastructure
 */
import { IAboutRepository } from "@/core/domain/repositories/about.repository.interface";
import { AboutContent } from "@/core/domain/models/about.model";
import { StoreLocation } from "@/core/domain/models/location.model";

/**
 * Factory function to create about service with dependency injection
 * @param {IAboutRepository} repository
 * @returns {IAboutRepository}
 */
export const createAboutService = (repository) => ({
	/**
	 * Gets formatted about content
	 * @returns {Promise<AboutContent>}
	 */
	getAboutContent: async () => {
		try {
			const data = await repository.getAboutContent();
			return new AboutContent(data);
		} catch (error) {
			throw error;
		}
	},

	/**
	 * Gets formatted store locations
	 * @returns {Promise<StoreLocation[]>}
	 */
	getLocations: async () => {
		try {
			const data = await repository.getLocations();
			return data.map(item => new StoreLocation(item));
		} catch (error) {
			throw error;
		}
	},
});

export default createAboutService;
