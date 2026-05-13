import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth.store";

export const useUserStore = defineStore("user", () => {
	const axios = useAxios();
	const service = userService(axios);
	const authStore = useAuthStore();
	const isLoading = ref(false);
	const isUploadingAvatar = ref(false);

	const formData = ref({
		fullName: "",
		phoneNumber: "",
		gender: "",
	});

	const passwordData = ref({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	function initProfileForm(user) {
		if (user) {
			formData.value.fullName = user.fullName || "";
			formData.value.phoneNumber = user.phoneNumber || "";
			formData.value.gender = user.gender || "";
		}
	}

	async function updateProfile() {
		if (isLoading.value) return;
		isLoading.value = true;
		try {
			const payload = userMapper.toUpdateProfilePayload(formData.value);
			await service.updateProfile(payload);
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
			await service.updateAvatar(uploadData);
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

	function validatePassword() {
		const data = passwordData.value;
		if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
			return {
				success: false,
				error: "Vui lòng nhập đầy đủ thông tin mật khẩu!",
			};
		}
		if (data.newPassword.length < 6) {
			return { success: false, error: "Mật khẩu mới phải có ít nhất 6 ký tự!" };
		}
		if (!/[^a-zA-Z0-9]/.test(data.newPassword)) {
			return {
				success: false,
				error: "Mật khẩu mới phải chứa ít nhất 1 ký tự đặc biệt!",
			};
		}
		if (data.newPassword !== data.confirmPassword) {
			return { success: false, error: "Mật khẩu xác nhận không khớp!" };
		}
		if (data.newPassword === data.currentPassword) {
			return {
				success: false,
				error: "Mật khẩu mới không được trùng với mật khẩu hiện tại!",
			};
		}
		return { success: true };
	}

	async function changePassword() {
		if (isLoading.value) return;

		const validation = validatePassword();
		if (!validation.success) return validation;

		isLoading.value = true;
		try {
			const payload = userMapper.toChangePasswordPayload(passwordData.value);
			await service.changePassword(payload);
			passwordData.value = {
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			};
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
		formData,
		passwordData,
		initProfileForm,
		updateProfile,
		uploadAvatar,
		changePassword,
	};
});

