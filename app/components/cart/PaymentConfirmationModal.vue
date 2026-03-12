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

				<!-- eslint-disable-next-line vue/no-v-html -->
				<div class="payment-info" v-html="paymentInfoHtml" />

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
	paymentInfoHtml: {
		type: String,
		default: "",
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
