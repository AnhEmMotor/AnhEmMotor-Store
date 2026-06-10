<script setup>
import { useQuery } from "@tanstack/vue-query";
import { toast } from "vue3-toastify";

const route = useRoute();
const newsStore = useNewsStore();

const { data: news, suspense } = useQuery({
	queryKey: ["news-detail", () => route.params.slug],
	queryFn: () => newsStore.fetchNewsBySlug(route.params.slug),
});

const { data: latestNews, suspense: suspenseLatest } = useQuery({
	queryKey: ["latest-news"],
	queryFn: () => newsStore.fetchLatestNews(),
});

await Promise.all([suspense(), suspenseLatest()]);

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

const shareOnFacebook = () => {
	if (import.meta.client) {
		window.open(
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
			"_blank",
		);
	}
};

const copyLink = () => {
	if (import.meta.client) {
		navigator.clipboard.writeText(window.location.href);
		toast.success("Đã sao chép liên kết bài viết!", { position: "bottom-right" });
	}
};
</script>

<template>
	<div class="bg-white min-h-screen pb-24 font-['Manrope']">
		<div v-if="news">
			<!-- [1] IMMERSIVE HERO LANDING SECTION -->
			<section
				class="relative min-h-[500px] md:min-h-[600px] flex items-end overflow-hidden text-white"
			>
				<!-- High-quality Immersive Backdrop -->
				<div class="absolute inset-0 z-0">
					<img
						v-if="news.image"
						:src="news.image"
						class="w-full h-full object-cover"
						:alt="news.title"
					>
					<!-- Lớp phủ mờ để đảm bảo chữ màu trắng dễ đọc -->
					<div class="absolute inset-0 bg-black/40" />
				</div>

				<!-- Content Area -->
				<div class="container mx-auto px-6 relative z-10 py-16 md:py-24">
					<div class="max-w-5xl space-y-8">
						<!-- Category & Status Badge -->
						<div class="flex flex-wrap items-center gap-4 animate-fade-in">
							<span
								class="px-5 py-1.5 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest"
							>
								{{ news.category }}
							</span>
						</div>

						<!-- Headline Title -->
						<div class="space-y-6 animate-slide-up">
							<h1
								class="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.1]"
							>
								{{ news.title }}
							</h1>
						</div>

						<!-- Metadata & Sharing Row -->
						<div
							class="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 animate-slide-up delay-200"
						>
							<div class="flex items-center gap-6 text-xs">
								<div class="flex items-center gap-2">
									<Icon
										name="ph:calendar-blank-fill"
										class="text-red-500 text-base"
									/>
									<span class="font-black uppercase tracking-wider">{{
										news.publishedDate
									}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- [2] MAIN CONTENT & SIDEBAR GRID -->
			<main class="container mx-auto px-6 mt-4 md:mt-12">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
					<!-- LEFT COLUMN: ARTICLE BODY -->
					<article class="lg:col-span-8 space-y-16">
						<!-- Custom Rich Text Renderer (Tailwind CSS Typography matching) -->
						<div
							class="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-gray-950 prose-p:text-gray-600 prose-p:leading-relaxed font-sans"
							v-html="news.content"
						/>

						<!-- Linked Products Section -->
						<div
							v-if="news.linkedProducts && news.linkedProducts.length"
							class="pt-10 border-t border-gray-100 space-y-6"
						>
							<h3
								class="text-xl font-black uppercase tracking-tight text-gray-950"
							>
								Sản phẩm được nhắc đến
							</h3>
							<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<NuxtLink
									v-for="product in news.linkedProducts"
									:key="product.urlSlug"
									:to="`/product/${product.urlSlug}`"
									class="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:border-red-600/30 transition-all group"
								>
									<img
										:src="product.imageUrl"
										:alt="product.variantName"
										class="w-20 h-20 object-cover rounded-xl bg-gray-50 group-hover:scale-105 transition-transform"
									>
									<div>
										<h4
											class="font-black text-sm text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2"
										>
											{{ product.variantName }}
										</h4>
										<p
											v-if="product.colorName"
											class="text-xs font-medium text-gray-500 mt-1"
										>
											Màu: {{ product.colorName }}
										</p>
									</div>
								</NuxtLink>
							</div>
						</div>

						<!-- Article Footer & Social Share Pill Block -->
						<div
							class="pt-10 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
						>
							<div class="space-y-1">
								<h4
									class="font-black text-xs uppercase tracking-widest text-gray-400"
								>
									Chia sẻ bài viết
								</h4>
								<p class="text-xs text-gray-500 font-medium">
									Lan tỏa thông tin hữu ích đến bạn bè của bạn.
								</p>
							</div>
							<div class="flex flex-wrap gap-3">
								<button
									class="inline-flex items-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-[10px] uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95"
									aria-label="Chia sẻ bài viết này lên Facebook"
									@click="shareOnFacebook"
								>
									<Icon name="ph:facebook-logo-fill" class="text-lg" />
									Facebook
								</button>
								<button
									class="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gray-950 hover:bg-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95"
									aria-label="Sao chép liên kết bài viết này"
									@click="copyLink"
								>
									<Icon name="ph:link-bold" class="text-lg" />
									Sao chép liên kết
								</button>
							</div>
						</div>
					</article>

					<!-- RIGHT COLUMN: SIDEBAR -->
					<aside class="lg:col-span-4">
						<div class="sticky top-28">
							<NewsSidebar :related-news="latestNews || []" />
						</div>
					</aside>
				</div>
			</main>
		</div>

		<!-- [3] EMPTY STATE (Article Not Found) -->
		<div v-else class="container mx-auto px-6 py-32 text-center max-w-md">
			<div
				class="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-dashed border-gray-200"
			>
				<Icon name="ph:warning-circle-fill" class="text-4xl text-gray-400" />
			</div>
			<h2
				class="text-2xl font-black text-gray-950 uppercase tracking-tight mb-2"
			>
				Không Tìm Thấy Tin Tức
			</h2>
			<p class="text-gray-400 text-sm font-medium mb-8">
				Bài viết bạn yêu cầu không tồn tại hoặc đã bị xóa khỏi hệ thống.
			</p>
			<NuxtLink
				to="/news"
				class="inline-flex items-center gap-3 px-8 py-4 bg-gray-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-colors shadow-xl"
			>
				<Icon name="ph:arrow-left-bold" />
				Quay lại trang tin tức
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped>
.animate-fade-in {
	animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
	animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-200 {
	animation-delay: 200ms;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes slideUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
