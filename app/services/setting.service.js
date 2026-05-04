export default (axios) => ({
	async getStoreSettings() {
		const response = await axios.get("/api/v1/Setting/store");
		return response.data;
	},
});
