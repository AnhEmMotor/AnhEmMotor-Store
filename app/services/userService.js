import axiosInstance from "../api/axios";
import { USER_ENDPOINTS } from "../constants/endpoints/user";

export const userService = {
	async updateProfile(payload) {
		const { data } = await axiosInstance.put(USER_ENDPOINTS.ME, payload);
		return data;
	},

	async updateAvatar(formData) {
		const { data } = await axiosInstance.post(USER_ENDPOINTS.AVATAR, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return data;
	},

	async changePassword(payload) {
		const { data } = await axiosInstance.post(
			USER_ENDPOINTS.CHANGE_PASSWORD,
			payload,
		);
		return data;
	},
};
