<script setup>
const route = useRoute();
const newsStore = useNewsStore();
const productStore = useProductStore();

const { data: news, pending: isLoading } = useAsyncData(
	`news-detail-${route.params.slug}`,
	async () => {
		const newsData = await newsStore.fetchNewsBySlug(route.params.slug);
		// Add view count placeholder (will come from backend)
		if (newsData) {
			newsData.views = 1250; // Placeholder
			newsData.readingTime = "5 phút đọc";
		}
		return newsData;
	},
	{
		watch: [() => route.params.slug],
	},
);

// Fetch related products
const { data: relatedProducts } = useAsyncData(
	`related-products-${route.params.slug}`,
	async () => {
		try {
			const products = await productStore.getProducts({
				limit: 4,
				isFeatured: true,
			});
			return products.items.slice(0, 4);
		} catch (error) {
			console.error('Failed to fetch related products:', error);
			return [];
		}
	}
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

const shareOnFacebook = () => {
	if (import.meta.client) {
		window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
	}
};

const shareOnZalo = () => {
	if (import.meta.client) {
		window.open('https://zalo.me/0123456789', '_blank');
	}
};

const shareOnMessenger = () => {
	if (import.meta.client) {
		window.open('https://m.me/anhemmotor', '_blank');
	}
};

const copyLink = () => {
	if (import.meta.client) {
		navigator.clipboard.writeText(window.location.href);
		alert("Đã sao chép liên kết bài viết!");
	}
};
</script>

<template>
	<div class="bg-white min-h-screen pb-24 font-['Manrope']">
		<div v-if="news">
			<!-- [1] BREADCRUMB NAVIGATION -->
			<div class="bg-gray-50 border-b border-gray-100">
				<div class="container mx-auto px-6 py-3">
					<nav class="flex items-center space-x-2 text-sm">
						<NuxtLink to="/" class="text-gray-500 hover:text-red-600 transition-colors font-medium">
							Trang chủ
						</NuxtLink>
						<Icon name="ph:caret-right" class="text-gray-400 text-xs" />
						<NuxtLink to="/news" class="text-gray-500 hover:text-red-600 transition-colors font-medium">
							Tin tức
						</NuxtLink>
						<Icon name="ph:caret-right" class="text-gray-400 text-xs" />
						<span class="text-gray-950 font-black uppercase tracking-wider text-xs">{{ news.category }}</span>
					</nav>
				</div>
			</div>

			<!-- [2] IMMERSIVE HERO LANDING SECTION -->
			<section class="relative min-h-[500px] md:min-h-[600px] flex items-end overflow-hidden bg-gray-950 text-white">
				<!-- High-quality Immersive Backdrop -->
				<div class="absolute inset-0 z-0">
					<img
						:src="news.image"
						class="w-full h-full object-cover opacity-35 scale-105 blur-[2px]"
						:alt="news.title"
					>
					<div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent"/>
					<div class="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-transparent to-transparent"/>
				</div>

				<!-- Content Area -->
				<div class="container mx-auto px-6 relative z-10 py-16 md:py-24">
					<div class="max-w-5xl space-y-8">
						<!-- Category & Status Badge -->
						<div class="flex flex-wrap items-center gap-4 animate-fade-in">
							<span class="px-5 py-1.5 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
								{{ news.category?.name || news.category || 'Tin tức' }}
							</span>
							<div class="px-5 py-1.5 bg-white/10 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-white/15">
								AnhEm Motor
							</div>
						</div>

						<!-- Headline Title -->
						<div class="space-y-6 animate-slide-up">
							<h1 class="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.1]">
								{{ news.title }}
							</h1>

							<!-- Subtitle Excerpt / Quote -->
							<p v-if="news.excerpt || news.shortDescription" class="text-lg md:text-xl text-gray-300 font-medium max-w-3xl leading-relaxed italic border-l-4 border-red-600 pl-8">
								"{{ news.excerpt || news.shortDescription }}"
							</p>
						</div>
					</div>
				</div>
			</section>

			<!-- [3] ARTICLE INFO SECTION -->
			<div class="bg-gray-50 border-b border-gray-100">
				<div class="container mx-auto px-6 py-6">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<div class="flex flex-wrap items-center gap-6">
							<div class="flex items-center gap-2">
								<Icon name="ph:user-fill" class="text-red-600 text-lg" />
								<span class="text-sm font-black uppercase tracking-wider text-gray-950">AnhEm Motor</span>
							</div>
							<div class="flex items-center gap-2">
								<Icon name="ph:calendar-blank-fill" class="text-red-600 text-lg" />
								<span class="text-sm font-black uppercase tracking-wider text-gray-950">{{ news.date || 'Gần đây' }}</span>
							</div>
							<div class="flex items-center gap-2">
								<Icon name="ph:clock-fill" class="text-red-600 text-lg" />
								<span class="text-sm font-black uppercase tracking-wider text-gray-950">{{ news.readingTime }}</span>
							</div>
							<div class="flex items-center gap-2">
								<Icon name="ph:eye-fill" class="text-red-600 text-lg" />
								<span class="text-sm font-black uppercase tracking-wider text-gray-950">{{ Number(news.views).toLocaleString('vi-VN') }} lượt xem</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- [4] MAIN CONTENT & SIDEBAR GRID -->
			<main class="container mx-auto px-6 mt-16 md:mt-24">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

					<!-- LEFT COLUMN: ARTICLE BODY -->
					<article class="lg:col-span-8 space-y-16">
						<!-- Main Image container in body -->
						<div class="rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 relative group aspect-video">
							<img
								:src="news.image"
								:alt="news.title"
								class="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-1000"
							>
						</div>

						<!-- Custom Rich Text Renderer (Tailwind CSS Typography matching) -->
						<div class="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-gray-950 prose-p:text-gray-600 prose-p:leading-relaxed font-sans">
							<NewsBlockRenderer :content="news.content" />
						</div>

						<!-- [7] CTA SECTION BEFORE RELATED CONTENT -->
						<div class="relative p-8 md:p-12 bg-gradient-to-br from-gray-950 to-gray-900 rounded-[2.5rem] overflow-hidden text-white shadow-2xl my-12">
							<!-- Decorative Elements -->
							<div class="absolute -top-16 -right-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"/>
							<div class="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"/>

							<div class="relative z-10">
								<div class="text-center max-w-2xl mx-auto space-y-6">
									<h3 class="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight">
										Bạn quan tâm {{ news.title }}?
									</h3>
									<p class="text-sm md:text-base font-medium leading-relaxed opacity-90">
										Nhận ngay báo giá mới nhất và ưu đãi trả góp lãi suất thấp dành riêng cho bạn.
									</p>
									<div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
										<a
											href="tel:0909123456"
											class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95"
										>
											<Icon name="ph:phone-fill" class="text-lg" />
											Nhận báo giá
										</a>
										<NuxtLink
											to="/test-ride"
											class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-950 hover:bg-gray-100 rounded-xl font-black text-sm uppercase tracking-widest transition-all"
										>
											<Icon name="ph:arrow-right-fill" class="text-lg" />
											Đăng ký lái thử
										</NuxtLink>
									</div>
								</div>
							</div>
						</div>

						<!-- [4] RELATED PRODUCTS SECTION -->
						<div v-if="relatedProducts && relatedProducts.length > 0" class="space-y-8 my-12">
							<div class="border-b border-gray-100 pb-4">
								<h2 class="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tighter flex items-center gap-3">
									<span class="w-2 h-8 bg-red-600 rounded-full"/>
									Xe liên quan
								</h2>
							</div>
							<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
								<ProductCard
									v-for="product in relatedProducts"
									:key="product.id"
									:product="product"
								/>
							</div>
						</div>

						<!-- [5] RELATED ARTICLES SECTION -->
						<div class="space-y-8 my-12">
							<div class="border-b border-gray-100 pb-4">
								<h2 class="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tighter flex items-center gap-3">
									<span class="w-2 h-8 bg-red-600 rounded-full"/>
									Bài viết liên quan
								</h2>
							</div>
							<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								<NewsCardHorizontal
									v-for="related in news.related.slice(0, 3)"
									:key="related.id"
									:news="related"
								/>
							</div>
							<div v-if="news.related.length === 0" class="text-center py-12 text-gray-400">
								<Icon name="ph:newspaper-clip" class="text-6xl mb-4 opacity-50" />
								<p class="font-black uppercase tracking-wider">Chưa có bài viết liên quan</p>
							</div>
						</div>

						<!-- Article Footer & Social Share Pill Block -->
						<div class="pt-10 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
							<div class="space-y-1">
								<h4 class="font-black text-xs uppercase tracking-widest text-gray-400">Chia sẻ bài viết</h4>
								<p class="text-xs text-gray-500 font-medium">Lan tỏa thông tin hữu ích đến bạn bè của bạn.</p>
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
									class="inline-flex items-center gap-2.5 px-6 py-3.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95"
									aria-label="Chia sẻ bài viết này qua Zalo"
									@click="shareOnZalo"
								>
									<Icon name="ph:chat-circle-dots-fill" class="text-lg" />
									Zalo
								</button>
								<button
									class="inline-flex items-center gap-2.5 px-6 py-3.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-black text-[10px] uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95"
									aria-label="Chia sẻ bài viết này qua Messenger"
									@click="shareOnMessenger"
								>
									<Icon name="ph:messenger-logo-fill" class="text-lg" />
									Messenger
								</button>
								<button
									class="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gray-950 hover:bg-gray-800 text-white rounded-xl font-black text-[10px] uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95"
									aria-label="Sao chép liên kết bài viết này"
									@click="copyLink"
								>
									<Icon name="ph:link-bold" class="text-lg" />
									Sao chép link
								</button>
							</div>
						</div>
					</article>

					<!-- RIGHT COLUMN: SIDEBAR -->
					<aside class="lg:col-span-4">
						<div class="sticky top-28">
							<NewsSidebar :related-news="news.related" />
						</div>
					</aside>

				</div>
			</main>
		</div>

		<!-- [3] EMPTY STATE (Article Not Found) -->
		<div v-else class="container mx-auto px-6 py-32 text-center max-w-md">
			<div class="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-dashed border-gray-200">
				<Icon name="ph:warning-circle-fill" class="text-4xl text-gray-400" />
			</div>
			<h2 class="text-2xl font-black text-gray-950 uppercase tracking-tight mb-2">
				Không Tìm Thấy Tin Tức
			</h2>
			<p class="text-gray-400 text-sm font-medium mb-8">Bài viết bạn yêu cầu không tồn tại hoặc đã bị xóa khỏi hệ thống.</p>
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
	from { opacity: 0; }
	to { opacity: 1; }
}

@keyframes slideUp {
	from { opacity: 0; transform: translateY(30px); }
	to { opacity: 1; transform: translateY(0); }
}
</style>
