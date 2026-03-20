<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/useAuthStore";

useSeoMeta({
	title: "Đăng Ký",
	description: "Tạo tài khoản AnhEm Motor để trải nghiệm mua sắm dễ dàng hơn.",
	ogTitle: "Đăng Ký",
	ogDescription:
		"Tạo tài khoản AnhEm Motor để trải nghiệm mua sắm dễ dàng hơn.",
	ogImage: "/assets/image/index/index-banner-bg.webp",
	twitterTitle: "Đăng Ký",
	twitterDescription:
		"Tạo tài khoản AnhEm Motor để trải nghiệm mua sắm dễ dàng hơn.",
	twitterImage: "/assets/image/index/index-banner-bg.webp",
});

useHead({
	link: [
		{
			rel: "icon",
			type: "image/x-icon",
			href: "/favicon.ico",
		},
	],
});

const instance = useNuxtApp();
const formData = ref({
	email: "",
	password: "",
	confirm_password: "",
});
const isLoading = ref(false);
const passwordFieldType = ref("password");
const confirmPasswordFieldType = ref("password");

function togglePassword(field: string) {
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
		return instance.$toast.error("Vui lòng nhập đầy đủ thông tin!");
	}
	if (data.password.length < 6) {
		return instance.$toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
	}
	if (data.password !== data.confirm_password) {
		return instance.$toast.error("Mật khẩu xác nhận không khớp!");
	}

	isLoading.value = true;
	const authStore = useAuthStore();
	try {
		const result = (await authStore.register({
			Email: data.email,
			Password: data.password,
		})) as {
			error?: {
				response?: {
					data?: { message?: string; errors?: { message: string }[] };
				};
			};
			data?: { message?: string };
		};

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

		const router = useRouter();
		router.push("/login");
	} catch (error: unknown) {
		const err = error as {
			response?: {
				data?: { message?: string; errors?: { message: string }[] };
			};
		};
		const errorMessage =
			err.response?.data?.message ||
			err.response?.data?.errors?.[0]?.message ||
			"Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.";
		instance.$toast.error(errorMessage);
	} finally {
		isLoading.value = false;
	}
}
</script>

<template>
	<div class="register-container">
		<div class="card">
			<div class="form-header">
				<h1>Đăng Ký</h1>
				<p>Tạo tài khoản để trải nghiệm mua sắm!</p>
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
					<span class="togglePassword" @click="togglePassword('password')">
						<svg
							v-if="passwordFieldType === 'password'"
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
							<circle cx="12" cy="12" r="3" />
						</svg>
						<svg
							v-else
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
							/>
							<line x1="1" y1="1" x2="23" y2="23" />
						</svg>
					</span>
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
					>
						<svg
							v-if="confirmPasswordFieldType === 'password'"
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
							<circle cx="12" cy="12" r="3" />
						</svg>
						<svg
							v-else
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
							/>
							<line x1="1" y1="1" x2="23" y2="23" />
						</svg>
					</span>
				</div>

				<button
					id="submitBtn"
					type="submit"
					class="btn"
					:disabled="isLoading"
					aria-label="Đăng ký tài khoản AnhEm Motor"
				>
					{{ isLoading ? "Đang xử lý..." : "Đăng Ký Ngay" }}
				</button>
			</form>

			<CommonFullLoading :show="isLoading" text="Đang xử lý đăng ký..." />

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
	min-height: 70vh;
	padding: 20px;
	background-color: #f4f6f8;
}
.card {
	background: #ffffff;
	border-radius: 16px;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
	padding: 40px;
	width: 100%;
	max-width: 400px;
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
		padding: 15px;
		background-color: #ffffff;
	}
	.card {
		box-shadow: none;
		padding: 20px 10px;
		width: 100%;
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
