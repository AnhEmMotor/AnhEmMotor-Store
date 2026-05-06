import { defineStore } from "pinia";


export const useContactStore = defineStore("contact", {
	state: () => ({
		isSubmitting: false,
		statusMessage: "",
		statusType: "",
	}),

	actions: {
		async submitContact(formData) {
			const axios = useAxios();
			const service = contactService(axios);
			
			this.isSubmitting = true;
			this.statusMessage = "";

			try {
				const data = await service.submitContact(formData);

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

