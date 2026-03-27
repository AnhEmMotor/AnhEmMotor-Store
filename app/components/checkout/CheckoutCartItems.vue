<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/useCartStore";
import { orderMapper } from "@/mappers/orderMapper";

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems);

function formatPrice(price) {
	return orderMapper.formatPrice(price);
}
</script>

<template>
	<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
		<div class="flex items-center gap-3 mb-6">
			<div
				class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"
			>
				<Icon name="fa6-solid:cart-shopping" />
			</div>
			<div>
				<h2 class="text-lg font-bold text-gray-900">Chi tiết sản phẩm</h2>
				<p class="text-xs text-gray-500">
					{{ cartItems.length }} sản phẩm trong giỏ hàng
				</p>
			</div>
		</div>

		<div class="space-y-4">
			<div
				v-for="item in cartItems"
				:key="item.id"
				class="flex gap-4 p-4 rounded-xl border border-gray-50 hover:border-gray-100 hover:bg-gray-50/50 transition-all group"
			>
				<div
					class="w-20 h-20 rounded-lg bg-white border border-gray-100 overflow-hidden flex-shrink-0"
				>
					<img
						v-if="item.image"
						:src="item.image"
						:alt="item.name"
						class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					>
					<div
						v-else
						class="w-full h-full flex items-center justify-center bg-gray-50"
					>
						<Icon name="fa6-solid:image" class="text-gray-300 text-xl" />
					</div>
				</div>
				<div class="flex-grow min-w-0">
					<h3 class="text-sm font-semibold text-gray-900 truncate mb-1">
						{{ item.name }}
					</h3>
					<p class="text-xs text-gray-500 mb-2">
						Số lượng: {{ item.quantity }}
					</p>
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-blue-600">
							{{ formatPrice(item.price) }}
						</span>
						<span class="text-xs text-gray-400">
							Tổng: {{ formatPrice(item.price * item.quantity) }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
