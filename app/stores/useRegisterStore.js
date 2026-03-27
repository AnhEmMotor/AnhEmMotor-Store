import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./useAuthStore";

export const useRegisterStore = defineStore("register", () => {
	const formData = ref({
		email: "",
		password: "",
		confirm_password: "",
	});
	const isLoading = ref(false);
	const passwordFieldType = ref("password");
	const confirmPasswordFieldType = ref("password");

	function togglePassword(field) {
		if (field === "password") {
			passwordFieldType.value =
				passwordFieldType.value === "password" ? "text" : "password";
		} else {
			confirmPasswordFieldType.value =
				confirmPasswordFieldType.value === "password" ? "text" : "password";
		}
	}

	async function handleRegister() {
		const instance = useNuxtApp();
		const data = formData.value;

		if (!data.email || !data.password || !data.confirm_password) {
			instance.$toast.error("Vui lòng nhập đầy đủ thông tin!");
			return false;
		}

		if (data.password.length < 6) {
			instance.$toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
			return false;
		}

		if (data.password !== data.confirm_password) {
			instance.$toast.error("Mật khẩu xác nhận không khớp!");
			return false;
		}

		isLoading.value = true;
		const authStore = useAuthStore();
		const router = useRouter();

		try {
			const result = await authStore.register({
				Email: data.email,
				Password: data.password,
			});

			if (result?.error) {
				throw result.error;
			}

			authStore.setSuccessMessage(
				result?.data?.message || "Đăng ký thành công! Vui lòng đăng nhập.",
			);

			formData.value = {
				email: "",
				password: "",
				confirm_password: "",
			};

			router.push("/login");
			return true;
		} catch (error) {
			const errorMessage =
				error.response?.data?.message ||
				error.response?.data?.errors?.[0]?.message ||
				"Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.";
			instance.$toast.error(errorMessage);
			return false;
		} finally {
			isLoading.value = false;
		}
	}

	return {
		formData,
		isLoading,
		passwordFieldType,
		confirmPasswordFieldType,
		togglePassword,
		handleRegister,
	};
});
