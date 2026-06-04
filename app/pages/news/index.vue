<script setup>
definePageMeta({
	key: route => route.path
});

useSeoMeta({
	title: "Tin Tức, Sự Kiện | AnhEm Motor",
	description:
		"Cập nhật tin tức mới nhất về xe máy, sự kiện và chương trình ưu đãi từ AnhEm Motor.",
});

const newsStore = useNewsStore();
const activeTab = ref('all');

await useAsyncData("featured-news", () => newsStore.fetchFeaturedNews());

const {
	data: allNews,
	pagination,
	isInitialLoading,
	isFetching,
} = usePaginatedQuery({
	queryKey: ["news-list"],
	queryFn: (params) => newsService.getAllNews(params),
	itemsPerPage: 6,
	useLocalPagination: true,
});

const featuredNews = computed(() => {
	return newsStore.featuredNews.find(n => n.isHot) || newsStore.featuredNews[0];
});

// Filter news based on tab selection
const filteredNewsList = computed(() => {
	if (!allNews.value) return [];
	if (activeTab.value === 'all') return allNews.value;
	
	const categoryMapping = {
		events: ['Sự kiện', 'Sự kiện showroom', 'Showroom'],
		guides: ['Cẩm nang', 'Hướng dẫn', 'Công nghệ'],
		reviews: ['Đánh giá', 'Đánh giá xe']
	};
	const allowedCategories = categoryMapping[activeTab.value] || [];
	return allNews.value.filter(news => {
		const catName = news.category?.name || news.category || '';
		return allowedCategories.some(allowed => catName.toLowerCase().includes(allowed.toLowerCase()));
	});
});

// Watch for page changes to smoothly scroll directly to the news grid section
watch(() => pagination.currentPage, () => {
	if (import.meta.client) {
		setTimeout(() => {
			const element = document.getElementById('news-grid-title');
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}, 100);
	}
});

