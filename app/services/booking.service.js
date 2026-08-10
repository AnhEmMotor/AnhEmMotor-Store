
export const createBookingService = (repository) => ({
  async createBooking(bookingData) {
    return await repository.createBooking({
      fullName: bookingData.fullName,
      email: bookingData.email || '',
      phoneNumber: bookingData.phoneNumber,
      productVariantId: bookingData.productVariantId,
      preferredDate: bookingData.preferredDate,
      note: bookingData.note || '',
      location: bookingData.location || 'Cửa hàng',
      bookingType: bookingData.bookingType || 'TestDrive',
    });
  },
});

export default createBookingService;
