<script setup>


import RegisterHeader from "@/components/auth/RegisterHeader.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";

useSeoMeta({
	title: "Đăng Ký | AnhEm Motor",
	description: "Tạo tài khoản AnhEm Motor để trải nghiệm mua sắm dễ dàng hơn.",
});

const registerStore = useRegisterStore();
</script>

<template>
	<div class="register-container">
		<div class="card">
			<RegisterHeader />

			<RegisterForm />

			<CommonFullLoading
				:show="registerStore.isLoading"
				text="Đang xử lý đăng ký..."
			/>

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
}

@media (min-width: 481px) and (max-width: 768px) {
	.card {
		padding: 30px;
		max-width: 90%;
	}
}
</style>
