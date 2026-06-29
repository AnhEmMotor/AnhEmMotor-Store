import {
	FeedbackSubmission,
	FeedbackSubmissionResult,
} from "../core/domain/models/feedback.model";
import { feedbackRepository } from "../core/infrastructure/repositories/feedback.repository";

export const feedbackService = {
	async submitFeedback(formData) {
		const submission = new FeedbackSubmission(formData);
		const result = await feedbackRepository.submitFeedback(
			submission.toContactPayload(),
		);

		return new FeedbackSubmissionResult(result);
	},
};

export default feedbackService;
