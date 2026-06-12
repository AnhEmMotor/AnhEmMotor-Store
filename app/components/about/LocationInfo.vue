<script setup>
defineProps({
	address: {
		type: String,
		required: true,
	},
	hotline: {
		type: String,
		required: true,
	},
});

defineEmits(['search']);
</script>

<template>
	<div class="bg-white p-10 rounded-[28px] shadow-xl border border-gray-100 flex flex-col h-full">
		<h3 class="text-2xl font-black text-red-600 mb-8 tracking-tight">ANHEM MOTOR</h3>
		
		<div class="space-y-6 mb-10">
			<div class="flex gap-5">
				<div class="w-12 h-12 bg-red-50 text-red-600 rounded-[14px] flex items-center justify-center flex-shrink-0 text-xl shadow-inner">
					📍
				</div>
				<div>
					<div class="font-bold text-gray-400 uppercase text-[10px] tracking-widest mb-1">Địa chỉ</div>
					<div class="text-gray-900 font-bold leading-relaxed">
						{{ address }}
					</div>
				</div>
			</div>

			<div class="flex gap-5">
				<div class="w-12 h-12 bg-red-50 text-red-600 rounded-[14px] flex items-center justify-center flex-shrink-0 text-xl shadow-inner">
					📞
				</div>
				<div>
					<div class="font-bold text-gray-400 uppercase text-[10px] tracking-widest mb-1">Hotline</div>
					<div class="text-gray-900 font-bold text-lg">{{ hotline }}</div>
				</div>
			</div>

			<div class="flex gap-5">
				<div class="w-12 h-12 bg-red-50 text-red-600 rounded-[14px] flex items-center justify-center flex-shrink-0 text-xl shadow-inner">
					🕒
				</div>
				<div>
					<div class="font-bold text-gray-400 uppercase text-[10px] tracking-widest mb-1">Giờ mở cửa</div>
					<div class="text-gray-900 font-bold">08:00 - 20:00 (Tất cả các ngày)</div>
				</div>
			</div>
		</div>

		
		<div class="border-t border-gray-100 pt-8 space-y-4 mb-10">
			<div class="flex items-center text-sm font-bold text-gray-600">
				<span class="text-red-500 mr-3">✔</span> Xe chính hãng, nguồn gốc rõ ràng
			</div>
			<div class="flex items-center text-sm font-bold text-gray-600">
				<span class="text-red-500 mr-3">✔</span> Kiểm định chất lượng nghiêm ngặt
			</div>
			<div class="flex items-center text-sm font-bold text-gray-600">
				<span class="text-red-500 mr-3">✔</span> Bảo hành minh bạch, tận tâm
			</div>
			<div class="flex items-center text-sm font-bold text-gray-600">
				<span class="text-red-500 mr-3">✔</span> Hỗ trợ trả góp, thủ tục nhanh
			</div>
		</div>

		<button
			class="w-full bg-gray-900 text-white py-4 rounded-[14px] font-black hover:bg-red-600 transition-all shadow-lg active:scale-95"
			@click="$emit('search', address)"
		>
			Chỉ đường trên Google Maps
		</button>
	</div>
</template>
