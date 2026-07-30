<script setup>
import { computed, watch, onMounted } from "vue";
import { useOrderStore } from "~/stores/order.store";
import { useCart } from "~/composables/useCart";

defineProps({
	modelValue: {
		type: String,
		default: "cod",
	},
});

const emit = defineEmits(["update:modelValue"]);

const orderStore = useOrderStore();
const { cartDetails } = useCart();

const subtotal = computed(() => {
	return (cartDetails.value || []).reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
});

const requiresDeposit = computed(() => {
	const orderValueExceeds = Number(
		orderStore.settings.Order_value_exceeds || 0,
	);
	return orderValueExceeds > 0 && subtotal.value >= orderValueExceeds;
});

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
	emit("update:modelValue", methodId);
};

watch(
	requiresDeposit,
	(newVal) => {
		if (newVal && orderStore.shippingInfo.paymentMethod === "COD") {
			selectMethod("PayOS");
		}
	},
	{ immediate: true },
);

onMounted(() => {
	if (
		!orderStore.shippingInfo.paymentMethod ||
		(requiresDeposit.value && orderStore.shippingInfo.paymentMethod === "COD")
	) {
		orderStore.shippingInfo.paymentMethod = requiresDeposit.value
			? "PayOS"
			: "COD";
		emit("update:modelValue", orderStore.shippingInfo.paymentMethod);
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
				class="p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group"
				:class="[
					method.id === 'COD' && requiresDeposit
						? 'opacity-50 cursor-not-allowed border-gray-100 bg-gray-50/50'
						: 'cursor-pointer',
					orderStore.shippingInfo.paymentMethod === method.id && !(method.id === 'COD' && requiresDeposit)
						? 'bg-red-50 border-red-500 shadow-md shadow-red-500/10'
						: 'border-gray-100 hover:border-red-200 hover:bg-gray-50',
				]"
				@click="method.id === 'COD' && requiresDeposit ? null : selectMethod(method.id)"
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
						:class="{ 'group-hover:text-gray-500': method.id === 'COD' && requiresDeposit }"
					>
						{{ method.name }}
					</h5>
					<p class="text-xs text-gray-500 font-medium">
						{{ method.description }}
					</p>
					<p
						v-if="method.id === 'COD' && requiresDeposit"
						class="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider flex items-center gap-1"
					>
						<Icon name="fa6-solid:circle-exclamation" class="text-[9px]" />
						Không áp dụng cho đơn hàng cần đặt cọc
					</p>
				</div>
				<div
					class="transition-all duration-300"
					:class="[
						orderStore.shippingInfo.paymentMethod === method.id && !(method.id === 'COD' && requiresDeposit)
							? 'text-red-500 scale-110'
							: 'text-gray-200 group-hover:text-gray-300',
						method.id === 'COD' && requiresDeposit ? 'opacity-30 group-hover:text-gray-200' : ''
					]"
				>
					<Icon
						:name="
							orderStore.shippingInfo.paymentMethod === method.id && !(method.id === 'COD' && requiresDeposit)
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
