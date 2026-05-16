<script setup>
defineProps({
	data: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<section class="py-16 bg-gray-900 text-white overflow-hidden relative">
		<!-- Decorative circles with subtle pulse -->
		<div class="absolute -top-24 -left-24 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse-slow" />
		<div class="absolute -bottom-24 -right-24 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 2s;" />

		<div class="max-w-7xl mx-auto px-6 relative z-10">
			<h2 class="text-3xl md:text-5xl font-black text-center mb-10 text-white uppercase tracking-tight">
				{{ data.title }}
			</h2>
			
			<div class="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center mb-8">
				<AboutStatItem value="10+" label="Năm kinh nghiệm" class="reveal-stat" />
				<AboutStatItem value="1000+" label="Khách hàng phục vụ" class="reveal-stat reveal-delay-1" />
				<AboutStatItem value="98%" label="Khách hàng hài lòng" class="reveal-stat reveal-delay-2" />
				<AboutStatItem value="100%" label="Xe rõ nguồn gốc" class="reveal-stat reveal-delay-3" />
			</div>


			<!-- Why Choose Us List Items -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
				<div 
					v-for="(item, index) in data.items" 
					:key="index"
					class="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
				>
					<div class="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
						<Icon name="lucide:check" class="text-white text-sm" />
					</div>
					<p class="text-gray-300 leading-relaxed" :class="{ 'font-bold text-white': item.isStrong }">
						{{ item.text }}
					</p>
				</div>
			</div>

			<!-- Integrated CTA Banner -->
			<div class="max-w-5xl mx-auto bg-gradient-to-r from-red-600 to-red-700 rounded-[28px] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden group hover:shadow-red-600/20 transition-shadow duration-500">
				<div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
				<div class="relative z-10">
					<h3 class="text-3xl md:text-4xl font-black mb-6">Bạn cần tư vấn chọn xe ngay?</h3>
					<p class="text-red-100 mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
						Đội ngũ chuyên gia của AnhEm Motor luôn sẵn sàng hỗ trợ bạn tìm kiếm chiếc xe ưng ý nhất.
					</p>
					<div class="flex flex-wrap justify-center gap-6">
						<a 
							href="tel:0901234567" 
							class="bg-white text-red-600 px-10 py-4 rounded-[14px] font-black text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
						>
							📞 Gọi ngay: 0901.234.567
						</a>
						<NuxtLink 
							to="/support" 
							class="bg-black/30 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-[14px] font-black text-lg hover:bg-black/40 transition-all"
						>
							📍 Tìm cửa hàng
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
@keyframes pulse-slow {
	0%, 100% { opacity: 0.5; transform: scale(1); }
	50% { opacity: 0.8; transform: scale(1.1); }
}

.animate-pulse-slow {
	animation: pulse-slow 8s ease-in-out infinite;
}

.reveal-stat {
	opacity: 0;
	transform: scale(0.9);
	transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

:deep(.active) .reveal-stat {
	opacity: 1;
	transform: scale(1);
}

.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
</style>



