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
		const code = Number.parseInt(String(orderCodeFromQuery), 10);
		effectiveOrderId = Math.floor(code / 100000) || code;
	}

	if (!effectiveOrderId || !statusFromQuery) {
		await router.replace("/payment-unavailable?reason=invalid");
		return;
	}

	const status = String(statusFromQuery).toLowerCase();
	const isSuccess = ["success", "paid", "00"].includes(status);
	const isCancelled = status === "cancelled";

	if (!isSuccess) {
		await router.replace({
			path: "/payment-unavailable",
			query: {
				id: effectiveOrderId,
				method: route.query.method,
				reason: isCancelled ? "cancelled" : "failed",
			},
		});
		return;
	}

	try {
		const order = await orderStore.fetchOrderDetail(effectiveOrderId);
		await router.replace(order ? `/order-success?id=${effectiveOrderId}` : "/orders");
	} catch {
		await router.replace({
			path: "/payment-unavailable",
			query: {
				id: effectiveOrderId,
				method: route.query.method,
				reason: "verification",
			},
		});
	}
});
</script>

<template>
	<main class="min-h-screen flex items-center justify-center bg-gray-50">
		<div class="text-center space-y-6">
			<div
				class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto"
			/>
			<div class="space-y-2">
				<h1 class="text-2xl font-black text-gray-900 uppercase">
					Đang xử lý thanh toán
				</h1>
				<p class="text-gray-500 font-medium">
					Vui lòng chờ trong giây lát...
				</p>
			</div>
		</div>
	</main>
</template>
