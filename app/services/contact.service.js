export const createContactService = (repository) => ({
  submitContact: async (formData) => {
    return await repository.submitContact(formData);
  },
});

export default createContactService;
