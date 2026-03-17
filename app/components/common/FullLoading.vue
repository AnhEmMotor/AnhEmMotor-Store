<script setup>
defineProps({
	show: {
		type: Boolean,
		default: false,
	},
	text: {
		type: String,
		default: "Đang xử lý...",
	},
});
</script>

<template>
	<ClientOnly>
		<Teleport to="body">
			<Transition name="fade">
				<div v-if="show" class="full-loading-overlay">
					<div class="loading-content">
						<div class="spinner" />
						<p v-if="text" class="loading-text">
							{{ text }}
						</p>
					</div>
				</div>
			</Transition>
		</Teleport>
	</ClientOnly>
</template>

<style scoped>
.full-loading-overlay {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(255, 255, 255, 0.85);
	backdrop-filter: blur(4px);
	z-index: 9999;
}

.loading-content {
	text-align: center;
}

.spinner {
	width: 48px;
	height: 48px;
	border: 4px solid #f3f3f3;
	border-top: 4px solid #e74c3c;
	border-radius: 50%;
	animation: spin 1s linear infinite;
	margin: 0 auto 16px;
}

.loading-text {
	color: #2c3e50;
	font-weight: 500;
	font-size: 1.1rem;
	margin: 0;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
