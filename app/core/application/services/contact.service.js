

/**
 * Application Layer - Contact Service
 */
export const contactService = {
	async submitContact(contactData) {
		try {
			return await contactRepository.submitContact(contactData);
		} catch (error) {
			console.error("Service: Failed to send contact message:", error);
			throw error;
		}
	},
};

export default contactService;