// Scroll Reveal Logic
onMounted(() => {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('reveal-visible')
			}
		})
	}, { threshold: 0.1 })

	document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
	<div class="bg-white min-h-screen font-['Manrope']">
		<!-- [1] HERO SECTION -->
		<NewsBanner />
		
		<!-- [2] STICKY SUB-NAVIGATION -->
		<div id="news-content" class="bg-white border-b border-gray-100 sticky top-[72px] z-50 scroll-mt-[72px]">
			<div class="container mx-auto px-4">
				<NewsFilters v-model:active-tab="activeTab" />
			</div>
		</div>

		<!-- [3] MAIN CONTENT SECTION -->
		<main class="py-8 md:py-20 bg-gray-50/20">
			<div class="container mx-auto px-4 md:px-8">
				
				<div v-if="newsStore.featuredNews.length > 0" class="space-y-12 md:space-y-24">
					<!-- [4] FEATURED NEWS (Premium 60/40 Design) -->
					<section v-if="activeTab === 'all' && pagination.currentPage === 1 && featuredNews" class="transition-all duration-700">
						<div class="inline-flex items-center gap-4 px-6 py-2.5 bg-red-600/5 rounded-full mb-12 border border-red-600/10 backdrop-blur-sm">
							<Icon name="ph:fire-fill" class="text-red-600 animate-bounce" />
							<span class="text-[11px] font-black uppercase tracking-[0.2em] text-red-600">Tiêu điểm tin tức trong tuần</span>
						</div>
						
						<NuxtLink 
							:to="`/news/${featuredNews.slug}`"
							class="group relative flex flex-col lg:flex-row bg-white rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.07)] border border-gray-100 hover:shadow-red-600/10 transition-all duration-1000"
						>
							<!-- Image - 60% Width -->
							<div class="lg:w-[60%] relative overflow-hidden aspect-video lg:min-h-[600px]">
								<img 
									:src="featuredNews.image" 
									class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
									:alt="featuredNews.title"
								>
								<div class="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 via-transparent to-transparent"/>
								
								<!-- Glassmorphism Date Badge -->
								<div class="absolute bottom-6 md:bottom-12 left-6 md:left-12 p-4 md:p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl md:rounded-[2.5rem] shadow-2xl">
									<div class="flex items-center gap-4 md:gap-6">
										<div class="text-center">
											<span class="block text-xl md:text-3xl font-black text-white leading-none">
												{{ featuredNews.createdAt ? new Date(featuredNews.createdAt).getDate().toString().padStart(2, '0') : new Date().getDate().toString().padStart(2, '0') }}
											</span>
											<span class="text-[8px] md:text-[10px] font-black text-white/60 uppercase tracking-widest mt-1 md:mt-2 block">Ngày</span>
										</div>
										<div class="w-[1px] h-6 md:h-10 bg-white/20"/>
										<div class="text-center">
											<span class="block text-xl md:text-3xl font-black text-white leading-none">
												{{ featuredNews.createdAt ? (new Date(featuredNews.createdAt).getMonth() + 1).toString().padStart(2, '0') : (new Date().getMonth() + 1).toString().padStart(2, '0') }}
											</span>
											<span class="text-[8px] md:text-[10px] font-black text-white/60 uppercase tracking-widest mt-1 md:mt-2 block">Tháng</span>
										</div>
									</div>
								</div>
							</div>
							
							<!-- Content - 40% Width -->
							<div class="lg:w-[40%] p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-white relative">
								<div class="space-y-6 md:space-y-10">
									<div class="flex items-center gap-3 md:gap-5">
										<span class="px-4 md:px-6 py-1.5 md:py-2.5 bg-gray-950 text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded-lg md:rounded-2xl">Hot News</span>
										<span class="text-[8px] md:text-[10px] font-black text-red-600 uppercase tracking-[0.2em] flex items-center gap-2">
											<Icon name="ph:calendar-blank-fill" />
											{{ featuredNews.date || (featuredNews.createdAt ? new Date(featuredNews.createdAt).toLocaleDateString('vi-VN') : 'Gần đây') }}
										</span>
									</div>
									
									<h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-gray-950 uppercase tracking-tighter leading-[1.1] group-hover:text-red-600 transition-colors">
										{{ featuredNews.title }}
									</h2>
									
									<p class="text-gray-500 text-base md:text-lg font-medium leading-relaxed italic border-l-4 border-red-600/30 pl-6 md:pl-10">
										"{{ featuredNews.shortDescription || featuredNews.excerpt || featuredNews.description }}"
									</p>
									
									<div class="pt-8 border-t border-gray-100 flex items-center justify-between">
										<div class="flex flex-col">
											<span class="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Category</span>
											<span class="text-2xl font-black text-red-600 uppercase tracking-tighter italic">
												{{ featuredNews.category?.name || featuredNews.category || 'Tin Tức' }}
											</span>
										</div>
										<div class="flex items-center gap-2 md:gap-3 text-gray-950 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] group-hover:translate-x-3 transition-transform duration-500">
											Đọc tiếp
											<Icon name="ph:arrow-right-bold" class="text-base md:text-lg" />
										</div>
									</div>
								</div>
							</div>
						</NuxtLink>
					</section>

					<!-- [5] NEWS GRID -->
					<section id="news-grid-section" class="space-y-16">
						<div class="flex items-end justify-between border-b border-gray-100 pb-10">
							<div class="space-y-3">
								<h2 id="news-grid-title" class="text-4xl font-black text-gray-950 uppercase tracking-tighter scroll-mt-[180px]">Bản tin cập nhật</h2>
								<p class="text-gray-400 text-xs font-black uppercase tracking-[0.3em]">Thông tin chính xác, cập nhật nhanh nhất</p>
							</div>
							<div class="hidden sm:flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest">
								<span>Sắp xếp:</span>
								<button class="text-gray-950 flex items-center gap-2">Mới nhất <Icon name="ph:caret-down-fill" /></button>
							</div>
						</div>

						<div v-if="isInitialLoading" class="flex justify-center py-24">
							<Icon name="fa6-solid:circle-notch" class="text-4xl animate-spin text-red-600" />
						</div>

						<template v-else>
							<div 
								v-if="filteredNewsList.length > 0" 
								class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 transition-opacity duration-300"
								:class="{ 'opacity-50 pointer-events-none': isFetching }"
							>
								<div
									v-for="news in filteredNewsList"
									:key="news.id"
									class="transition-all duration-300"
								>
									<NewsCard :news="news" />
								</div>
							</div>
							
							<!-- EMPTY GRID STATE -->
							<div v-else class="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-100">
								<Icon name="ph:newspaper-clipping-fill" class="text-5xl text-gray-200 mb-4" />
								<h3 class="text-2xl font-black text-gray-950 uppercase tracking-tight mb-2">Không tìm thấy bài viết</h3>
								<p class="text-gray-400 text-sm max-w-sm mx-auto">Vui lòng quay lại chuyên mục khác hoặc kiểm tra lại sau ít phút.</p>
							</div>

							<div class="flex justify-center pt-16">
								<UiBasePagination
									v-if="pagination.totalPages > 1 && activeTab === 'all'"
									:current-page="pagination.currentPage"
									:total-pages="pagination.totalPages"
									@update:current-page="pagination.goToPage"
								/>
							</div>
						</template>
					</section>
				</div>

				<!-- [6] MAIN EMPTY STATE -->
				<div v-else class="text-center py-48 bg-white rounded-[4rem] border-2 border-dashed border-gray-100">
					<div class="w-32 h-32 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10">
						<Icon name="ph:newspaper-fill" class="text-6xl text-gray-200" />
					</div>
					<h3 class="text-4xl font-black text-gray-950 uppercase tracking-tighter mb-4">
						Hiện chưa có tin tức nào
					</h3>
					<p class="text-gray-400 text-xl font-medium max-w-md mx-auto">
						Vui lòng quay lại sau để cập nhật các tin tức và sự kiện mới nhất từ AnhEm Motor.
					</p>
					<NuxtLink to="/" class="mt-12 inline-flex items-center gap-4 px-10 py-5 bg-gray-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-2xl">
						Về trang chủ
					</NuxtLink>
				</div>
			</div>
		</main>
		
		<!-- [7] CALL TO ACTION - DARK MYSTERY -->
		<section class="py-20 md:py-32 bg-gray-950 relative overflow-hidden">
			<div class="absolute inset-0 opacity-40 bg-[url('/final_cta_rider_adventure_1778828626734.png')] bg-cover bg-center scale-110"/>
			<div class="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-gray-950"/>
			
			<div class="container mx-auto px-4 relative z-10 text-center space-y-12">
				<h2 class="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-tight">
					Đừng bỏ lỡ <br ><span class="text-red-600 italic">mọi chuyển động</span>
				</h2>
				<p class="text-gray-400 text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
					Đăng ký nhận bản tin để cập nhật sớm nhất các xu hướng xe máy, sự kiện ra mắt và ưu đãi độc quyền.
				</p>
				<div class="flex flex-wrap justify-center gap-6 pt-6">
					<NuxtLink to="/support" class="px-12 py-6 bg-red-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_25px_50px_-12px_rgba(230,0,35,0.6)] hover:scale-110 hover:-rotate-1 transition-all duration-500">
						Đăng ký ngay
					</NuxtLink>
					<NuxtLink to="/products" class="px-12 py-6 bg-white/5 backdrop-blur-xl text-white border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
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
