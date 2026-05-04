<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useOrderStore } from "~/stores/order.store";

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();

onMounted(async () => {
	const orderIdFromQuery = route.query.id;
	const orderCodeFromQuery = route.query.orderCode;
	const statusFromQuery = route.query.status;

	let effectiveOrderId = orderIdFromQuery;
	if (!effectiveOrderId && orderCodeFromQuery) {
		const code = parseInt(orderCodeFromQuery);
		effectiveOrderId = Math.floor(code / 100000);
		if (effectiveOrderId === 0) effectiveOrderId = code;
	}

	if (!effectiveOrderId || !statusFromQuery) {
		router.push("/");
		return;
	}

	const s = statusFromQuery.toLowerCase();
	const isSuccess = s === "success" || s === "paid" || s === "00";
	const isCancelled = s === "cancelled";

	if (isSuccess) {
		try {
			const order = await orderStore.fetchOrderDetail(effectiveOrderId);
			if (order) {
				orderStore.lastCreatedOrderId = effectiveOrderId;
				router.push(`/order-success?id=${effectiveOrderId}`);
			} else {
				router.push("/orders");
			}
		} catch {
			router.push("/orders");
		}
	} else {
		router.push(`/orders?payment=${isCancelled ? "cancelled" : "failed"}`);
	}
});
</script>

<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-50">
		<div class="text-center space-y-6">
			<div
				class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto"
			/>
			<div class="space-y-2">
				<h2 class="text-2xl font-black text-gray-900 uppercase">
					Đang xử lý thanh toán
				</h2>
				<p class="text-gray-500 font-medium">
					Vui lòng không đóng trình duyệt hoặc tải lại trang...
				</p>
			</div>
		</div>
	</div>
</template>
