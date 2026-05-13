import { defineStore } from "pinia";
import { useAxios } from "@/composables/useAxios";

export const useBookingStore = defineStore("booking", () => {
	const { post } = useAxios();

	const createBooking = async (bookingData) => {
		const response = await post("/api/v1/Bookings", {
			fullName: bookingData.fullName,
			email: bookingData.email || "",
			phoneNumber: bookingData.phoneNumber,
			productVariantId: bookingData.productVariantId,
			preferredDate: bookingData.preferredDate,
			note: bookingData.note || "",
			location: bookingData.location || "Showroom",
			bookingType: bookingData.bookingType || "TestDrive",
		});
		return response;
	};

	return {
		createBooking,
	};
});
