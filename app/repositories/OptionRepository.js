export const OptionRepository = (axios) => ({
	async getOptions() {
		const response = await axios.get("/api/v1/option");
		return response.data;
	},
});
