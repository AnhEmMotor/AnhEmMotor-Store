import { TechFeature, EngineTech, InteractionCard, ManagementFeature } from "@/core/domain/models/technology.model";
import { ITechnologyRepository } from "@/core/domain/repositories/technology.repository.interface";

/**
 * Factory function to create technology service with dependency injection
 * @param {ITechnologyRepository} repository
 * @returns {ITechnologyRepository}
 */
export const createTechnologyService = (repository) => ({
	async getConnectivityFeatures() {
		const data = await repository.getConnectivityFeatures();
		return data.map(item => new TechFeature(item));
	},

	async getEngineTechs() {
		const data = await repository.getEngineTechs();
		return data.map(item => new EngineTech(item));
	},

	async getSafetyFeatures() {
		const data = await repository.getSafetyFeatures();
		return data.map(item => new TechFeature(item));
	},

	async getInteractionCards() {
		const data = await repository.getInteractionCards();
		return data.map(item => new InteractionCard(item));
	},

	async getManagementFeatures() {
		const data = await repository.getManagementFeatures();
		return data.map(item => new ManagementFeature(item));
	}
});

export default createTechnologyService;
