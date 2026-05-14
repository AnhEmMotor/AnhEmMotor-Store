<script setup>
defineProps({
	data: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<section class="py-24 bg-gray-900 text-white overflow-hidden relative">
		<!-- Decorative circles -->
		<div class="absolute -top-24 -left-24 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
		<div class="absolute -bottom-24 -right-24 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />

		<div class="max-w-7xl mx-auto px-6 relative z-10">
			<h2 class="text-3xl md:text-5xl font-black text-center mb-20 text-white uppercase tracking-tight">
				{{ data.title }}
			</h2>
			
			<div class="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center mb-24">
				<AboutStatItem value="10+" label="Năm kinh nghiệm" />
				<AboutStatItem value="1000+" label="Khách hàng phục vụ" />
				<AboutStatItem value="98%" label="Khách hàng hài lòng" />
				<AboutStatItem value="100%" label="Xe rõ nguồn gốc" />
			</div>


			<!-- Integrated CTA Banner -->
			<div class="max-w-5xl mx-auto bg-gradient-to-r from-red-600 to-red-700 rounded-[28px] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden group">
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


