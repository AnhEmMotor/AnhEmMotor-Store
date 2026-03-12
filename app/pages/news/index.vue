<script setup>
import { ref, computed, onMounted } from "vue";
import { getFeaturedNews, getAllNews } from "~/data/newsData";

useSeoMeta({
	title: "Tin Tức, Sự Kiện | AnhEm Motor",
	description:
		"Cập nhật tin tức mới nhất về xe máy, sự kiện và chương trình ưu đãi từ AnhEm Motor.",
});

const featuredNews = ref([]);
const allNews = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;

const totalPages = computed(() =>
	Math.ceil(allNews.value.length / itemsPerPage),
);

const paginatedNews = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	return allNews.value.slice(start, start + itemsPerPage);
});

const handlePageChange = (page) => {
	currentPage.value = page;
	window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
	featuredNews.value = getFeaturedNews();
	allNews.value = getAllNews();
});
</script>

<template>
	<div class="bg-white min-h-screen">
		<NewsBanner />
		<main class="pt-12 md:pt-16 pb-12">
			<section class="container mx-auto px-4 mb-12 md:mb-16">
				<h2
					class="text-3xl md:text-4xl font-extrabold text-center text-primary-red mb-8 md:mb-12 border-b-2 border-primary-light pb-4"
				>
					NỔI BẬT TRONG TUẦN
				</h2>
				<div
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
				>
					<div
						v-for="(news, index) in featuredNews"
						:key="news.id"
						class="animate-fade-in-up"
						:style="{ animationDelay: `${index * 100}ms` }"
					>
						<NewsCard :news="news" />
					</div>
				</div>
			</section>

			<section class="container mx-auto px-4">
				<h2
					class="text-3xl md:text-4xl font-extrabold text-center text-primary-red mb-8 md:mb-12 border-b-2 border-primary-light pb-4"
				>
					TẤT CẢ TIN TỨC
				</h2>
				<div class="space-y-6">
					<div
						v-for="(news, index) in paginatedNews"
						:key="news.id"
						class="animate-fade-in-up"
						:style="{ animationDelay: `${index * 100}ms` }"
					>
						<NewsCardHorizontal :news="news" />
					</div>
				</div>
				<UiBasePagination
					:current-page="currentPage"
					:total-pages="totalPages"
					@page-change="handlePageChange"
				/>
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

