<script setup>
import { computed, ref } from "vue";
import { useCart } from "~/composables/useCart";
import orderMapper from "~/mappers/order.mapper";

const {
	cartItems,
	cartDetails,
	removeItem,
	updateQuantity,
	isPending,
} = useCart();
const orderStore = useOrderStore();
const isChecking = ref(false);

const isSubmitting = computed(() => orderStore.isLoading);

const orderSummary = computed(() =>
	orderMapper.calculateSummary(
		cartDetails.value, 
		{
			orderValueExceeds: orderStore.settings.Order_value_exceeds,
			depositRatio: orderStore.settings.Deposit_ratio
		}, 
		orderStore.calculatedShippingFee
	),
);

const formatPrice = (val) => orderMapper.formatPrice(val);

async function handleUpdateQuantity(item, newQuantity, index) {
	if (newQuantity <= 0) {
		removeItem(index);
		return;
	}

	if (orderStore.fieldErrors[item.id]) {
		Reflect.deleteProperty(orderStore.fieldErrors, item.id);
	}

	const change = newQuantity - item.quantity;

	if (change > 0) {
		isChecking.value = true;
		await new Promise((resolve) => setTimeout(resolve, 500));

		const limit = item.effectiveMax;
		if (limit != null && newQuantity > limit) {
			orderStore.fieldErrors[item.id] = `Đã đạt số lượng mua tối đa (${limit}) cho sản phẩm này.`;
			isChecking.value = false;
			return;
		}
		isChecking.value = false;
	}

	updateQuantity(item.id, newQuantity);
}

const emit = defineEmits(["place-order"]);

function handlePlaceOrder() {
	emit("place-order");
}
</script>

<template>
	<div class="lg:w-[460px] space-y-6">
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
				class="space-y-5 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar mb-8"
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
						class="flex flex-col gap-1 p-2 rounded-2xl transition-all border"
						:class="
							orderStore.fieldErrors[item.id]
								? 'border-red-500 bg-red-50'
								: 'border-transparent'
						"
					>
						<div class="flex gap-4">
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
									<h5
										class="text-sm font-bold text-gray-800 line-clamp-2 leading-snug"
									>
										{{ item.name }}
									</h5>
									<button
										class="text-gray-400 hover:text-red-500 transition-colors ml-2 disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
										aria-label="Xóa sản phẩm này khỏi đơn hàng"
										:disabled="isChecking || isSubmitting"
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
									class="flex items-center gap-2 mt-2 bg-gray-100/50 p-1.5 rounded-lg w-fit"
								>
									<button
										class="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-[10px] hover:bg-red-50 hover:text-red-500 transition-all font-black disabled:opacity-30 disabled:cursor-not-allowed"
										aria-label="Giảm số lượng sản phẩm"
										:disabled="isChecking || isSubmitting"
										@click="
											handleUpdateQuantity(item, item.quantity - 1, index)
										"
									>
										-
									</button>
									<span
										class="text-xs font-bold min-w-[2rem] text-center px-1"
										>{{ item.quantity }}</span
									>
									<button
										class="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-[10px] hover:bg-red-50 hover:text-red-500 transition-all font-black disabled:opacity-30 disabled:cursor-not-allowed"
										aria-label="Tăng số lượng sản phẩm"
										:disabled="isChecking || isSubmitting"
										@click="
											handleUpdateQuantity(item, item.quantity + 1, index)
										"
									>
										+
									</button>
								</div>
								<p
									v-if="orderStore.fieldErrors[item.id]"
									class="text-[9px] font-bold text-red-600 mt-1"
								>
									{{ orderStore.fieldErrors[item.id] }}
								</p>
							</div>
							<p
								v-if="item.effectiveMax != null"
								class="mt-1 text-[10px] font-semibold text-gray-400"
							>
								Tối đa {{ item.effectiveMax }} sản phẩm
							</p>
						</div>
					</div>
				</template>
			</div>

			<div class="space-y-4 pt-6 border-t border-gray-100">
				<div class="flex justify-between text-sm">
					<span class="text-gray-500 font-medium">Tạm tính</span>
					<span class="font-bold text-gray-900">{{
						formatPrice(orderSummary.subtotal)
					}}</span>
				</div>
				<div v-if="orderSummary.shipping !== null" class="flex justify-between text-sm">
					<span class="text-gray-500 font-medium">Phí giao hàng</span>
					<span v-if="orderStore.isCalculatingShipping" class="flex gap-2 items-center text-gray-400">
						<Icon name="fa6-solid:circle-notch" class="animate-spin" />
						Đang tính...
					</span>
					<span v-else class="font-bold text-gray-900">{{
						orderSummary.shipping === 0
							? "Miễn phí"
							: formatPrice(orderSummary.shipping)
					}}</span>
				</div>
				<div
					v-if="orderSummary.requiresDeposit"
					class="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 space-y-3"
				>
					<div class="flex items-center gap-2 text-amber-700">
						<Icon name="fa6-solid:circle-info" class="text-sm" />
						<span class="text-xs font-black uppercase tracking-widest">
							Đơn hàng cần đặt cọc
						</span>
					</div>
					<p class="text-xs font-medium text-amber-800 leading-relaxed">
						Đơn hàng vượt ngưỡng áp dụng đặt cọc. Bạn chỉ cần thanh toán
						{{ orderSummary.depositRatio }}% trước, phần còn lại thanh toán sau.
					</p>
					<div class="flex justify-between text-sm">
						<span class="text-amber-700 font-bold">Tiền đặt cọc</span>
						<span class="font-black text-amber-900">{{
							formatPrice(orderSummary.depositAmount)
						}}</span>
					</div>
					<div class="flex justify-between text-sm">
						<span class="text-amber-700 font-bold">Còn lại</span>
						<span class="font-black text-amber-900">{{
							formatPrice(orderSummary.remainingAmount)
						}}</span>
					</div>
				</div>

				<div class="flex justify-between pt-6 border-t border-gray-100">
					<span class="text-lg font-black text-gray-900 uppercase">
						{{
							orderSummary.requiresDeposit ? "Thanh toán hôm nay" : "Tổng cộng"
						}}
					</span>
					<span class="text-xl font-black text-red-600">{{
						formatPrice(orderSummary.payableNow)
					}}</span>
				</div>

			</div>

			<button
				class="w-full mt-8 py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
				aria-label="Xác nhận và đặt hàng ngay"
				@click="handlePlaceOrder"
			>
				<Icon name="fa6-solid:lock" class="text-xs" />
				<span>Xác nhận đặt hàng</span>
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


