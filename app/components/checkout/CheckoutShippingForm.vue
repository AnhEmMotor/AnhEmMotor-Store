<script setup>
import { useOrderStore } from "@/stores/useOrderStore";

const orderStore = useOrderStore();
</script>

<template>
	<div
		class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6"
	>
		<h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
			<span
				class="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center text-sm"
				>1</span
			>
			Thông tin nhận hàng
		</h3>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="space-y-2">
				<label
					class="text-xs font-black text-gray-400 uppercase tracking-widest"
					>Họ và tên</label
				>
				<input
					v-model="orderStore.shippingInfo.fullName"
					type="text"
					placeholder="Nhập họ và tên người nhận"
					class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm"
					:class="{
						'!border-red-500 !bg-red-50': orderStore.errors.fullName,
					}"
					@input="orderStore.errors.fullName = ''"
				>
				<p
					v-if="orderStore.errors.fullName"
					class="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase tracking-tighter"
				>
					{{ orderStore.errors.fullName }}
				</p>
			</div>
			<div class="space-y-2">
				<label
					class="text-xs font-black text-gray-400 uppercase tracking-widest"
					>Số điện thoại</label
				>
				<input
					v-model="orderStore.shippingInfo.phone"
					type="tel"
					placeholder="Nhập số điện thoại"
					class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm"
					:class="{
						'!border-red-500 !bg-red-50': orderStore.errors.phone,
					}"
					@input="orderStore.errors.phone = ''"
				>
				<p
					v-if="orderStore.errors.phone"
					class="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase tracking-tighter"
				>
					{{ orderStore.errors.phone }}
				</p>
			</div>
		</div>

		<div class="space-y-2">
			<label class="text-xs font-black text-gray-400 uppercase tracking-widest"
				>Địa chỉ giao hàng</label
			>
			<textarea
				v-model="orderStore.shippingInfo.address"
				rows="3"
				placeholder="Nhập địa chỉ nhận hàng chi tiết"
				class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm resize-none"
				:class="{
					'!border-red-500 !bg-red-50': orderStore.errors.address,
				}"
				@input="orderStore.errors.address = ''"
			/>
			<p
				v-if="orderStore.errors.address"
				class="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase tracking-tighter"
			>
				{{ orderStore.errors.address }}
			</p>
		</div>

		<div class="space-y-2">
			<label class="text-xs font-black text-gray-400 uppercase tracking-widest"
				>Ghi chú (tùy chọn)</label
			>
			<textarea
				v-model="orderStore.shippingInfo.notes"
				rows="2"
				placeholder="Lưu ý cho người giao hàng..."
				class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm resize-none"
			/>
		</div>
	</div>
</template>
