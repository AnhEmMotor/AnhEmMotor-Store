import { defineStore } from "pinia";


export const useBookingStore = defineStore("booking", () => {
	const axios = useAxios();
	const service = bookingService(axios);

	const createBooking = async (bookingData) => {
		return await service.createBooking(bookingData);
	};

	return {
		createBooking,
	};
});

