export const storeChatRepository = {
	async createOrRestoreSession(visitorKey) {
		const axios = useAxios();
		const response = await axios.post("/api/v1/store-chat/sessions", {
			visitorKey,
		});
		return response.data;
	},

	async getHistory(sessionId) {
		const axios = useAxios();
		const response = await axios.get(
			`/api/v1/store-chat/sessions/${sessionId}/history`,
		);
		return response.data;
	},

	async linkToCustomer(sessionId) {
		const axios = useAxios();
		await axios.post(`/api/v1/store-chat/sessions/${sessionId}/link-customer`);
	},
};
