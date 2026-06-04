<script setup>
defineProps({
	promotion: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div>
		<!-- DESKTOP STICKY SIDEBAR -->
		<div class="hidden lg:block sticky top-32 space-y-6">
			<div class="bg-white rounded-[2.5rem] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden relative">
				<!-- Brand Accent -->
				<div class="absolute top-0 left-0 right-0 h-2 bg-red-600"/>

				<div class="space-y-8">
					<div class="flex items-center justify-between">
						<span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thời gian còn lại</span>
						<span class="text-[10px] font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
							<span class="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"/>
							Đang diễn ra
						</span>
					</div>

					<div class="space-y-1 text-center py-4 bg-gray-50 rounded-2xl border border-gray-100">
						<span class="block text-4xl font-black text-gray-950 tracking-tighter">03:12:45</span>
						<span class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Ngày : Giờ : Phút</span>
					</div>

					<div class="space-y-4">
						<div class="flex items-center justify-between text-sm">
							<span class="font-bold text-gray-600">Suất ưu đãi còn lại:</span>
							<span class="font-black text-red-600">{{ promotion.remainingSlots || 0 }}/100</span>
						</div>
						<!-- Progress Bar -->
						<div class="h-2 bg-gray-100 rounded-full overflow-hidden">
							<div 
								class="h-full bg-red-600 transition-all duration-1000" 
								:style="{ width: `${(promotion.remainingSlots / 100) * 100}%` }"
							/>
						</div>
					</div>

					<div class="space-y-4 pt-4">
						<button class="w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-600/20 active:scale-95">
							Nhận ưu đãi ngay
						</button>
						<button class="w-full h-16 bg-white border border-gray-200 text-gray-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">
							Tư vấn trả góp
						</button>
					</div>

					<div class="flex items-center gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
						<Icon name="ph:info-fill" class="text-blue-500 text-xl" />
						<p class="text-[11px] font-medium text-blue-800 leading-tight">
							Hỗ trợ xét duyệt hồ sơ online chỉ trong 15 phút.
						</p>
					</div>
				</div>
			</div>

			<!-- Quick Support -->
			<div class="bg-gray-900 rounded-[2.5rem] p-8 text-white">
				<div class="flex items-center gap-4">
					<div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
						<Icon name="ph:phone-call-fill" class="text-red-500 text-xl" />
					</div>
					<div>
						<p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hotline 24/7</p>
						<p class="text-lg font-black tracking-tight">1900 123 456</p>
					</div>
				</div>
			</div>
		</div>

		<!-- MOBILE BOTTOM STICKY BAR -->
		<div class="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-100 p-4 sm:p-6 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] translate-y-0 animate-slide-up-mobile">
			<div class="flex items-center justify-between gap-4">
				<div class="flex flex-col">
					<div class="flex items-center gap-2">
						<span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ưu đãi còn:</span>
						<span class="text-[10px] font-black text-red-600 uppercase tracking-widest">{{ promotion.remainingSlots || 0 }} suất</span>
					</div>
					<div class="text-xl font-black text-gray-950 tracking-tighter">03:12:45</div>
				</div>
				<button class="flex-1 h-14 bg-red-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-600/20 active:scale-95">
					Nhận ưu đãi
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
@keyframes slide-up-mobile {
	from { transform: translateY(100%); }
	to { transform: translateY(0); }
}

.animate-slide-up-mobile {
	animation: slide-up-mobile 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
