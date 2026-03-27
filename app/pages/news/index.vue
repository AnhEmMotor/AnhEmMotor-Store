<script setup>
import { useNewsStore } from "@/stores/news.store";
import { newsService } from "@/services/news.service";
import { usePaginatedQuery } from "@/composables/usePaginatedQuery";

useSeoMeta({
	title: "Tin Tức, Sự Kiện | AnhEm Motor",
	description:
		"Cập nhật tin tức mới nhất về xe máy, sự kiện và chương trình ưu đãi từ AnhEm Motor.",
});

const newsStore = useNewsStore();

// 1. Featured News (Fetch via Store)
await useAsyncData("featured-news", () => newsStore.fetchFeaturedNews());

// 2. All News (Fetch via usePaginatedQuery)
const {
	data: allNews,
	pagination,
	isLoading,
} = usePaginatedQuery({
	queryKey: ["news-list"],
	queryFn: (params) => newsService.getAllNews(params),
	itemsPerPage: 5,
	useLocalPagination: false, // Đồng bộ với URL ?page=x
});
</script>

<template>
	<div class="bg-white min-h-screen">
		<NewsBanner />
		<main class="pt-12 md:pt-16 pb-12">
			<!-- Featured News Section -->
			<section
				v-if="newsStore.featuredNews.length"
				class="container mx-auto px-4 mb-12 md:mb-16"
			>
				<h2
					class="text-3xl md:text-4xl font-extrabold text-center text-primary-red mb-8 md:mb-12 border-b-2 border-primary-light pb-4"
				>
					NỔI BẬT TRONG TUẦN
				</h2>
				<div
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
				>
					<div
						v-for="(news, index) in newsStore.featuredNews"
						:key="news.id"
						class="animate-fade-in-up"
						:style="{ animationDelay: `${index * 100}ms` }"
					>
						<NewsCard :news="news" />
					</div>
				</div>
			</section>

			<!-- All News Section -->
			<section class="container mx-auto px-4">
				<h2
					class="text-3xl md:text-4xl font-extrabold text-center text-primary-red mb-8 md:mb-12 border-b-2 border-primary-light pb-4"
				>
					TẤT CẢ TIN TỨC
				</h2>

				<div v-if="isLoading" class="flex justify-center py-12">
					<Icon
						name="fa6-solid:circle-notch"
						class="text-4xl animate-spin text-primary-red"
					/>
				</div>

				<template v-else>
					<div class="space-y-6">
						<div
							v-for="(news, index) in allNews"
							:key="news.id"
							class="animate-fade-in-up"
							:style="{ animationDelay: `${index * 100}ms` }"
						>
							<NewsCardHorizontal :news="news" />
						</div>
					</div>

					<UiBasePagination
						v-if="pagination.totalPages > 1"
						:current-page="pagination.currentPage"
						:total-pages="pagination.totalPages"
						@page-change="pagination.goToPage"
					/>
				</template>
			</section>
		</main>
	</div>
</template>

<style scoped>
@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-in-up {
	animation: fadeInUp 0.8s ease-out forwards;
	opacity: 0;
}
</style>
