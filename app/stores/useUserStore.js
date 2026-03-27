import { defineStore } from "pinia";
import { ref } from "vue";
import { userService } from "../services/userService";
import { userMapper } from "../mappers/userMapper";
import { useAuthStore } from "./useAuthStore";

export const useUserStore = defineStore("user", () => {
	const authStore = useAuthStore();
	const isLoading = ref(false);
	const isUploadingAvatar = ref(false);

	async function updateProfile(formData) {
		if (isLoading.value) return;
		isLoading.value = true;
		try {
			const payload = userMapper.toUpdateProfilePayload(formData);
			await userService.updateProfile(payload);
			await authStore.fetchUser();
			return { success: true };
		} catch (error) {
			return {
				success: false,
				error:
					error.response?.data?.message ||
					error.response?.data?.errors?.[0]?.message ||
					"Có lỗi xảy ra khi cập nhật hồ sơ",
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function uploadAvatar(file) {
		if (isUploadingAvatar.value) return;
		isUploadingAvatar.value = true;
		try {
			const uploadData = new FormData();
			uploadData.append("file", file);
			await userService.updateAvatar(uploadData);
			await authStore.fetchUser();
			return { success: true };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || "Lỗi khi cập nhật ảnh đại diện",
			};
		} finally {
			isUploadingAvatar.value = false;
		}
	}

	async function changePassword(passwordData) {
		if (isLoading.value) return;
		isLoading.value = true;
		try {
			const payload = userMapper.toChangePasswordPayload(passwordData);
			await userService.changePassword(payload);
			return { success: true };
		} catch (error) {
			return {
				success: false,
				error:
					error.response?.data?.message ||
					error.response?.data?.errors?.[0]?.message ||
					"Mật khẩu không chính xác hoặc không đủ điều kiện",
			};
		} finally {
			isLoading.value = false;
		}
	}

	return {
		isLoading,
		isUploadingAvatar,
		updateProfile,
		uploadAvatar,
		changePassword,
	};
});
