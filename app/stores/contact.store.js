import { defineStore } from "pinia";
import { contactService } from "@/services/contact.service";

export const useContactStore = defineStore("contact", {
	state: () => ({
		isSubmitting: false,
		statusMessage: "",
		statusType: "",
	}),

	actions: {
		async submitContact(formData) {
			this.isSubmitting = true;
			this.statusMessage = "";

			try {
				const data = await contactService.submitContact(formData);

				if (data.success) {
					this.statusType = "success";
					this.statusMessage =
						"🎉 Gửi liên hệ thành công! Chúng tôi sẽ sớm liên hệ với bạn.";
					return true;
				} else {
					this.statusType = "error";
					this.statusMessage = data.message || "Có lỗi xảy ra khi gửi liên hệ.";
					return false;
				}
			} catch {
				this.statusType = "error";
				this.statusMessage =
					"Không thể kết nối tới máy chủ. Vui lòng thử lại sau!";
				return false;
			} finally {
				this.isSubmitting = false;
				if (this.statusType === "success") {
					setTimeout(() => {
						this.statusMessage = "";
					}, 5000);
				}
			}
		},
	},
});
