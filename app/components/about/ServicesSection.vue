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
		<ul
			class="list-disc ml-4 sm:ml-5 mb-6 sm:mb-8 space-y-2 sm:space-y-2.5 text-base sm:text-lg"
		>
			<li v-for="(item, index) in data.items" :key="index">
				<strong>{{ item.label }}</strong> {{ item.desc }}
			</li>
		</ul>
	</div>
</template>
