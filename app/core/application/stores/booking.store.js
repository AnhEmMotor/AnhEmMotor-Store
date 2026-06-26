import { defineStore } from "pinia";


export const useBookingStore = defineStore("booking", () => {
	const service = bookingService;


	const createBooking = async (bookingData) => {
		return await service.createBooking(bookingData);
	};

	return {
		createBooking,
	};
});

