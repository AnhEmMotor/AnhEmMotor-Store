<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useOrderStore } from "~/stores/order.store";
import { formatCurrency } from "~/utils/currency";

const route = useRoute();
const orderStore = useOrderStore();
const orderId = computed(() => route.query.id);

if (import.meta.server) {
	throw createError({
		statusCode: 404,
		statusMessage: "Page Not Found",
		fatal: true,
	});
}

const { data: order, pending: isLoading } = await useAsyncData(
	`order-success-${orderId.value}`,
	async () => {
		if (!orderId.value) return null;

		const isAuthorized =
			orderStore.lastCreatedOrderId == orderId.value && orderStore.currentOrder;

		if (!isAuthorized) {
			throw createError({
				statusCode: 404,
				statusMessage: "Order Not Found",
				fatal: true,
			});
		}

		return orderStore.currentOrder;
	},
	{
		watch: [orderId],
		server: false,
	},
);

useSeoMeta({
	title: "Đặt hàng thành công",
	description: "Cảm ơn bạn đã mua hàng tại AnhEm Motor.",
});

// const formatCurrency = (value) => {
// 	if (!value) return "0 ₫";
// 	return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
// };
</script>

<template>
	<main class="min-h-screen bg-gray-50 py-12 md:py-20">
		<div class="max-w-3xl mx-auto px-4">
			<ClientOnly>
				<div v-if="isLoading" class="text-center py-20">
					<div
						class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"
					/>
					<p
						class="mt-4 text-gray-500 font-bold uppercase tracking-widest text-xs"
					>
						Đang tải thông tin đơn hàng...
					</p>
				</div>

				<div v-if="order" class="space-y-8 animate-in zoom-in duration-500">
					<div
						class="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-100 text-center space-y-8"
					>
						<div
							class="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg shadow-green-500/20"
						>
							<Icon name="fa6-solid:check" />
						</div>

						<div class="space-y-3">
							<h1
								class="text-3xl md:text-4xl font-black text-gray-900 uppercase"
							>
								Đặt hàng thành công!
							</h1>
							<p class="text-gray-500 font-medium max-w-md mx-auto">
								Chúc mừng! Đơn hàng
								<span class="text-red-600 font-black"
									>#{{ order.orderCode }}</span
								>
								của bạn đã được tiếp nhận và đang chờ xử lý.
							</p>
						</div>

						<div
							class="bg-gray-50 rounded-[2.5rem] border border-gray-100 overflow-hidden text-left"
						>
							<div class="p-6 md:p-8 space-y-6">
								<h3
									class="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"
								>
									<Icon name="fa6-solid:receipt" class="text-red-500" />
									Tóm tắt đơn hàng
								</h3>

								<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div class="space-y-4">
										<div class="space-y-1">
											<p
												class="text-[10px] font-black text-gray-400 uppercase tracking-tighter"
											>
												Người nhận
											</p>
											<p class="text-sm font-bold text-gray-900">
												{{ order.customer?.name }}
											</p>
										</div>
										<div class="space-y-1">
											<p
												class="text-[10px] font-black text-gray-400 uppercase tracking-tighter"
											>
												Số điện thoại
											</p>
											<p class="text-sm font-bold text-gray-900">
												{{ order.customer?.phone }}
											</p>
										</div>
										<div class="space-y-1">
											<p
												class="text-[10px] font-black text-gray-400 uppercase tracking-tighter"
											>
												Địa chỉ
											</p>
											<p
												class="text-sm font-medium text-gray-600 leading-relaxed italic"
											>
												{{ order.customer?.address }}
											</p>
										</div>
									</div>

									<div class="space-y-4">
										<div class="space-y-1">
											<p
												class="text-[10px] font-black text-gray-400 uppercase tracking-tighter"
											>
												Thanh toán
											</p>
											<p class="text-sm font-bold text-gray-900">
												{{ order.paymentMethod }}
											</p>
										</div>
										<div class="space-y-1">
											<p
												class="text-[10px] font-black text-gray-400 uppercase tracking-tighter"
											>
												Tổng tiền
											</p>
											<p class="text-xl font-black text-red-600">
												{{ formatCurrency(order.totalAmount) }}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="flex flex-col sm:flex-row gap-4 pt-4">
							<NuxtLink
								to="/products"
								class="flex-1 py-4.5 bg-gray-100 text-gray-700 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase text-xs tracking-widest"
							>
								Tiếp tục mua sắm
							</NuxtLink>
							<NuxtLink
								to="/orders"
								class="flex-1 py-4.5 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 shadow-xl shadow-red-600/20 transition-all transform hover:-translate-y-1 active:scale-95 uppercase text-xs tracking-widest"
							>
								Xem đơn hàng của tôi
							</NuxtLink>
						</div>
					</div>

					<p class="text-center text-gray-400 text-xs font-medium">
						Một email xác nhận đã được gửi đến bạn. Nếu có thắc mắc, vui lòng
						liên hệ hotline
						<a href="tel:0901234567" class="text-red-500 font-bold"
							>090 123 4567</a
						>.
					</p>
				</div>

				<div
					v-else-if="!isLoading && orderId"
					class="text-center py-20 bg-white rounded-[3rem] shadow-xl border border-gray-100 animate-in fade-in duration-500 px-8"
				>
					<div
						class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6"
					>
						<Icon name="fa6-solid:box-open" class="text-4xl text-gray-300" />
					</div>
					<h2 class="text-2xl font-black text-gray-900 mb-2 uppercase">
						Không tìm thấy đơn hàng
					</h2>
					<p class="text-gray-500 font-medium mb-8 max-w-sm mx-auto">
						Rất tiếc, chúng tôi không thể tìm thấy thông tin chi tiết cho đơn
						hàng #{{ orderId }}.
					</p>
					<NuxtLink
						to="/products"
						class="inline-flex items-center px-10 py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all uppercase text-xs tracking-widest"
					>
						Quay lại mua sắm
					</NuxtLink>
				</div>
			</ClientOnly>
		</div>
	</main>
</template>
