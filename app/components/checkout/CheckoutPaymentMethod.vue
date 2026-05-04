<script setup>
import { useOrderStore } from "~/stores/order.store";

const orderStore = useOrderStore();

const paymentMethods = [
	{
		id: "COD",
		name: "Thanh toán khi nhận hàng (COD)",
		description: "Bạn sẽ thanh toán bằng tiền mặt khi shipper giao hàng đến.",
		icon: "💵",
		iconName: "fa6-solid:money-bill-1",
	},
	{
		id: "VNPay",
		name: "Thanh toán qua VNPay",
		description: "Thanh toán nhanh chóng, an toàn qua cổng VNPay.",
		icon: "🇻🇳",
		iconImage: "/assets/image/payment/vnpay.webp",
	},
	{
		id: "PayOS",
		name: "Thanh toán qua PayOS",
		description:
			"Thanh toán nhanh chóng qua cổng PayOS (VietQR, ATM, Credit Card).",
		icon: "💳",
		iconImage: "/assets/image/payment/payos.webp",
	},
];

const selectMethod = (methodId) => {
	orderStore.shippingInfo.paymentMethod = methodId;
};

onMounted(() => {
	if (!orderStore.shippingInfo.paymentMethod) {
		orderStore.shippingInfo.paymentMethod = "COD";
	}
});
</script>

<template>
	<div
		class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6"
	>
		<h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
			<span
				class="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center text-sm"
				>2</span
			>
			Phương thức thanh toán
		</h3>

		<div class="space-y-4">
			<div
				v-for="method in paymentMethods"
				:key="method.id"
				class="p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 group"
				:class="[
					orderStore.shippingInfo.paymentMethod === method.id
						? 'bg-red-50 border-red-500 shadow-md shadow-red-500/10'
						: 'border-gray-100 hover:border-red-200 hover:bg-gray-50',
				]"
				@click="selectMethod(method.id)"
			>
				<div
					class="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm overflow-hidden p-2"
				>
					<img
						v-if="method.iconImage"
						:src="method.iconImage"
						:alt="method.name"
						class="w-full h-full object-contain"
					>
					<span v-else class="text-2xl">{{ method.icon }}</span>
				</div>
				<div class="flex-1">
					<h5
						class="font-bold text-gray-900 group-hover:text-red-600 transition-colors"
					>
						{{ method.name }}
					</h5>
					<p class="text-xs text-gray-500 font-medium">
						{{ method.description }}
					</p>
				</div>
				<div
					class="transition-all duration-300"
					:class="[
						orderStore.shippingInfo.paymentMethod === method.id
							? 'text-red-500 scale-110'
							: 'text-gray-200 group-hover:text-gray-300',
					]"
				>
					<Icon
						:name="
							orderStore.shippingInfo.paymentMethod === method.id
								? 'fa6-solid:circle-check'
								: 'fa6-regular:circle'
						"
						class="text-2xl"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
