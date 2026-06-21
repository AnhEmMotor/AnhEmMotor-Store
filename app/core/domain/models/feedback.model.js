export class FeedbackSubmission {
	constructor(data = {}) {
		this.fullName = data.fullName?.trim() || "";
		this.phone = data.phone?.trim() || "";
		this.email = data.email?.trim() || "";
		this.subject = data.subject?.trim() || "";
		this.message = data.message?.trim() || "";
		this.rating = Number(data.rating) || 5;
	}

	toContactPayload() {
		return {
			rating: this.rating,
			feedbackArea: this.subject,
			customerName: this.fullName,
			phoneNumber: this.phone,
			content: this.message,
		};
	}
}

export class FeedbackSubmissionResult {
	constructor(data = {}) {
		this.success = Boolean(data.success);
		this.id = data.id || null;
		this.message = data.message || "";
	}
}
