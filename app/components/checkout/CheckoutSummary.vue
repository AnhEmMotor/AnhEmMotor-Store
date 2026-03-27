<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/useCartStore";
import { useOrderStore } from "@/stores/order.store";
import { orderMapper } from "@/mappers/order.mapper";

const emit = defineEmits(["order-success"]);

const instance = useNuxtApp();
const cartStore = useCartStore();
const orderStore = useOrderStore();

const cartItems = computed(() => cartStore.cartItems);
const isLoading = computed(() => orderStore.isLoading);

const summary = computed(() => orderMapper.calculateSummary(cartItems.value));

function formatPrice(price) {
	return orderMapper.formatPrice(price);
}

async function handlePlaceOrder() {
	const { success, order, error } = await orderStore.createOrder();
	if (success) {
		instance.$toast.success("Đặt hàng thành công!");
		cartStore.clearCart();
		emit("order-success", order);
	} else {
		instance.$toast.error(error || "Có lỗi xảy ra khi đặt hàng");
	}
}
</script>

<template>
	<div class="lg:col-span-1">
		<div
			class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24"
		>
			<h2 class="text-lg font-bold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>

			<div class="space-y-4 mb-6">
				<div class="flex justify-between text-sm">
					<span class="text-gray-500"
						>Tạm tính ({{ cartItems.length }} sản phẩm)</span
					>
					<span class="font-medium text-gray-900">{{
						formatPrice(summary.subtotal)
					}}</span>
				</div>
				<div class="flex justify-between text-sm">
					<span class="text-gray-500">Phí vận chuyển</span>
					<span class="font-medium text-green-600">Miễn phí</span>
				</div>
				<div class="h-px bg-gray-100 my-4" />
				<div class="flex justify-between items-center">
					<span class="text-base font-bold text-gray-900">Tổng cộng</span>
					<div class="text-right">
						<span class="text-xl font-black text-red-600">
							{{ formatPrice(summary.total) }}
						</span>
						<p class="text-[10px] text-gray-400 mt-0.5">
							(Đã bao gồm VAT nếu có)
						</p>
					</div>
				</div>
			</div>

			<div class="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
				<div class="flex gap-3">
					<div
						class="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0"
					>
						<Icon name="fa6-solid:shield-check" class="text-[10px]" />
					</div>
					<div>
						<h4 class="text-xs font-bold text-blue-900">Cam kết bảo mật</h4>
						<p class="text-[10px] text-blue-700 mt-0.5">
							Mọi thông tin thanh toán của bạn luôn được bảo mật tuyệt đối.
						</p>
					</div>
				</div>
			</div>

			<button
				type="button"
				:disabled="isLoading || cartItems.length === 0"
				class="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-lg shadow-gray-200 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden active:scale-[0.98]"
				@click="handlePlaceOrder"
			>
				<div class="flex items-center justify-center gap-2 relative z-10">
					<Icon
						v-if="isLoading"
						name="fa6-solid:spinner"
						class="animate-spin"
					/>
					<Icon
						v-else
						name="fa6-solid:bag-shopping"
						class="group-hover:translate-y-[-2px] transition-transform"
					/>
					{{ isLoading ? "Đang xử lý..." : "Xác nhận đặt hàng" }}
				</div>
			</button>

			<div class="mt-4 flex items-center justify-center gap-6">
				<div class="flex flex-col items-center gap-1.5">
					<Icon name="fa6-solid:truck" class="text-gray-400 text-xs" />
					<span class="text-[10px] text-gray-500">Giao nhanh</span>
				</div>
				<div class="flex flex-col items-center gap-1.5">
					<Icon name="fa6-solid:rotate" class="text-gray-400 text-xs" />
					<span class="text-[10px] text-gray-500">Đổi trả 7 ngày</span>
				</div>
				<div class="flex flex-col items-center gap-1.5">
					<Icon name="fa6-solid:medal" class="text-gray-400 text-xs" />
					<span class="text-[10px] text-gray-500">Chính hãng</span>
				</div>
			</div>
		</div>
	</div>
</template>
