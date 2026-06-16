import { defineStore } from "pinia";
import { bookingRepository } from "@/core/infrastructure/repositories/booking.repository";
import { createBookingService } from "@/services/booking.service";

const bookingService = createBookingService(bookingRepository);

export const useBookingStore = defineStore("booking", () => {
	const service = bookingService;

	const createBooking = async (bookingData) => {
		return await service.createBooking(bookingData);
	};

	return {
		createBooking,
	};
});
