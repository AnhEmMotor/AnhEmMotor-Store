<template>
	<div
		class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6"
	>
		<h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
			<span
				class="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center text-sm"
			>2</span>
			Phương thức thanh toán
		</h3>

		<div class="space-y-3">
			<div
				class="p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4"
				:class="
					modelValue === 'cod'
						? 'bg-red-50 border-red-500 shadow-md shadow-red-500/10'
						: 'border-gray-200 hover:border-red-300'
				"
				@click="$emit('update:modelValue', 'cod')"
			>
				<div
					class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm"
				>
					💵
				</div>
				<div class="flex-1">
					<h5 class="font-bold text-gray-900">
						Thanh toán khi nhận hàng (COD)
					</h5>
					<p class="text-xs text-gray-500 font-medium">
						Bạn sẽ thanh toán bằng tiền mặt khi shipper giao hàng đến.
					</p>
				</div>
				<div v-if="modelValue === 'cod'" class="text-red-500">
					<Icon name="fa6-solid:circle-check" class="text-xl" />
				</div>
			</div>

			<div
				class="p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4"
				:class="
					modelValue === 'vnpay'
						? 'bg-blue-50 border-blue-500 shadow-md shadow-blue-500/10'
						: 'border-gray-200 hover:border-blue-300'
				"
				@click="$emit('update:modelValue', 'vnpay')"
			>
				<div
					class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm"
				>
					🏦
				</div>
				<div class="flex-1">
					<h5 class="font-bold text-gray-900">
						Chuyển khoản VNPay
					</h5>
					<p class="text-xs text-gray-500 font-medium">
						Thanh toán qua cổng VNPay - thẻ ATM, ví điện tử.
					</p>
				</div>
				<div v-if="modelValue === 'vnpay'" class="text-blue-500">
					<Icon name="fa6-solid:circle-check" class="text-xl" />
				</div>
			</div>

			<div
				class="p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4"
				:class="
					modelValue === 'payos'
						? 'bg-green-50 border-green-500 shadow-md shadow-green-500/10'
						: 'border-gray-200 hover:border-green-300'
				"
				@click="$emit('update:modelValue', 'payos')"
			>
				<div
					class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm"
				>
					📱
				</div>
				<div class="flex-1">
					<h5 class="font-bold text-gray-900">
						Thanh toán PayOS
					</h5>
					<p class="text-xs text-gray-500 font-medium">
						Thanh toán qua QR PayOS - quét mã bằng ngân hàng.
					</p>
				</div>
				<div v-if="modelValue === 'payos'" class="text-green-500">
					<Icon name="fa6-solid:circle-check" class="text-xl" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	modelValue: {
		type: String,
		default: "cod",
	},
});
const emit = defineEmits(["update:modelValue"]);
</script>
