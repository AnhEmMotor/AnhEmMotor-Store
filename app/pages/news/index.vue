<script setup>
definePageMeta({
	key: (route) => route.path,
});

useSeoMeta({
	title: "Tin Tức, Sự Kiện | AnhEm Motor",
	description:
		"Cập nhật tin tức mới nhất về xe máy, sự kiện và chương trình ưu đãi từ AnhEm Motor.",
});

const newsStore = useNewsStore();
import { newsService } from "~/services/news.service";
const route = useRoute();

const filters = reactive({
	category: route.query.category || "",
});

watch(
	() => route.query.category,
	(newCategory) => {
		filters.category = newCategory || "";
	},
);

const {
	data: allNews,
	pagination,
	isInitialLoading,
	isFetching,
} = usePaginatedQuery({
	queryKey: ["news-list"],
	queryFn: (params) => {
		const req = { ...params };
		if (req.category && req.category !== "all") {
			req.Filters = `Category.Slug==${req.category}`;
		}
		delete req.category;
		return newsService.getAllNews(req);
	},
	filters,
	itemsPerPage: 6,
	useLocalPagination: false,
});

await useAsyncData("featured-news", () => newsStore.fetchFeaturedNews());
await useAsyncData("news-banners", () => newsStore.fetchBanners());

const featuredNews = computed(() => {
	return (
		newsStore.featuredNews.find((n) => n.isHot) || newsStore.featuredNews[0]
	);
});

// Watch for page changes to smoothly scroll directly to the news grid section
watch(
	() => pagination.currentPage,
	() => {
		if (import.meta.client) {
			setTimeout(() => {
				const element = document.getElementById("news-grid-title");
				if (element) {
					element.scrollIntoView({ behavior: "smooth" });
				}
			}, 100);
		}
	},
);

// Scroll Reveal Logic
onMounted(() => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("reveal-visible");
				}
			});
		},
		{ threshold: 0.1 },
	);

	document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});
</script>

<template>
	<div class="bg-white min-h-screen font-['Manrope']">
		<!-- [1] HERO SECTION -->
		<CommonBannerCarousel v-if="newsStore.banners.length > 0" :banners="newsStore.banners" defaultBg="/assets/image/index/index-banner-bg.png" />
		<NewsBanner v-else />

		<!-- [2] STICKY SUB-NAVIGATION -->
		<div
			id="news-content"
			class="bg-white sticky top-[72px] z-50 scroll-mt-[72px]"
		>
			<div class="container mx-auto px-4">
				<NewsFilters />
			</div>
		</div>

		<!-- [3] MAIN CONTENT SECTION -->
		<main class="py-4 md:py-8 bg-gray-50/20">
			<div class="container mx-auto px-4 md:px-8">
				<div
					v-if="newsStore.featuredNews.length > 0"
					class="space-y-12 md:space-y-24"
				>
					<!-- [5] NEWS GRID -->
					<section id="news-grid-section" class="space-y-16">
						<div v-if="isInitialLoading" class="flex justify-center py-24">
							<Icon
								name="fa6-solid:circle-notch"
								class="text-4xl animate-spin text-red-600"
							/>
						</div>

						<template v-else>
							<div
								v-if="allNews && allNews.length > 0"
								class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 transition-opacity duration-300"
								:class="{ 'opacity-50 pointer-events-none': isFetching }"
							>
								<div
									v-for="news in allNews"
									:key="news.id"
									class="transition-all duration-300"
								>
									<NewsCard :news="news" />
								</div>
							</div>

							<!-- EMPTY GRID STATE -->
							<div
								v-else
								class="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-100"
							>
								<Icon
									name="ph:newspaper-clipping-fill"
									class="text-5xl text-gray-200 mb-4"
								/>
								<h3
									class="text-2xl font-black text-gray-950 uppercase tracking-tight mb-2"
								>
									Không tìm thấy bài viết
								</h3>
								<p class="text-gray-400 text-sm max-w-sm mx-auto">
									Vui lòng quay lại chuyên mục khác hoặc kiểm tra lại sau ít
									phút.
								</p>
							</div>

							<div class="flex justify-center pt-16">
								<UiBasePagination
									v-if="pagination.totalPages > 1"
									:current-page="pagination.currentPage"
									:total-pages="pagination.totalPages"
									@update:current-page="pagination.goToPage"
								/>
							</div>
						</template>
					</section>
				</div>

				<!-- [6] MAIN EMPTY STATE -->
				<div
					v-else
					class="text-center py-48 bg-white rounded-[4rem] border-2 border-dashed border-gray-100"
				>
					<div
						class="w-32 h-32 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10"
					>
						<Icon name="ph:newspaper-fill" class="text-6xl text-gray-200" />
					</div>
					<h3
						class="text-4xl font-black text-gray-950 uppercase tracking-tighter mb-4"
					>
						Hiện chưa có tin tức nào
					</h3>
					<p class="text-gray-400 text-xl font-medium max-w-md mx-auto">
						Vui lòng quay lại sau để cập nhật các tin tức và sự kiện mới nhất từ
						AnhEm Motor.
					</p>
					<NuxtLink
						to="/"
						class="mt-12 inline-flex items-center gap-4 px-10 py-5 bg-gray-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-2xl"
					>
						Về trang chủ
					</NuxtLink>
				</div>
			</div>
		</main>

		<!-- [7] CALL TO ACTION - DARK MYSTERY -->
		<section class="py-12 md:py-16 bg-gray-950 relative overflow-hidden">
			<div
				class="absolute inset-0 opacity-40 bg-[url('/final_cta_rider_adventure_1778828626734.png')] bg-cover bg-center scale-110"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-gray-950"
			/>

			<div class="container mx-auto px-4 relative z-10 text-center space-y-12">
				<h2
					class="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-tight"
				>
					Đừng bỏ lỡ <br /><span class="text-red-600 italic"
						>mọi chuyển động</span
					>
				</h2>
				<p
					class="text-gray-400 text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed"
				>
					Đăng ký nhận bản tin để cập nhật sớm nhất các xu hướng xe máy, sự kiện
					ra mắt và ưu đãi độc quyền.
				</p>
				<div class="flex flex-wrap justify-center gap-6 pt-6">
					<NuxtLink
						to="/support"
						class="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_25px_50px_-12px_rgba(230,0,35,0.6)] hover:scale-110 hover:-rotate-1 transition-all duration-500"
					>
						Đăng ký ngay
					</NuxtLink>
					<NuxtLink
						to="/products"
						class="px-8 py-4 bg-white/5 backdrop-blur-xl text-white border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
					>
						Xem sản phẩm
					</NuxtLink>
				</div>
			</div>
		</section>

		<CommonScrollToTop />
	</div>
</template>

<style scoped>
.reveal {
	opacity: 0;
	transform: translateY(30px);
	transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-visible {
	opacity: 1;
	transform: translateY(0);
}

.scrollbar-none::-webkit-scrollbar {
	display: none;
}
.scrollbar-none {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
</style>
