<script setup>
defineProps({
	data: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="py-8 sm:py-12 md:py-16 mb-6 sm:mb-10">
		<h2 class="text-3xl md:text-4xl text-center mb-8 font-bold text-red-500">
			{{ data.title }}
		</h2>
		<p class="mb-4 sm:mb-6 leading-relaxed">
			{{ data.description }}
		</p>
		<p class="text-sm sm:text-base">
			<strong>Hotline:</strong> {{ data.hotline }} | <strong>Email:</strong>
			{{ data.email }}
		</p>
	</div>
</template>
