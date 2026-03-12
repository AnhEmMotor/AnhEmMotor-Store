<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/useAuthStore";

useSeoMeta({
	title: "Đăng Ký | AnhEm Motor",
	description: "Tạo tài khoản AnhEm Motor để trải nghiệm mua sắm dễ dàng hơn.",
});

const formData = ref({
	email: "",
	password: "",
	confirm_password: "",
});
const feedback = ref({ message: "", type: "" });
const isLoading = ref(false);
const passwordFieldType = ref("password");
const confirmPasswordFieldType = ref("password");

function showFeedback(msg, ok) {
	feedback.value = { message: msg, type: ok ? "success" : "error" };
	setTimeout(() => {
		feedback.value = { message: "", type: "" };
	}, 4000);
}

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
	const data = formData.value;
	if (!data.email || !data.password || !data.confirm_password) {
		return showFeedback("Vui lòng nhập đầy đủ thông tin!", false);
	}
	if (data.password.length < 6) {
		return showFeedback("Mật khẩu phải có ít nhất 6 ký tự!", false);
	}
	if (data.password !== data.confirm_password) {
		return showFeedback("Mật khẩu xác nhận không khớp!", false);
	}

	isLoading.value = true;
	feedback.value = { message: "", type: "" };
	try {
		const authStore = useAuthStore();
		const { error, data: resData } = await authStore.register({
			Email: data.email,
			Password: data.password,
		});

		if (error) {
			throw error;
		}

		showFeedback(
			resData?.message || "🎉 Đăng ký thành công! Vui lòng đăng nhập.",
			true,
		);
		formData.value = {
			email: "",
			password: "",
			confirm_password: "",
		};

		const router = useRouter();
		setTimeout(() => {
			router.push("/login");
		}, 2000);
	} catch (error) {
		showFeedback(
			error.response?.data?.errors?.[0]?.message ||
				"Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.",
			false,
		);
	} finally {
		isLoading.value = false;
	}
}
</script>

<template>
	<div class="register-container">
		<div class="card">
			<div class="form-header">
				<h1>🚀 Đăng Ký</h1>
				<p>Tạo tài khoản mới để bắt đầu</p>
			</div>

			<div v-if="feedback.message" id="global-feedback" :class="feedback.type">
				{{ feedback.message }}
			</div>

			<form id="register-form" @submit.prevent="handleRegister">
				<div class="form-group">
					<input
						id="email"
						v-model="formData.email"
						type="email"
						placeholder="Email *"
						autocomplete="email"
					>
				</div>
				<div class="form-group relative-group">
					<input
						id="password"
						v-model="formData.password"
						:type="passwordFieldType"
						placeholder="Mật khẩu *"
						autocomplete="new-password"
					>
					<span class="togglePassword" @click="togglePassword('password')">{{
						passwordFieldType === "password" ? "🐵" : "🙈"
					}}</span>
				</div>
				<div class="form-group relative-group">
					<input
						id="confirm_password"
						v-model="formData.confirm_password"
						:type="confirmPasswordFieldType"
						placeholder="Xác nhận mật khẩu *"
						autocomplete="new-password"
					>
					<span
						class="togglePassword"
						@click="togglePassword('confirm_password')"
						>{{ confirmPasswordFieldType === "password" ? "🐵" : "🙈" }}</span
					>
				</div>

				<button id="submitBtn" type="submit" class="btn" :disabled="isLoading">
					{{ isLoading ? "Đang xử lý..." : "Đăng Ký Ngay" }}
				</button>

				<div v-if="isLoading && !feedback.message" id="loading" class="loading">
					<div class="spinner" />
					<p>Đang xử lý đăng ký...</p>
				</div>
			</form>

			<div class="login-link">
				Đã có tài khoản? <NuxtLink to="/login">Đăng nhập</NuxtLink>
			</div>
		</div>
	</div>
</template>

<style scoped>
.register-container {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	padding: 20px 15px;
	background-color: #f4f6f8;
	box-sizing: border-box;
}
.card {
	background: #ffffff;
	border-radius: 16px;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
	padding: 35px 30px;
	width: 100%;
	max-width: 420px;
	text-align: center;
	box-sizing: border-box;
}
.form-header h1 {
	color: #2c3e50;
	font-weight: 700;
	margin-bottom: 5px;
	font-size: 24px;
}
.form-header p {
	color: #7f8c8d;
	margin-bottom: 25px;
	font-size: 14px;
}
.form-group {
	margin-bottom: 15px;
	text-align: left;
}
.form-group input {
	width: 100%;
	padding: 12px 14px;
	border: 1px solid #e0e0e0;
	border-radius: 10px;
	box-sizing: border-box;
	font-size: 16px;
	transition: all 0.3s ease;
	background-color: #f9fafb;
}
.form-group input:focus {
	border-color: #e74c3c;
	background-color: #fff;
	box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
	outline: none;
}
.relative-group {
	position: relative;
}
.togglePassword {
	position: absolute;
	right: 12px;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
	font-size: 20px;
	user-select: none;
	padding: 5px;
	z-index: 5;
}
.checkbox-container {
	display: flex;
	align-items: flex-start;
	margin-bottom: 12px;
	font-size: 14px;
	text-align: left;
	line-height: 1.4;
}
.checkbox-container input {
	margin-right: 10px;
	margin-top: 3px;
	width: 16px;
	height: 16px;
	accent-color: #e74c3c;
	cursor: pointer;
	flex-shrink: 0;
}
.checkbox-container label {
	color: #555;
	cursor: pointer;
}
.btn {
	width: 100%;
	padding: 14px;
	background-color: #e74c3c;
	color: white;
	border: none;
	border-radius: 10px;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	transition:
		background-color 0.3s,
		transform 0.1s;
	margin-top: 10px;
}
.btn:hover {
	background-color: #c0392b;
}
.btn:disabled {
	background-color: #fab1a0;
	cursor: not-allowed;
}

#global-feedback {
	padding: 12px;
	margin-bottom: 20px;
	border-radius: 8px;
	font-size: 14px;
	text-align: left;
	border: 1px solid transparent;
}
#global-feedback.success {
	background-color: #ecfdf5;
	color: #047857;
	border-color: #6ee7b7;
}
#global-feedback.error {
	background-color: #fef2f2;
	color: #b91c1c;
	border-color: #fca5a5;
}

.loading {
	text-align: center;
	margin-top: 20px;
	color: #2c3e50;
}
.loading .spinner {
	border: 3px solid #f3f3f3;
	border-top: 3px solid #e74c3c;
	border-radius: 50%;
	width: 24px;
	height: 24px;
	animation: spin 1s linear infinite;
	display: inline-block;
	vertical-align: middle;
	margin-right: 8px;
}
.loading p {
	display: inline-block;
	font-size: 14px;
	margin: 0;
	vertical-align: middle;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.login-link {
	text-align: center;
	margin-top: 25px;
	font-size: 14px;
	color: #666;
}
.login-link a {
	color: #e74c3c;
	font-weight: 600;
	text-decoration: none;
}

@media (max-width: 480px) {
	.register-container {
		padding: 10px;
		padding-top: 40px;
		align-items: flex-start;
		height: auto;
		background-color: #fff;
	}
	.card {
		box-shadow: none;
		padding: 10px 5px;
		max-width: 100%;
		border-radius: 0;
	}
	.form-header h1 {
		font-size: 22px;
	}
}

@media (min-width: 481px) and (max-width: 768px) {
	.card {
		padding: 30px;
		max-width: 90%;
	}
}
</style>
