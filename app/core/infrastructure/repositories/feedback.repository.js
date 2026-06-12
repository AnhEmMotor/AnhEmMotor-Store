export const feedbackRepository = {
	async submitFeedback(payload) {
		const axios = useAxios();
		const response = await axios.post("/api/v1/Contacts", payload);

		return {
			success: true,
			id: response.data,
			message: "Gửi góp ý thành công.",
		};
	},
};
