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
		class="group flex flex-col bg-white rounded-[2rem] border border-gray-100 hover:border-red-100 hover:shadow-[0_20px_50px_rgba(230,0,35,0.08)] transition-all duration-700 h-full overflow-hidden"
	>
		<!-- Image Container -->
		<div class="relative aspect-[16/10] overflow-hidden">
			<img
				:src="news.image"
				:alt="news.title"
				class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
			>
			
			<!-- Category Badge -->
			<div class="absolute top-4 left-4">
				<span class="px-4 py-1.5 bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg transition-colors group-hover:bg-red-600">
					{{ news.category?.name || news.category || 'Tin Tức' }}
				</span>
			</div>
		</div>

		<!-- Content -->
		<div class="p-6 md:p-8 flex flex-col flex-1">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
					<Icon name="ph:calendar-blank-fill" class="text-xs text-gray-400 group-hover:text-red-500 transition-colors" />
				</div>
				<span class="text-[9px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">
					{{ news.date || new Date(news.createdAt).toLocaleDateString('vi-VN') }}
				</span>
			</div>

			<h3 class="text-base md:text-xl font-black text-gray-900 uppercase tracking-tight leading-tight mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
				{{ news.title }}
			</h3>

			<p class="text-gray-500 text-sm font-medium leading-relaxed mb-8 line-clamp-2 italic border-l-2 border-gray-100 pl-4 group-hover:border-red-600/30 transition-colors">
				{{ news.excerpt || news.shortDescription || news.description }}
			</p>

			<!-- CTA Section -->
			<div class="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
				<div class="flex flex-col">
					<span class="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Chi tiết</span>
					<span class="text-sm font-black text-gray-900 uppercase tracking-tighter group-hover:text-red-600 transition-colors">Đọc bài viết</span>
				</div>
				<div class="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-500 group-hover:rotate-12">
					<Icon name="ph:arrow-up-right-bold" class="text-base md:text-xl" />
				</div>
			</div>
		</div>
	</NuxtLink>
</template>
