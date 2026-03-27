<script setup>
defineProps({
	order: {
		type: Object,
		required: true,
	},
	statusName: {
		type: String,
		default: "Đang xử lý",
	},
	isCancellable: {
		type: Boolean,
		default: false,
	},
	canEdit: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(["edit", "cancel"]);

const formatPrice = (price) => {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(price || 0);
};

const calculateTotal = (items) => {
	if (!items) return 0;
	return items.reduce(
		(sum, item) => sum + (item.quantity || 0) * (item.price || 0),
		0,
	);
};
</script>

<template>
	<div
		class="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
	>
		<div
			class="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4"
		>
			<div class="flex items-center gap-4">
				<div class="text-xs text-gray-400 font-bold uppercase tracking-widest">
					Mã đơn hàng:
					<span class="text-gray-900 ml-1">#{{ order.orderCode }}</span>
				</div>
			</div>

			<div class="flex items-center gap-3">
				<span
					class="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider"
					:class="{
						'bg-yellow-50 text-yellow-600':
							order.statusId === 'pending' ||
							order.statusId === 'waiting_deposit',
						'bg-blue-50 text-blue-600':
							order.statusId === 'confirmed_cod' ||
							order.statusId === 'deposit_paid' ||
							order.statusId === 'paid_processing',
						'bg-indigo-50 text-indigo-600':
							order.statusId === 'delivering' ||
							order.statusId === 'waiting_pickup',
						'bg-green-50 text-green-600': order.statusId === 'completed',
						'bg-red-50 text-red-600': order.statusId === 'cancelled',
						'bg-orange-50 text-orange-600':
							order.status === 'refunding' || order.status === 'refunded',
					}"
				>
					{{ statusName }}
				</span>
			</div>
		</div>

		<div class="px-6 py-4">
			<div class="space-y-4">
				<div
					v-for="(item, index) in order.items"
					:key="index"
					class="flex gap-4"
				>
					<div
						class="w-16 h-16 bg-gray-50 rounded-xl flex-shrink-0 border border-gray-100 flex items-center justify-center overflow-hidden"
					>
						<img
							:src="item.image || '/assets/image/placeholder-product.webp'"
							class="w-full h-full object-cover"
							@error="
								(e) => (e.target.src = '/assets/image/placeholder-product.webp')
							"
						>
					</div>
					<div class="flex-1 min-w-0 flex flex-col justify-center">
						<h4 class="font-bold text-gray-900 truncate">
							{{ item.name || "Sản phẩm" }}
						</h4>
						<div class="flex items-center justify-between">
							<p class="text-xs text-gray-500">
								Số lượng:
								<span class="font-bold">{{ item.quantity }}</span>
							</p>
							<p class="text-sm font-black text-red-500">
								{{ formatPrice(item.price) }}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div
				class="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6"
			>
				<div class="space-y-3">
					<div
						class="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest"
					>
						<Icon name="fa6-solid:truck" class="text-red-500" />
						Thông tin giao hàng
					</div>
					<div class="bg-gray-50/50 rounded-2xl p-4 space-y-2">
						<div class="flex items-center gap-3">
							<Icon name="fa6-solid:user" class="text-[10px] text-gray-400" />
							<span class="text-sm font-bold text-gray-900">{{
								order.customer?.name || "Chưa có tên"
							}}</span>
						</div>
						<div class="flex items-center gap-3">
							<Icon name="fa6-solid:phone" class="text-[10px] text-gray-400" />
							<span class="text-sm font-bold text-gray-700">{{
								order.customer?.phone || "Chưa có SĐT"
							}}</span>
						</div>
						<div class="flex items-start gap-3">
							<Icon
								name="fa6-solid:location-dot"
								class="text-[10px] text-gray-400 mt-1"
							/>
							<span
								class="text-sm font-medium text-gray-600 leading-relaxed italic"
								>{{ order.customer?.address || "Chưa có địa chỉ" }}</span
							>
						</div>
					</div>
				</div>
				<div class="space-y-3">
					<div
						class="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest"
					>
						<Icon name="fa6-solid:note-sticky" class="text-red-500" />
						Ghi chú khách hàng
					</div>
					<p class="text-sm font-bold text-gray-700 leading-relaxed px-2">
						{{ order.notes || "Không có ghi chú nào cho đơn hàng này." }}
					</p>
				</div>
			</div>
		</div>

		<div
			class="px-6 py-4 bg-gray-50/20 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4"
		>
			<div class="flex items-center gap-3">
				<button
					v-if="isCancellable"
					class="px-6 py-2 bg-white border border-red-100 text-red-500 text-xs font-black rounded-full hover:bg-red-50 transition-all active:scale-95 shadow-sm uppercase tracking-wider"
					aria-label="Yêu cầu hủy đơn hàng này"
					@click="emit('cancel', order.id)"
				>
					Hủy đơn
				</button>
				<button
					v-if="canEdit"
					class="px-6 py-2 bg-gray-900 text-white text-xs font-black rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-sm uppercase tracking-wider"
					aria-label="Sửa thông tin nhận hàng"
					@click="emit('edit', order)"
				>
					Sửa thông tin
				</button>
			</div>
			<div class="text-right">
				<p
					class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1"
				>
					Tổng cộng:
				</p>
				<p class="text-2xl font-black text-red-500">
					{{ formatPrice(order.totalAmount || calculateTotal(order.items)) }}
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.text-red-500 {
	color: #e31837;
}
</style>
