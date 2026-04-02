<script setup>
defineProps({
	isOpen: {
		type: Boolean,
		default: false,
	},
	isSubmitting: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(["close", "confirm"]);
</script>

<template>
	<div
		v-if="isOpen"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity"
	>
		<div
			class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300"
		>
			<div class="p-8 text-center">
				<div
					class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"
				>
					<Icon
						name="fa6-solid:triangle-exclamation"
						class="text-3xl text-red-500"
					/>
				</div>
				<h3 class="text-2xl font-black text-gray-900 mb-2 uppercase">
					Hủy đơn hàng?
				</h3>
				<p class="text-gray-500 font-medium">
					Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không thể
					hoàn tác.
				</p>
			</div>

			<div class="p-8 bg-gray-50 border-t border-gray-100 flex gap-4">
				<button
					class="flex-1 py-4 bg-white border border-gray-200 text-gray-500 font-black rounded-2xl hover:bg-gray-100 transition-all active:scale-95 uppercase tracking-widest text-xs"
					aria-label="Quay lại danh sách đơn hàng"
					@click="emit('close')"
				>
					Quay lại
				</button>
				<button
					:disabled="isSubmitting"
					class="flex-1 py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
					aria-label="Xác nhận hủy đơn hàng vĩnh viễn"
					@click="emit('confirm')"
				>
					<Icon
						v-if="isSubmitting"
						name="fa6-solid:spinner"
						class="animate-spin"
					/>
					Xác nhận hủy
				</button>
			</div>
		</div>
	</div>
</template>
