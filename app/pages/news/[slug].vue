<script setup>
import { useNewsStore } from "@/stores/news.store";

const route = useRoute();
const newsStore = useNewsStore();

const { data: news } = await useAsyncData(
	`news-detail-${route.params.slug}`,
	async () => {
		return await newsStore.fetchNewsBySlug(route.params.slug);
	},
	{
		watch: [() => route.params.slug],
	},
);

watchEffect(() => {
	if (news.value) {
		useSeoMeta({
			title: `${news.value.title} | AnhEm Motor`,
			description: news.value.excerpt ?? "Tin tức mới nhất từ AnhEm Motor.",
		});
	}
});

watch(
	() => route.params.slug,
	() => {
		if (import.meta.client) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	},
);
</script>

<template>
	<div class="bg-white min-h-screen">
		<div v-if="news" class="pt-20 lg:pt-24">
			<main class="container mx-auto px-4 py-8 md:py-12">
				<div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
					<article class="flex-1 lg:w-2/3">
						<h1
							class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark-text mb-4 leading-tight"
						>
							{{ news.title }}
						</h1>
						<div
							class="flex items-center space-x-4 text-sm text-gray-600 mb-6 border-b border-gray-200 pb-4"
						>
							<span class="text-primary-red font-bold uppercase">{{
								news.category
							}}</span>
							<span class="text-gray-400">|</span>
							<span
								><Icon name="fa6-regular:clock" class="mr-1" />{{
									news.date
								}}</span
							>
						</div>
						<img
							:src="news.image"
							:alt="news.title"
							class="w-full rounded-xl shadow-lg mb-8 object-cover max-h-[500px]"
						>
						<div
							class="prose prose-lg max-w-none text-gray-800 leading-relaxed"
						>
							<div v-html="news.content" />
						</div>
						<div class="mt-10 pt-6 border-t border-gray-200">
							<h3 class="text-lg font-bold mb-4">Chia sẻ bài viết</h3>
							<div class="flex space-x-3">
								<button
									class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
									aria-label="Chia sẻ bài viết này lên Facebook"
								>
									<Icon name="fa6-brands:facebook-f" class="mr-2" />Facebook
								</button>
								<button
									class="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
									aria-label="Chia sẻ bài viết này lên Twitter"
								>
									<Icon name="fa6-brands:x-twitter" class="mr-2" />Twitter
								</button>
								<button
									class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
									aria-label="Sao chép liên kết bài viết này"
								>
									<Icon name="fa6-solid:link" class="mr-2" />Copy Link
								</button>
							</div>
						</div>
					</article>
					<aside class="lg:w-1/3">
						<NewsSidebar :related-news="news.related" />
					</aside>
				</div>
			</main>
		</div>
		<div v-else class="container mx-auto px-4 py-20 text-center">
			<Icon
				name="fa6-solid:triangle-exclamation"
				class="text-6xl text-gray-400 mb-4"
			/>
			<h2 class="text-2xl font-bold text-gray-800 mb-4">
				Không tìm thấy tin tức
			</h2>
			<NuxtLink to="/news" class="text-primary-red hover:underline"
				>← Quay lại trang tin tức</NuxtLink
			>
		</div>
	</div>
</template>

<style scoped>
.prose {
	font-size: 1.125rem;
	line-height: 1.75;
}

.prose :deep(p) {
	margin-bottom: 1.25rem;
	text-align: justify;
}

.prose :deep(img) {
	width: 100%;
	margin: 1.5rem 0;
	border-radius: 0.5rem;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.prose :deep(strong) {
	font-weight: 700;
	color: #1f2937;
}
</style>
