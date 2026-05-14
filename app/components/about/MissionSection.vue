<script setup>
defineProps({
	data: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<section class="py-16 md:py-20 bg-white">
		<div class="max-w-4xl mx-auto text-center px-6">
			<span class="text-red-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Sứ mệnh của chúng tôi</span>
			<h2 class="text-3xl md:text-5xl font-black mb-8 text-gray-900 leading-tight">
				{{ data.title }}
			</h2>
			<div class="h-1.5 w-16 bg-red-600 mx-auto mb-10 rounded-full" />
			<p class="text-lg md:text-xl text-gray-600 leading-relaxed font-medium max-w-[760px] mx-auto">
				{{ data.description }}
			</p>
		</div>
	</section>
</template>


