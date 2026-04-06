<script setup>
defineProps({
	news: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div
		class="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-red-500/30 hover:shadow-xl transition-all"
	>
		<div class="h-48 overflow-hidden relative">
			<img
				:src="news.image"
				class="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
				:alt="news.title"
			>
			<span
				class="absolute top-4 left-4 px-3 py-1 bg-white text-gray-900 text-[10px] uppercase font-black rounded-lg shadow-sm"
			>
				{{ news.category }}
			</span>
		</div>
		<div class="p-6 space-y-4">
			<div
				class="text-[10px] text-gray-400 font-bold tracking-widest flex items-center gap-2"
			>
				<Icon name="fa6-solid:calendar-days" />
				{{ news.date }}
			</div>
			<h3
				class="font-bold text-lg leading-tight line-clamp-2 group-hover:text-red-600 transition-colors"
			>
				{{ news.title }}
			</h3>
			<p class="text-[12px] text-gray-500 line-clamp-2 italic leading-relaxed">
				{{ news.excerpt }}
			</p>
		</div>
	</div>
</template>
