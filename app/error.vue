<template>
	<div class="error-page">
		<div class="error-content">
			<div class="error-code">404</div>
			<h1 class="error-title">Lạc đường rồi, Biker ơi!</h1>
			<p class="error-message">
				Có vẻ như bạn đã rẽ nhầm hướng. Trang bạn đang tìm kiếm không tồn tại
				hoặc đã được di chuyển sang một cung đường khác.
			</p>
			<div class="action-container">
				<button
					class="btn-primary back-home-btn"
					aria-label="Quay lại trang chủ"
					@click="handleError"
				>
					<Icon name="fa6-solid:house" class="mr-2" /> Quay lại trang chủ
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useAuthStore } from "~/stores/useAuthStore";
import { useLayoutStore } from "~/stores/useLayoutStore";

defineProps({
	error: {
		type: Object,
		required: true,
	},
});

const authStore = useAuthStore();
const layoutStore = useLayoutStore();

if (import.meta.server) {
	const event = useRequestEvent();
	authStore.setSsrEvent(event);
}
await Promise.all([authStore.initAuth(), layoutStore.fetchLayoutData()]);

const handleError = () => clearError({ redirect: "/" });

useHead({
	title: "404 - Không tìm thấy trang | Anh Em Motor",
});
</script>

<style scoped>
.error-page {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background: radial-gradient(circle at center, #ffffff 0%, #f1f1f1 100%);
	padding: 2rem;
	text-align: center;
	overflow: hidden;
}

.error-content {
	max-width: 600px;
	width: 100%;
}

.error-code {
	font-size: 8rem;
	font-weight: 900;
	color: #de0000;
	line-height: 1;
	margin-bottom: 1rem;
	text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.05);
	letter-spacing: -5px;
}

.error-title {
	font-size: 2rem;
	font-weight: 700;
	color: #1a1a1a;
	margin-bottom: 1rem;
}

.error-message {
	font-size: 1.1rem;
	color: #666;
	margin-bottom: 2.5rem;
	line-height: 1.6;
}

.action-container {
	display: flex;
	justify-content: center;
}

.back-home-btn {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	font-size: 1.1rem;
	padding: 1rem 2.5rem;
	transition: all 0.3s ease;
}

.back-home-btn:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 25px rgba(222, 0, 0, 0.4);
}

@media (max-width: 640px) {
	.error-code {
		font-size: 6rem;
	}
	.error-title {
		font-size: 1.5rem;
	}
}
</style>
