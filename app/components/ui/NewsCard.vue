<script setup>
defineProps({
	news: {
		type: Object,
		required: true,
	},
	featured: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<NuxtLink
		:to="`/news/${news.slug}`"
		class="group flex flex-col h-full transition-all"
	>
		<div class="relative overflow-hidden mb-4">
			<img
				:src="news.image"
				:alt="news.title"
				class="w-full aspect-[16/10] md:aspect-[3/2] object-cover transform group-hover:scale-105 transition-transform duration-700"
			>
		</div>

		<div class="flex flex-col flex-1 px-1">
			<span class="text-xs md:text-sm text-gray-500 font-medium mb-2">
				{{ news.date || new Date(news.createdAt).toLocaleDateString("vi-VN") }}
			</span>

			<h3 class="text-base md:text-lg font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
				{{ news.title }}
			</h3>
		</div>
	</NuxtLink>
</template>
