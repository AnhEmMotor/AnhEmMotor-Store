<template>
	<teleport to="body">
		<div
			v-if="show"
			class="payment-confirmation-modal"
			role="dialog"
			aria-modal="true"
			aria-labelledby="pc-title"
			@keydown.esc="onClose"
		>
			<div ref="content" class="payment-confirmation-content" tabindex="-1">
				<div class="success-icon" aria-hidden="true">
					<i class="fas fa-check-circle" />
				</div>
				<h3 id="pc-title">Đặt hàng thành công!</h3>
				<p>
					Mã đơn hàng: <strong>{{ orderId }}</strong>
				</p>

				<div v-if="paymentInfo" class="payment-info">
					<h4 class="font-bold text-lg mb-2">
						{{ paymentInfo.title }}
					</h4>
					<p v-if="paymentInfo.message" class="mb-2">
						{{ paymentInfo.message }}
					</p>
					<div class="space-y-1">
						<p v-for="(detail, idx) in paymentInfo.details" :key="idx">
							{{ detail.label }}: <strong>{{ detail.value }}</strong>
						</p>
					</div>
					<p
						v-if="paymentInfo.footerMessage"
						class="mt-2 text-sm text-gray-600"
					>
						{{ paymentInfo.footerMessage }}
					</p>
				</div>

				<div class="confirmation-actions mt-4">
					<button ref="primaryBtn" class="btn-primary" @click="$emit('close')">
						Đã hiểu
					</button>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

defineProps({
	show: Boolean,
	orderId: {
		type: String,
		default: "",
	},
	paymentInfo: {
		type: Object,
		default: () => ({}),
	},
});

defineEmits(["close"]);

const primaryBtn = ref(null);

function onClose() {
	if (primaryBtn.value) primaryBtn.value.click();
}

onMounted(() => {
	if (primaryBtn.value) primaryBtn.value.focus();
});

onBeforeUnmount(() => {});
</script>

<style scoped>
.payment-confirmation-modal {
	position: fixed;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.45);
	z-index: 9999;
}
.payment-confirmation-content {
	background: #fff;
	border-radius: 10px;
	padding: 20px;
	max-width: 820px;
	width: 92%;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}
.success-icon {
	font-size: 2rem;
	color: #16a34a;
	margin-bottom: 6px;
}
.confirmation-actions {
	display: flex;
	justify-content: flex-end;
}
</style>
