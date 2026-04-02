<script setup>
defineProps({
	isOpen: {
		type: Boolean,
		default: false,
	},
	order: {
		type: Object,
		default: null,
	},
	form: {
		type: Object,
		required: true,
	},
	errors: {
		type: Object,
		default: () => ({}),
	},
	isSubmitting: {
		type: Boolean,
		default: false,
	},
	lockedDelivery: {
		type: Boolean,
		default: false,
	},
	lockedNotes: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(["close", "save", "update:form"]);

const handleSave = () => {
	emit("save");
};
</script>

<template>
	<div
		v-if="isOpen"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity"
	>
		<div
			class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in duration-300"
		>
			<div
				class="px-8 py-6 border-b border-gray-100 flex items-center justify-between"
			>
				<h3 class="text-xl font-black text-gray-900 uppercase">
					Sửa thông tin đơn hàng
				</h3>
				<button
					class="text-gray-400 hover:text-gray-600 transition-colors"
					aria-label="Đóng cửa sổ chỉnh sửa"
					@click="emit('close')"
				>
					<Icon name="fa6-solid:xmark" class="text-xl" />
				</button>
			</div>

			<div class="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
				<div class="space-y-4">
					<div class="space-y-2">
						<label
							class="text-xs font-black text-gray-400 uppercase tracking-widest"
						>
							Người nhận hàng
						</label>
						<input
							:value="form.customerName"
							type="text"
							placeholder="Tên khách hàng"
							class="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm"
							:class="{ 'border-red-500 bg-red-50/10': errors.customerName }"
							:disabled="lockedDelivery"
							@input="
								emit('update:form', {
									...form,
									customerName: $event.target.value,
								})
							"
						>
						<p v-if="errors.customerName" class="text-xs text-red-500 mt-1">
							{{ errors.customerName }}
						</p>
					</div>

					<div class="space-y-2">
						<label
							class="text-xs font-black text-gray-400 uppercase tracking-widest"
						>
							Số điện thoại
						</label>
						<input
							:value="form.customerPhone"
							type="tel"
							placeholder="Số điện thoại"
							class="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm"
							:class="{ 'border-red-500 bg-red-50/10': errors.customerPhone }"
							:disabled="lockedDelivery"
							@input="
								emit('update:form', {
									...form,
									customerPhone: $event.target.value,
								})
							"
						>
						<p v-if="errors.customerPhone" class="text-xs text-red-500 mt-1">
							{{ errors.customerPhone }}
						</p>
					</div>

					<div class="space-y-2">
						<label
							class="text-xs font-black text-gray-400 uppercase tracking-widest"
						>
							Địa chỉ giao hàng
						</label>
						<textarea
							:value="form.customerAddress"
							rows="3"
							placeholder="Địa chỉ chi tiết"
							class="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm resize-none"
							:class="{ 'border-red-500 bg-red-50/10': errors.customerAddress }"
							:disabled="lockedDelivery"
							@input="
								emit('update:form', {
									...form,
									customerAddress: $event.target.value,
								})
							"
						/>
						<p v-if="errors.customerAddress" class="text-xs text-red-500 mt-1">
							{{ errors.customerAddress }}
						</p>
					</div>

					<div class="space-y-2">
						<label
							class="text-xs font-black text-gray-400 uppercase tracking-widest"
						>
							Ghi chú
						</label>
						<textarea
							:value="form.notes"
							rows="2"
							placeholder="Lời nhắn..."
							class="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm resize-none"
							:disabled="lockedNotes"
							@input="
								emit('update:form', { ...form, notes: $event.target.value })
							"
						/>
					</div>
				</div>
			</div>

			<div class="p-8 bg-gray-50 border-t border-gray-100 flex gap-4">
				<button
					class="flex-1 py-4 bg-white border border-gray-200 text-gray-500 font-black rounded-2xl hover:bg-gray-100 transition-all active:scale-95 uppercase tracking-widest text-xs"
					aria-label="Hủy bỏ các thay đổi và đóng cửa sổ"
					@click="emit('close')"
				>
					Hủy bỏ
				</button>
				<button
					:disabled="isSubmitting"
					class="flex-1 py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
					aria-label="Xác nhận lưu thay đổi thông tin đơn hàng"
					@click="handleSave"
				>
					<Icon
						v-if="isSubmitting"
						name="fa6-solid:spinner"
						class="animate-spin"
					/>
					Lưu thay đổi
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
@reference "../../assets/main.css";

.custom-scrollbar::-webkit-scrollbar {
	width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
	@apply bg-gray-200 rounded-full;
}
</style>
