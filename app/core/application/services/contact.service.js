


export const contactService = {
	async submitContact(contactData) {
		
			return await contactRepository.submitContact(contactData);
		
	},
};

export default contactService;
