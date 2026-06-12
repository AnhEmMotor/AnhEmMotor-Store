<script setup>
defineProps({
	item: {
		type: Object,
		required: true,
	},
	index: {
		type: Number,
		required: true,
	},
});
</script>

<template>
	<div class="bg-white p-8 rounded-[28px] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col min-h-[240px]">
		<div class="w-[52px] h-[52px] bg-red-50 text-red-600 rounded-[14px] flex items-center justify-center text-2xl mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 flex-shrink-0">
			<span v-if="index === 0">🏍️</span>
			<span v-else-if="index === 1">🔧</span>
			<span v-else-if="index === 2">📄</span>
			<span v-else-if="index === 3">💳</span>
			<span v-else>✨</span>
		</div>
		<div class="flex-grow">
			<h3 class="text-xl font-bold mb-3 text-gray-900">{{ item.label }}</h3>
			<p class="text-gray-500 leading-relaxed text-sm md:text-base">{{ item.desc }}</p>
		</div>
	</div>
</template>
