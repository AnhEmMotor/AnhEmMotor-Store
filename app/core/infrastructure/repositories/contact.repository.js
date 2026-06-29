export const contactRepository = {
	async submitContact(contactData) {
		const axios = useAxios();
		const payload = {
			request: {
				fullName: contactData.fullName,
				phoneNumber: contactData.phone,
				email: contactData.email,
				subject: contactData.subject,
				category: "Sales",
				content: contactData.message,
			},
		};
		const response = await axios.post(
			"/api/v1/Contacts/support-request",
			payload
		);
		return {
			success: true,
			id: response.data,
			message: "Gửi yêu cầu hỗ trợ thành công.",
		};
	},
};
