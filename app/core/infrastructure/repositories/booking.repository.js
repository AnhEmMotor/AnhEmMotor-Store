/**
 * Infrastructure Layer - Booking Repository
 */
export const bookingRepository = {
	async createBooking(bookingData) {
		const axios = useAxios();
		const response = await axios.post("/api/v1/Bookings", bookingData);
		return response.data;
	},
};
