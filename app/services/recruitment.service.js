/**
 * Application Layer - Recruitment Service
 */
import { IRecruitmentRepository } from "@/core/domain/repositories/recruitment.repository.interface";

/**
 * Factory function to create recruitment service with dependency injection
 * @param {IRecruitmentRepository} repository
 * @returns {IRecruitmentRepository}
 */
export const createRecruitmentService = (repository) => ({
	async getJobs() {
		return await repository.getJobs();
	},

	async getFaqs() {
		return await repository.getFaqs();
	},

	async submitApplication(formData) {
		return await repository.submitApplication(formData);
	},

	async uploadCv(formData) {
		return await repository.uploadCv(formData);
	}
});

export default createRecruitmentService;
