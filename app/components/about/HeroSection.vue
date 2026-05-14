<script setup>
defineProps({
	data: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<section class="relative min-h-[620px] flex items-center overflow-hidden">
		<!-- Background Image with Overlay -->
		<div class="absolute inset-0 z-0">
			<img
				src="/images/about/hero-showroom.png"
				alt="AnhEm Motor Showroom"
				class="w-full h-full object-cover"
			>
			<div class="absolute inset-0 bg-black/60" />
		</div>

		<div class="container mx-auto px-6 md:px-12 relative z-10 text-white">
			<div class="max-w-3xl">
				<h1 class="text-5xl md:text-[64px] font-[800] mb-6 tracking-tight leading-[1] uppercase">
					ANHEM MOTOR
				</h1>
				<p class="text-xl md:text-2xl font-bold mb-8 text-red-500 tracking-wide">
					Đồng hành cùng bạn trên mọi hành trình
				</p>
				<p class="text-lg md:text-xl mb-10 text-gray-200 max-w-xl leading-relaxed opacity-90">
					Cửa hàng xe máy chuyên cung cấp xe chính hãng, dịch vụ bảo dưỡng và hỗ trợ tận tâm. Chúng tôi không chỉ bán xe, chúng tôi xây dựng niềm tin thương hiệu.
				</p>
				<div class="flex flex-wrap gap-5">
					<NuxtLink
						to="/products"
						class="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-[14px] font-extrabold transition-all transform hover:scale-105 shadow-xl shadow-red-900/20"
					>
						Khám phá cửa hàng
					</NuxtLink>
					<NuxtLink
						to="/support"
						class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-[14px] font-extrabold transition-all"
					>
						Liên hệ tư vấn
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>
</template>

