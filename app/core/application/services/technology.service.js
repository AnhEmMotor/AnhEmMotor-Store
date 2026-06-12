import { technologyRepository } from "../../infrastructure/repositories/technology.repository";
import { TechFeature, EngineTech, InteractionCard, ManagementFeature } from "../../domain/models/technology.model";


export const technologyService = {
    async getConnectivityFeatures() {
        const data = await technologyRepository.getConnectivityFeatures();
        return data.map(item => new TechFeature(item));
    },

    async getEngineTechs() {
        const data = await technologyRepository.getEngineTechs();
        return data.map(item => new EngineTech(item));
    },

    async getSafetyFeatures() {
        const data = await technologyRepository.getSafetyFeatures();
        return data.map(item => new TechFeature(item));
    },

    async getInteractionCards() {
        const data = await technologyRepository.getInteractionCards();
        return data.map(item => new InteractionCard(item));
    },

    async getManagementFeatures() {
        const data = await technologyRepository.getManagementFeatures();
        return data.map(item => new ManagementFeature(item));
    }
};
