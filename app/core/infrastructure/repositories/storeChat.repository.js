export const storeChatRepository = {
	async createOrRestoreSession(visitorKey, previousSessionId) {
		const axios = useAxios();
		const response = await axios.post("/api/v1/store-chat/sessions", {
			visitorKey,
			previousSessionId,
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

	async requestHandoff(sessionId) {
		const axios = useAxios();
		const response = await axios.post(
			`/api/v1/store-chat/sessions/${sessionId}/request-handoff`,
			{},
		);
		return response.data;
	},

	async setContactInfo(sessionId, contactName, contactPhone) {
		const axios = useAxios();
		const response = await axios.post(
			`/api/v1/store-chat/sessions/${sessionId}/contact-info`,
			{ contactName, contactPhone },
		);
		return response.data;
	},
};
