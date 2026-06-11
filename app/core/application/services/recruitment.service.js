import { recruitmentRepository } from "../../infrastructure/repositories/recruitment.repository";


export const recruitmentService = {
    async getJobs() {
        return await recruitmentRepository.getJobs();
    },

    async getFaqs() {
        return await recruitmentRepository.getFaqs();
    },

    async submitApplication(formData) {
        return await recruitmentRepository.submitApplication(formData);
    }
};
