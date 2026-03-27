<script setup>
defineProps({
	data: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="py-8 sm:py-12 md:py-16">
		<h2
			class="text-2xl sm:text-3xl md:text-4xl text-center mb-8 font-bold text-red-500"
		>
			{{ data.title }}
		</h2>
		<p class="mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg">
			<template v-for="(item, index) in data.list" :key="index">
				✅ {{ item }} <br >
			</template>
		</p>
	</div>
</template>
