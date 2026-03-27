<script setup>
import { useRegisterStore } from "@/stores/useRegisterStore";

const registerStore = useRegisterStore();
</script>

<template>
	<form id="register-form" @submit.prevent="registerStore.handleRegister">
		<div class="form-group">
			<input
				id="email"
				v-model="registerStore.formData.email"
				type="email"
				placeholder="Email *"
				autocomplete="email"
			>
		</div>
		<div class="form-group relative-group">
			<input
				id="password"
				v-model="registerStore.formData.password"
				:type="registerStore.passwordFieldType"
				placeholder="Mật khẩu *"
				autocomplete="new-password"
			>
			<span
				class="togglePassword"
				@click="registerStore.togglePassword('password')"
			>
				<svg
					v-if="registerStore.passwordFieldType === 'password'"
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
				v-model="registerStore.formData.confirm_password"
				:type="registerStore.confirmPasswordFieldType"
				placeholder="Xác nhận mật khẩu *"
				autocomplete="new-password"
			>
			<span
				class="togglePassword"
				@click="registerStore.togglePassword('confirm_password')"
			>
				<svg
					v-if="registerStore.confirmPasswordFieldType === 'password'"
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
			:disabled="registerStore.isLoading"
			aria-label="Đăng ký tài khoản AnhEm Motor"
		>
			{{ registerStore.isLoading ? "Đang xử lý..." : "Đăng Ký Ngay" }}
		</button>
	</form>
</template>

<style scoped>
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
</style>
