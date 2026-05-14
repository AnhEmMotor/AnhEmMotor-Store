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
	<div
		class="group cursor-pointer bg-white rounded-24 overflow-hidden border border-slate-100 hover:shadow-elevated transition-all flex flex-col"
		:class="{ 'md:flex-row md:col-span-2': featured }"
	>
		<div
			class="overflow-hidden relative"
			:class="featured ? 'w-full md:w-1/2 aspect-video md:aspect-auto' : 'h-56 w-full'"
		>
			<img
				:src="news.image"
				class="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
				:alt="news.title"
			>
			<div
				v-if="news.category"
				class="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] uppercase font-bold rounded-full shadow-sm"
			>
				{{ news.category }}
			</div>
		</div>
		<div
			class="p-6 md:p-8 flex flex-col justify-center space-y-4 flex-1"
		>
			<div
				class="text-[10px] text-slate-400 font-bold tracking-widest flex items-center gap-2"
			>
				<Icon name="ph:calendar-blank-bold" />
				{{ news.date }}
			</div>
			<h3
				class="font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2"
				:class="featured ? 'text-2xl md:text-3xl' : 'text-lg'"
			>
				{{ news.title }}
			</h3>
			<p class="text-sm text-slate-500 line-clamp-2 font-medium leading-relaxed">
				{{ news.excerpt }}
			</p>
			
			<div v-if="featured" class="pt-2 flex items-center text-primary font-bold text-sm gap-2">
				<span>Đọc tiếp</span>
				<Icon name="ph:arrow-right-bold" />
			</div>
		</div>
	</div>
</template>
