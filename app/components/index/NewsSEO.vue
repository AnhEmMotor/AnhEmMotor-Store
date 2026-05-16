<script setup>

import BaseSectionHeader from "../ui/BaseSectionHeader.vue";
import NewsCard from "../ui/NewsCard.vue";
import YoutubeReview from "../ui/YoutubeReview.vue";

const newsStore = useNewsStore();
</script>

<template>
	<section class="py-24 container mx-auto px-6">
		<div class="flex flex-col md:flex-row justify-between items-end gap-10 mb-16">
			<div class="space-y-4 max-w-2xl">
				<div class="text-primary font-bold uppercase tracking-widest text-sm">Tin tức & Sự kiện</div>
				<h2 class="text-4xl md:text-5xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-tight">
					Kinh nghiệm & <br />
					<span class="text-primary">Kiến thức xe máy</span>
				</h2>
				<p class="text-slate-500 text-lg font-medium">
					Cập nhật những xu hướng, kinh nghiệm xe máy mới nhất từ các chuyên gia.
				</p>
			</div>
			
			<NuxtLink
				to="/news"
				class="group flex items-center gap-2 text-slate-900 font-bold hover:text-primary transition-colors pb-2 border-b-2 border-slate-100 hover:border-primary"
			>
				Xem tất cả bài viết
				<Icon name="ph:arrow-right-bold" class="transition-transform group-hover:translate-x-1" />
			</NuxtLink>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
			<div class="lg:col-span-8 space-y-8">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<NewsCard
						v-if="newsStore.featuredNews && newsStore.featuredNews.length > 0"
						:news="newsStore.featuredNews[0]"
						featured
					/>
					<NewsCard
						v-for="news in newsStore.featuredNews.slice(1, 3)"
						:key="news.id"
						:news="news"
					/>
				</div>
			</div>

			<div class="lg:col-span-4">
				<div class="h-full p-8 bg-slate-900 rounded-24 text-white space-y-8 relative overflow-hidden flex flex-col justify-between">
					<div class="relative z-10 space-y-4">
						<div class="flex items-center gap-2 text-red-500 font-bold text-sm">
							<Icon name="ph:youtube-logo-fill" class="text-xl" />
							<span>VIDEO REVIEW</span>
						</div>
						<h3 class="text-2xl md:text-3xl font-bold leading-tight">Đánh giá xe thực tế cùng chuyên gia</h3>
						<p class="text-white/60 text-base leading-relaxed">Theo dõi kênh Youtube của AnhEm Motor để không bỏ lỡ những bản tin đánh giá xe mới nhất.</p>
					</div>
					<div class="relative z-10">
                        <YoutubeReview />
                    </div>
                    <!-- Subtle decoration -->
                    <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
				</div>
			</div>
		</div>
	</section>
</template>

