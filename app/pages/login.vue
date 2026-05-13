<script setup>
import { ref } from "vue";

useSeoMeta({
	title: "Đăng Nhập",
	description: "Đăng nhập vào tài khoản AnhEm Motor của bạn.",
	ogTitle: "Đăng Nhập",
	ogDescription: "Đăng nhập vào tài khoản AnhEm Motor của bạn.",
	ogImage: "/assets/image/index/index-banner-bg.webp",
	twitterTitle: "Đăng Nhập",
	twitterDescription: "Đăng nhập vào tài khoản AnhEm Motor của bạn.",
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
	script: [
		{
			src: "https://accounts.google.com/gsi/client",
			async: true,
			defer: true,
		},
		{
			src: "https://connect.facebook.net/vi_VN/sdk.js",
			async: true,
			defer: true,
			crossorigin: "anonymous",
		},
	],
});

const instance = useNuxtApp();
const identifier = ref("");
const password = ref("");
const isLoading = ref(false);
const passwordFieldType = ref("password");

function togglePassword() {
	passwordFieldType.value =
		passwordFieldType.value === "password" ? "text" : "password";
}

async function handleLogin() {
	if (!identifier.value || !password.value) {
		return instance.$toast.error("Vui lòng nhập đầy đủ thông tin đăng nhập!");
	}
	isLoading.value = true;
	const authStore = useAuthStore();
	try {
		const result = await authStore.login({
			UsernameOrEmail: identifier.value,
			Password: password.value,
		});

		if (result?.error) {
			throw result.error;
		}

		authStore.setSuccessMessage("Đăng nhập thành công!");
		identifier.value = "";
		password.value = "";
		const router = useRouter();
		const route = useRoute();
		const redirect = route.query.redirect || "/";
		router.push(redirect);
	} catch (error) {
		const errorMessage =
			error.response?.data?.message ||
			error.response?.data?.errors?.[0]?.message ||
			"Email hoặc mật khẩu không đúng!";
		instance.$toast.error(errorMessage);
	} finally {
		if (!authStore.isLoggedIn) isLoading.value = false;
	}
}
</script>

<template>
	<div class="login-container">
		<div class="card">
			<div class="form-header">
				<h1>Đăng Nhập</h1>
				<p>Chào mừng bạn trở lại với AnhEm Motor</p>
			</div>

			<form id="login-form" @submit.prevent="handleLogin">
				<div class="form-group">
					<input
						id="identifier"
						v-model="identifier"
						type="text"
						placeholder="Email *"
						autocomplete="username"
					>
				</div>
				<div class="form-group relative-group">
					<input
						id="password"
						v-model="password"
						:type="passwordFieldType"
						placeholder="Mật khẩu *"
						autocomplete="current-password"
					>
					<span class="togglePassword" @click="togglePassword">
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
				<button :disabled="isLoading" type="submit" class="btn">
					{{ isLoading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP" }}
				</button>
			</form>

			<AuthSocialLogin @loading="(val) => (isLoading = val)" />

			<CommonFullLoading :show="isLoading" text="Đang xử lý đăng nhập..." />

			<div class="register-link">
				Chưa có tài khoản?
				<NuxtLink to="/register">Đăng ký ngay</NuxtLink>
			</div>
		</div>
	</div>
</template>

<style scoped>
.login-container {
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
	margin-bottom: 8px;
	font-size: 24px;
}
.form-header p {
	color: #7f8c8d;
	margin-bottom: 30px;
	font-size: 14px;
}
.form-group {
	margin-bottom: 18px;
	text-align: left;
}
.form-group input {
	width: 100%;
	padding: 14px;
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
	right: 14px;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
	font-size: 20px;
	user-select: none;
	z-index: 10;
	padding: 5px;
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
.btn:active {
	transform: scale(0.98);
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

.register-link {
	text-align: center;
	margin-top: 25px;
	font-size: 14px;
	color: #666;
}
.register-link a {
	color: #e74c3c;
	font-weight: 600;
	text-decoration: none;
}

@media (max-width: 480px) {
	.login-container {
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

