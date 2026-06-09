<script setup>
defineProps({
	news: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<NuxtLink
		:to="`/news/${news.slug}`"
		class="group flex flex-col bg-white rounded-[2rem] border border-gray-100 hover:border-red-100 hover:shadow-[0_20px_50px_rgba(230,0,35,0.08)] transition-all duration-700 h-full overflow-hidden"
	>
		<!-- Image Container -->
		<div class="relative aspect-[16/10] overflow-hidden bg-gray-50">
			<img
				:src="news.image"
				:alt="news.title"
				class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
			/>

			<!-- Badges -->
			<div class="absolute top-4 left-4 flex flex-col gap-2">
				<div class="flex items-center gap-2">
					<span
						v-if="news.isHot"
						class="px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-red-600/30 animate-pulse"
					>
						TIN NỔI BẬT
					</span>
					<span
						class="px-4 py-1.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg"
					>
						{{ news.category?.name || news.category || "Tin tức" }}
					</span>
				</div>
			</div>
		</div>

		<!-- Content -->
		<div class="p-4 md:p-8 flex flex-col flex-1">
			<!-- Date Metadata -->
			<div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
				<div
					class="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-red-50 transition-colors"
				>
					<Icon
						name="ph:calendar-blank-fill"
						class="text-xs md:text-base text-gray-400 group-hover:text-red-500 transition-colors"
					/>
				</div>
				<span
					class="text-[9px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest"
				>
					{{
						news.date ||
						(news.createdAt
							? new Date(news.createdAt).toLocaleDateString("vi-VN")
							: "Mới nhất")
					}}
				</span>
			</div>

			<!-- Title -->
			<h3
				class="text-base md:text-xl font-black text-gray-900 uppercase tracking-tight leading-tight mb-2 md:mb-4 group-hover:text-red-600 transition-colors line-clamp-2"
			>
				{{ news.title }}
			</h3>

			<!-- Excerpt -->
			<p
				class="hidden md:block text-gray-500 text-sm font-medium leading-relaxed mb-8 line-clamp-2 italic border-l-2 border-gray-100 pl-4"
			>
				{{ news.excerpt || news.shortDescription || news.description }}
			</p>

			<!-- CTA Section -->
			<div
				class="mt-auto pt-3 md:pt-6 border-gray-50 flex items-center justify-between"
			>
				<div class="flex flex-col" />
				<div
					class="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-500 group-hover:rotate-12"
				>
					<Icon name="ph:arrow-up-right-bold" class="text-base md:text-xl" />
				</div>
			</div>
		</div>
	</NuxtLink>
</template>
