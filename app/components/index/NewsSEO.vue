<script setup>
import { NEWS_ITEMS } from "@/constants/news.constant";
import BaseSectionHeader from "@/components/ui/BaseSectionHeader.vue";
import NewsCard from "@/components/ui/NewsCard.vue";
import YoutubeReview from "@/components/ui/YoutubeReview.vue";
</script>

<template>
	<section class="py-20 container mx-auto px-4">
		<BaseSectionHeader
			title="Tin tức &"
			highlight-text="Kiến thức"
			description="Cập nhật những xu hướng, kinh nghiệm xe máy mới nhất được biên soạn bởi các chuyên gia tại AnhEm Motor."
			link-text="Xem Tất Cả Bài Viết"
			link-to="/news"
		/>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
			<div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
				<NewsCard v-for="news in NEWS_ITEMS" :key="news.title" :news="news" />
			</div>

			<div class="space-y-8">
				<YoutubeReview />
			</div>
		</div>
	</section>
</template>
