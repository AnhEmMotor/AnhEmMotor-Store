import { FeedbackSubmission, FeedbackSubmissionResult } from "@/core/domain/models/feedback.model";
import { IFeedbackRepository } from "@/core/domain/repositories/feedback.repository.interface";

/**
 * Factory function to create feedback service with dependency injection
 * @param {IFeedbackRepository} repository
 * @returns {IFeedbackRepository}
 */
export const createFeedbackService = (repository) => ({
	async submitFeedback(formData) {
		const submission = new FeedbackSubmission(formData);
		const result = await repository.submitFeedback(submission.toContactPayload());
		return new FeedbackSubmissionResult(result);
	},
});

export default createFeedbackService;
