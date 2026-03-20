<template>
	<teleport to="body">
		<div
			:class="[
				'fixed inset-0 bg-black/40',
				isOpen
					? 'opacity-100 pointer-events-auto z-50'
					: shouldRender
						? 'opacity-0 pointer-events-none z-50'
						: 'opacity-0 pointer-events-none -z-10',
			]"
			@click="$emit('close')"
		/>

		<div
			:class="[
				'fixed inset-y-0 right-0 w-screen md:w-96 bg-white transform flex flex-col overflow-hidden shadow-2xl',
				isOpen ? 'translate-x-0' : 'translate-x-full',
				isOpen || shouldRender ? 'z-50' : '-z-10',
			]"
		>
			<div
				class="flex justify-between items-center p-4 border-b bg-gradient-to-r from-gray-50 to-white"
			>
				<h3 class="text-xl font-bold flex items-center gap-2">
					<Icon name="fa6-solid:cart-shopping" class="text-honda-red" />
					Giỏ hàng của bạn
				</h3>
				<button
					class="text-gray-700 text-2xl hover:text-honda-red transition-colors"
					aria-label="Đóng giỏ hàng"
					@click="$emit('close')"
				>
					<Icon name="fa6-solid:xmark" />
				</button>
			</div>

			<div
				class="flex-grow overflow-auto p-4 bg-white"
				style="-webkit-overflow-scrolling: touch"
			>
				<div
					v-if="cartItems.length === 0"
					class="text-center py-8 text-gray-500"
				>
					<Icon
						name="fa6-solid:cart-shopping"
						class="text-4xl mb-4 opacity-30"
					/>
					<p>Giỏ hàng của bạn đang trống.</p>
				</div>
				<div v-else>
					<div
						v-for="(item, index) in cartItems"
						:key="item.id"
						class="flex items-center gap-3 mb-4 pb-4 border-b last:border-b-0 transition-opacity duration-300"
						:class="{ 'opacity-60': item.loading }"
					>
						<div class="relative">
							<img
								:src="item.image"
								:alt="item.name"
								class="w-16 h-16 object-contain rounded-lg border p-1 bg-gray-50"
								@error="
									(e) =>
										(e.target.src = '/assets/image/placeholder-product.webp')
								"
							>
							<div
								v-if="item.loading"
								class="absolute inset-0 flex items-center justify-center bg-white/40"
							>
								<Icon
									name="fa6-solid:circle-notch"
									class="animate-spin text-red-500 text-xs"
								/>
							</div>
						</div>
						<div class="flex-1">
							<div class="font-semibold text-sm text-gray-800">
								{{ item.name }}
							</div>
							<div class="text-[#de0000] font-semibold text-sm">
								{{ formatCurrency(item.price) }} VNĐ
							</div>
							<div class="flex items-center gap-2 mt-2">
								<NumberStepper
									:model-value="item.quantity"
									:min="0"
									:max="999"
									@increment="$emit('updateQuantity', { index, change: 1 })"
									@decrement="$emit('updateQuantity', { index, change: -1 })"
								/>
							</div>
						</div>
						<button
							class="text-red-500 hover:bg-red-100 rounded p-2"
							aria-label="Xóa sản phẩm khỏi giỏ hàng"
							@click="$emit('removeItem', index)"
						>
							<Icon name="fa6-solid:trash-can" />
						</button>
					</div>
				</div>
			</div>

			<div class="p-4 border-t bg-gradient-to-r from-gray-50 to-white">
				<div class="flex justify-between items-center mb-4">
					<span class="font-semibold text-lg">Tổng cộng:</span>
					<span class="font-bold text-honda-red text-xl"
						>{{ formatCurrency(cartTotal) }} VNĐ</span
					>
				</div>
				<BaseButton
					v-if="auth.isLoggedIn"
					id="checkout-button"
					:to="{ path: '/process-order' }"
					:disabled="cartItems.length === 0"
					@click="onCheckout"
				>
					<Icon name="fa6-solid:credit-card" class="mr-2" />
					Tiến hành thanh toán
				</BaseButton>
				<BaseButton
					v-if="!auth.isLoggedIn"
					id="checkout-button"
					:to="{ path: '/process-order' }"
					:disabled="cartItems.length === 0"
					@click="onCheckout"
				>
					<Icon name="fa6-solid:right-to-bracket" class="mr-2" />
					Đăng nhập để thanh toán
				</BaseButton>
			</div>
		</div>
	</teleport>
</template>

<script setup>
import { ref, watch } from "vue";
import BaseButton from "../ui/button/BaseButton.vue";
import NumberStepper from "../ui/input/NumberStepper.vue";

const { isOpen, cartItems, cartTotal } = defineProps({
	isOpen: Boolean,
	cartItems: {
		type: Array,
		default: () => [],
	},
	cartTotal: {
		type: Number,
		default: 0,
	},
});
const auth = useAuthStore();
const emit = defineEmits(["close", "updateQuantity", "removeItem"]);

const shouldRender = ref(isOpen);
let closeTimer = null;
watch(
	() => isOpen,
	(val) => {
		if (val) {
			if (closeTimer) {
				clearTimeout(closeTimer);
				closeTimer = null;
			}
			shouldRender.value = true;
		} else {
			if (closeTimer) clearTimeout(closeTimer);
			shouldRender.value = false;
			closeTimer = null;
		}
	},
	{ immediate: true },
);

function onCheckout() {
	emit("close");
}

const formatCurrency = (amount) => {
	if (typeof amount !== "number") return amount;
	return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
</script>
