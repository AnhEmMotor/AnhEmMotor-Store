<script setup>
defineProps({
	relatedNews: {
		type: Array,
		required: true,
	},
	title: {
		type: String,
		default: "Tin Mới Nhất",
	},
});
</script>

<template>
	<aside class="space-y-12 font-['Manrope']">
		<!-- Section Container -->
		<div class="space-y-8">
			<!-- Sidebar Header with Sleek Accent Line -->
			<div class="border-b border-gray-100 pb-4">
				<h2
					class="text-xl font-black text-gray-950 uppercase tracking-tighter flex items-center gap-3"
				>
					<span class="w-1.5 h-6 bg-red-600 rounded-full" />
					{{ title }}
				</h2>
			</div>

			<!-- Related News List -->
			<div class="space-y-6">
				<NuxtLink
					v-for="newsItem in relatedNews"
					:key="newsItem.id"
					:to="`/news/${newsItem.slug}`"
					class="group flex gap-4 p-3 bg-white hover:bg-gray-50/50 rounded-2xl border border-gray-100/80 hover:border-red-100 hover:shadow-[0_15px_30px_rgba(230,0,35,0.04)] transition-all duration-500"
				>
					<!-- Thumbnail -->
					<div
						class="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100"
					>
						<img
							:src="newsItem.image"
							:alt="newsItem.title"
							class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
						/>
					</div>

					<!-- Details -->
					<div class="flex flex-col justify-between py-1 flex-1">
						<div class="space-y-1">
							<!-- Metadata -->
							<div class="flex items-center gap-2">
								<span
									class="text-[9px] font-black text-red-600 uppercase tracking-wider"
								>
									{{
										newsItem.category?.name || newsItem.category || "Sự kiện"
									}}
								</span>
								<span class="text-[9px] font-bold text-gray-400">•</span>
								<span
									class="text-[9px] font-black text-gray-400 uppercase tracking-wider"
								>
									{{ newsItem.date || "Mới nhất" }}
								</span>
							</div>

							<!-- Title -->
							<h3
								class="font-black text-xs uppercase tracking-tight text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight"
							>
								{{ newsItem.title }}
							</h3>
						</div>

						<!-- Micro link action -->
						<span
							class="text-[8px] font-black uppercase tracking-widest text-gray-400 group-hover:text-red-600 transition-colors flex items-center gap-1.5 pt-1"
						>
							Đọc ngay
							<Icon
								name="ph:arrow-right-bold"
								class="text-[10px] group-hover:translate-x-1 transition-transform"
							/>
						</span>
					</div>
				</NuxtLink>
			</div>
		</div>
	</aside>
</template>
