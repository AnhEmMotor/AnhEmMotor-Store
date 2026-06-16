import { IContactRepository } from "@/core/domain/repositories/contact.repository.interface";

/**
 * Factory function to create contact service with dependency injection
 * @param {IContactRepository} repository
 * @returns {IContactRepository}
 */
export const createContactService = (repository) => ({
	submitContact: async (formData) => {
		return await repository.submitContact(formData);
	},
});

export default createContactService;
