import { defineStore } from "pinia";
import { feedbackService } from "../services/feedback.service";

export const useFeedbackStore = defineStore("feedback", {
	state: () => ({
		isSubmitting: false,
		statusMessage: "",
		statusType: "",
	}),

	actions: {
		async submitFeedback(formData) {
			this.isSubmitting = true;
			this.statusMessage = "";
			this.statusType = "";

			try {
				const result = await feedbackService.submitFeedback(formData);
				this.statusType = result.success ? "success" : "error";
				this.statusMessage = result.message;
				return result.success;
			} catch {
				this.statusType = "error";
				this.statusMessage = "Không thể gửi góp ý lúc này. Vui lòng thử lại sau.";
				return false;
			} finally {
				this.isSubmitting = false;
			}
		},
	},
});
