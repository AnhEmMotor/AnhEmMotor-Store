<script setup>
defineProps({
	data: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<section class="py-16 md:py-24 bg-white">
		<div class="max-w-5xl mx-auto px-4">
			<div class="bg-red-600 rounded-[3rem] p-8 md:p-16 text-center text-white shadow-2xl shadow-red-200 relative overflow-hidden">
				<!-- Decorative elements -->
				<div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
				<div class="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-32 -mb-32" />

				<h2 class="text-3xl md:text-5xl font-black mb-6 relative z-10">
					{{ data.title }}
				</h2>
				<p class="text-xl text-red-100 mb-12 max-w-2xl mx-auto relative z-10">
					{{ data.description }}
				</p>
				
				<div class="flex flex-wrap justify-center gap-6 relative z-10">
					<a 
						href="tel:0901234567" 
						class="bg-white text-red-600 px-10 py-4 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
					>
						📞 Gọi ngay: {{ data.hotline }}
					</a>
					<NuxtLink 
						to="/support" 
						class="bg-black/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-2xl font-black text-lg hover:bg-black/30 transition-all"
					>
						📍 Đến cửa hàng
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>
</template>
