/**
 * Application Layer - Booking Service
 */
import { IBookingRepository } from "@/core/domain/repositories/booking.repository.interface";

/**
 * Factory function to create booking service with dependency injection
 * @param {IBookingRepository} repository
 * @returns {IBookingRepository}
 */
export const createBookingService = (repository) => ({
	async createBooking(bookingData) {
		try {
			return await repository.createBooking({
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
			throw error;
		}
	},
});

export default createBookingService;
