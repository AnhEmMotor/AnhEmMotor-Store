export const contactService = {
	/**
	 * Gửi yêu cầu liên hệ tới API
	 */
	submitContact: async (formData) => {
		const res = await fetch("https://backend-xolq.onrender.com/api/contacts", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		const data = await res.json();
		return data;
	},
};
