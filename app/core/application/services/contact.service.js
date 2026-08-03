export const contactService = {
  async submitContact(contactData) {
    return await contactRepository.submitContact(contactData);
  },
  async getSupportTracking(id, trackingToken) {
    return await contactRepository.getSupportTracking(id, trackingToken);
  },
  async rateSupportEmployee(id, trackingToken, rating, comment) {
    return await contactRepository.rateSupportEmployee(
      id,
      trackingToken,
      rating,
      comment,
    );
  },
};

export default contactService;
