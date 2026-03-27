<script setup>
import { computed } from "vue";
import { useCart } from "~/composables/useCart";
import { useOrderStore } from "~/stores/order.store";
import orderMapper from "~/mappers/order.mapper";

const { cartItems, cartDetails, removeItem, updateQuantity, isPending } =
	useCart();
const orderStore = useOrderStore();

const isSubmitting = computed(() => orderStore.isLoading);

const orderSummary = computed(() =>
	orderMapper.calculateSummary(cartDetails.value),
);

const formatPrice = (val) => orderMapper.formatPrice(val);

async function handlePlaceOrder() {
	const instance = useNuxtApp();
	const authStore = useAuthStore();

	if (!authStore.isLoggedIn) {
		instance.$toast.error("Vui lòng đăng nhập để đặt hàng!");
		return;
	}

	if (!orderStore.validateShippingInfo()) {
		instance.$toast.error("Vui lòng kiểm tra lại thông tin nhận hàng!");
		return;
	}

	try {
		const order = await orderStore.createOrder(cartItems.value);
		if (order?.id) {
			const { clearCart } = useCart();
			clearCart();
			navigateTo(`/order-success?id=${order.id}`);
		}
	} catch {
		instance.$toast.error(orderStore.error || "Có lỗi xảy ra khi đặt hàng.");
	}
}
</script>

<template>
	<div class="lg:w-[400px] space-y-6">
		<div
			class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-24"
		>
			<h3
				class="text-lg font-black text-gray-900 mb-6 uppercase tracking-wider flex items-center gap-2"
			>
				<Icon name="fa6-solid:receipt" class="text-red-600" />
				Tóm tắt đơn hàng
			</h3>

			<div
				class="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar mb-6"
			>
				<template v-if="isPending && cartDetails.length === 0">
					<div
						v-for="i in cartItems.length || 3"
						:key="i"
						class="flex gap-4 animate-pulse"
					>
						<div class="w-16 h-16 bg-gray-200 rounded-xl shrink-0" />
						<div class="flex-1 space-y-2">
							<div class="h-4 bg-gray-200 rounded w-3/4" />
							<div class="h-4 bg-gray-200 rounded w-1/2" />
						</div>
					</div>
				</template>
				<template v-else>
					<div
						v-for="(item, index) in cartDetails"
						:key="item.id"
						class="flex gap-4"
					>
						<div
							class="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 shrink-0"
						>
							<img
								:src="item.image"
								:alt="item.name"
								class="w-full h-full object-cover"
								@error="
									(e) =>
										(e.target.src = '/assets/image/placeholder-product.webp')
								"
							>
						</div>
						<div class="flex-1 min-w-0">
							<div class="flex justify-between items-start">
								<h5 class="text-sm font-bold text-gray-800 truncate">
									{{ item.name }}
								</h5>
								<button
									class="text-gray-400 hover:text-red-500 transition-colors ml-2"
									aria-label="Xóa sản phẩm này khỏi đơn hàng"
									@click="removeItem(index)"
								>
									<Icon name="fa6-solid:trash-can" class="text-xs" />
								</button>
							</div>
							<div class="flex flex-col items-start mt-1">
								<p class="text-sm font-black text-red-600">
									{{ formatPrice(item.price * item.quantity) }}
								</p>
							</div>
							<div
								class="flex items-center gap-2 mt-2 bg-gray-50 p-1.5 rounded-lg w-fit"
							>
								<button
									class="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-[10px] hover:bg-red-50 hover:text-red-500 transition-all font-black"
									aria-label="Giảm số lượng sản phẩm"
									@click="updateQuantity(item.id, item.quantity - 1)"
								>
									-
								</button>
								<span class="text-xs font-bold w-4 text-center">{{
									item.quantity
								}}</span>
								<button
									class="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-[10px] hover:bg-red-50 hover:text-red-500 transition-all font-black"
									aria-label="Tăng số lượng sản phẩm"
									@click="updateQuantity(item.id, item.quantity + 1)"
								>
									+
								</button>
							</div>
						</div>
					</div>
				</template>
			</div>

			<div class="space-y-3 pt-6 border-t border-gray-100">
				<div class="flex justify-between text-sm">
					<span class="text-gray-500 font-medium">Tạm tính</span>
					<span class="font-bold text-gray-900">{{
						formatPrice(orderSummary.subtotal)
					}}</span>
				</div>
				<div class="flex justify-between text-sm">
					<span class="text-gray-500 font-medium">Phí giao hàng</span>
					<span class="font-bold text-gray-900">{{
						orderSummary.shipping === 0
							? "Miễn phí"
							: formatPrice(orderSummary.shipping)
					}}</span>
				</div>
				<div class="flex justify-between pt-4 border-t border-gray-100">
					<span class="text-lg font-black text-gray-900 uppercase"
						>Tổng cộng</span
					>
					<span class="text-xl font-black text-red-600">{{
						formatPrice(orderSummary.total)
					}}</span>
				</div>
			</div>

			<button
				:disabled="isSubmitting || cartItems.length === 0"
				class="w-full mt-8 py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
				aria-label="Xác nhận và đặt hàng ngay"
				@click="handlePlaceOrder"
			>
				<Icon
					v-if="isSubmitting"
					name="fa6-solid:spinner"
					class="animate-spin"
				/>
				<span v-else>Xác nhận đặt hàng</span>
			</button>
		</div>
	</div>
</template>

<style scoped>
@reference "../../assets/main.css";

.custom-scrollbar::-webkit-scrollbar {
	width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
	background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
	@apply bg-gray-200 rounded-full;
}
</style>
