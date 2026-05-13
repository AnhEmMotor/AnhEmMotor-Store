export default (axios) => ({
	createBooking: async (bookingData) => {
		const res = await axios.post("/api/v1/Bookings", {
			fullName: bookingData.fullName,
			email: bookingData.email || "",
			phoneNumber: bookingData.phoneNumber,
			productVariantId: bookingData.productVariantId,
			preferredDate: bookingData.preferredDate,
			note: bookingData.note || "",
			location: bookingData.location || "Showroom",
			bookingType: bookingData.bookingType || "TestDrive",
		});
		return res.data;
	},
});
