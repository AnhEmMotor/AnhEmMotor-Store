export default (axios) => ({
	submitContact: async (formData) => {
		const res = await axios.post("/api/contacts", formData);
		return res.data;
	},
});
