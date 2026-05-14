

/**
 * Application Layer - Booking Service
 */
export const bookingService = {
	async createBooking(bookingData) {
		try {
			return await bookingRepository.createBooking({
				fullName: bookingData.fullName,
				email: bookingData.email || "",
				phoneNumber: bookingData.phoneNumber,
				productVariantId: bookingData.productVariantId,
				preferredDate: bookingData.preferredDate,
				note: bookingData.note || "",
				location: bookingData.location || "Cửa hàng",
				bookingType: bookingData.bookingType || "TestDrive",
			});
		} catch (error) {
			console.error("Service: Failed to create booking:", error);
			throw error;
		}
	},
};

export default bookingService;
