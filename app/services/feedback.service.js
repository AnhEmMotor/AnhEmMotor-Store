import { FeedbackSubmission, FeedbackSubmissionResult } from '../core/domain/models/feedback.model';
import { feedbackRepository } from '../core/infrastructure/repositories/feedback.repository';

export const feedbackService = {
  async getMine() {
    try {
      return await feedbackRepository.getMine();
    } catch {
      return [];
    }
  },

  async submitFeedback(formData) {
    const submission = new FeedbackSubmission(formData);
    const result = await feedbackRepository.submitFeedback(submission.toContactPayload());

    return new FeedbackSubmissionResult(result);
  },
};

export default feedbackService;
