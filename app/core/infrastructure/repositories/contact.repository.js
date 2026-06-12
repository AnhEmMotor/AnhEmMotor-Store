export const contactRepository = {
	async submitContact(contactData) {
		const axios = useAxios();
		const response = await axios.post("/api/v1/Contact", contactData);
		return response.data;
	}
};
