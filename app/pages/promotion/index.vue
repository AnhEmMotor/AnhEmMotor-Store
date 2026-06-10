<script setup>
useSeoMeta({
	title: "Chương Trình Khuyến Mãi Xe Máy | AnhEm Motor",
	description: "Khám phá các chương trình khuyến mãi hấp dẫn nhất từ AnhEm Motor - Trả góp 0%, ưu đãi tiền mặt và quà tặng cực khủng.",
});

const promotionStore = usePromotionStore();
const activeTab = ref('all');

await useAsyncData("promotions", () => promotionStore.fetchAllPromotions());
await useAsyncData("promotion-banners", () => promotionStore.fetchBanners());

const filteredPromotions = computed(() => {
	// Simple mock filtering for demo purposes
	if (activeTab.value === 'all') return promotionStore.promotions;
	return promotionStore.promotions.slice(0, 3); // Just show some items for other tabs
});

const featuredPromotion = computed(() => {
	return promotionStore.promotions.find(p => p.isHot) || promotionStore.promotions[0];
});

const regularPromotions = computed(() => {
	const all = filteredPromotions.value;
	if (all.length > 0) {
		return all.filter(p => p.id !== featuredPromotion.value?.id);
	}
	return [];
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

// Testimonial Pagination Logic (Local client-side pagination)
const promotionPage = ref(1);
const itemsPerPage = 6;
const totalPromotionPages = computed(() => Math.ceil(regularPromotions.value.length / itemsPerPage));
const paginatedRegularPromotions = computed(() => {
	const start = (promotionPage.value - 1) * itemsPerPage;
	return regularPromotions.value.slice(start, start + itemsPerPage);
});

// Watch for page changes to smoothly scroll directly to the promotions list grid section
watch(promotionPage, () => {
	if (import.meta.client) {
		setTimeout(() => {
			const element = document.getElementById('promotion-grid-title');
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}, 100);
	}
});
</script>

<template>
	<div class="bg-white min-h-screen">
		<!-- [1] HERO SECTION -->
		<CommonBannerCarousel v-if="promotionStore.banners.length > 0" :banners="promotionStore.banners" default-bg="/assets/image/index/index-banner-bg.png" />
		<PromotionBanner v-else />

		<!-- [2] FILTER SECTION -->
		<div id="promotion-content" class="bg-white border-b border-gray-100 sticky top-[72px] z-50 scroll-mt-[72px]">
			<div class="container mx-auto px-4">
				<PromotionFilters v-model:active-tab="activeTab" />
			</div>
		</div>

		<!-- [3] PROMOTION STEPS -->
		<PromotionSteps class="reveal reveal-up" />

		<main class="py-8 md:py-20 bg-gray-50/20 font-['Manrope']">
			<div class="container mx-auto px-4 md:px-8">
				
				<div v-if="promotionStore.promotions.length > 0" class="space-y-12 md:space-y-20">
					<!-- [4] FEATURED PROMOTION (Option 3 from MD) -->
					<section v-if="activeTab === 'all' && promotionPage === 1 && featuredPromotion" class="transition-all duration-700">
						<div class="inline-flex items-center gap-4 px-6 py-2.5 bg-red-600/5 rounded-full mb-12 border border-red-600/10 backdrop-blur-sm">
							<Icon name="ph:fire-fill" class="text-red-600 animate-bounce" />
							<span class="text-[11px] font-black uppercase tracking-[0.2em] text-red-600">Ưu đãi nổi bật nhất trong tuần</span>
						</div>
						
						<NuxtLink 
							:to="`/promotion/${featuredPromotion.slug}`"
							class="group relative flex flex-col lg:flex-row bg-white rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.07)] border border-gray-100 hover:shadow-red-600/10 transition-all duration-1000"
						>
							<!-- Image - 60% Width -->
							<div class="lg:w-[60%] relative overflow-hidden aspect-video lg:min-h-[550px]">
								<img 
									:src="featuredPromotion.image" 
									class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
									:alt="featuredPromotion.title"
								>
								<div class="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 via-transparent to-transparent"/>
								
								<!-- Countdown Overlay -->
								<div class="absolute bottom-6 md:bottom-12 left-6 md:left-12 p-4 md:p-8 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-[2.5rem]">
									<div class="flex items-center gap-4 md:gap-6">
										<div class="text-center">
											<span class="block text-xl md:text-3xl font-black text-white leading-none">03</span>
											<span class="text-[8px] md:text-[10px] font-black text-white/50 uppercase tracking-widest mt-1 md:mt-2 block">Ngày</span>
										</div>
										<div class="w-[1px] h-6 md:h-10 bg-white/10"/>
										<div class="text-center">
											<span class="block text-xl md:text-3xl font-black text-white leading-none">12</span>
											<span class="text-[8px] md:text-[10px] font-black text-white/50 uppercase tracking-widest mt-1 md:mt-2 block">Giờ</span>
										</div>
									</div>
								</div>
							</div>
							
							<!-- Content - 40% Width -->
							<div class="lg:w-[40%] p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white relative">
								<div class="space-y-6 md:space-y-12">
									<div class="flex items-center gap-3 md:gap-5">
										<span class="px-4 md:px-6 py-1.5 md:py-2.5 bg-gray-950 text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded-lg md:rounded-2xl">Hot Campaign</span>
										<span class="text-[8px] md:text-[10px] font-black text-red-600 uppercase tracking-[0.2em] flex items-center gap-2">
											<Icon name="ph:clock-fill" />
											Hết hạn: {{ featuredPromotion.endDate }}
										</span>
									</div>
									
									<h2 class="text-2xl md:text-4xl lg:text-6xl font-black text-gray-950 uppercase tracking-tight leading-[1.1] group-hover:text-red-600 transition-colors">
										{{ featuredPromotion.title }}
									</h2>
									
									<p class="text-gray-500 text-base md:text-xl lg:text-2xl font-medium leading-relaxed italic border-l-4 border-red-600/30 pl-6 md:pl-10">
										"{{ featuredPromotion.shortDescription }}"
									</p>
									
									<div class="pt-6 md:pt-12 border-t border-gray-100 flex items-center justify-between">
										<div class="flex flex-col">
											<span class="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Đặc quyền</span>
											<span class="text-2xl md:text-5xl font-black text-red-600 uppercase tracking-tighter italic">Trả góp 0%</span>
										</div>
										<div class="flex items-center gap-2 md:gap-3 text-gray-950 font-black text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] group-hover:translate-x-3 transition-transform duration-500">
											Chi tiết
											<Icon name="ph:arrow-right-bold" class="text-base md:text-lg" />
										</div>
									</div>
								</div>
							</div>
						</NuxtLink>
					</section>

					<!-- [5] PROMOTION GRID -->
					<section id="promotion-grid-section" class="space-y-16">
						<div class="flex items-end justify-between border-b border-gray-100 pb-10">
							<div class="space-y-3">
								<h2 id="promotion-grid-title" class="text-4xl font-black text-gray-950 uppercase tracking-tighter scroll-mt-[180px]">Danh sách ưu đãi</h2>
								<p class="text-gray-400 text-xs font-black uppercase tracking-[0.3em]">Khám phá và tận hưởng ngay hôm nay</p>
							</div>
							<div class="hidden sm:flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest">
								<span>Sắp xếp:</span>
								<button class="text-gray-950 flex items-center gap-2">Mới nhất <Icon name="ph:caret-down-fill" /></button>
							</div>
						</div>

						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
							<div
								v-for="promotion in paginatedRegularPromotions"
								:key="promotion.id"
								class="transition-all duration-300"
							>
								<PromotionCard :promotion="promotion" />
							</div>
						</div>

						<!-- Promotion Local Pagination Component -->
						<div v-if="totalPromotionPages > 1" class="flex justify-center pt-16">
							<UiBasePagination
								:current-page="promotionPage"
								:total-pages="totalPromotionPages"
								@update:current-page="promotionPage = $event"
							/>
						</div>
					</section>
				</div>

				<!-- [6] EMPTY STATE -->
				<div v-else class="text-center py-48 bg-white rounded-[4rem] border-2 border-dashed border-gray-100">
					<div class="w-32 h-32 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10">
						<Icon name="ph:ticket-fill" class="text-6xl text-gray-200" />
					</div>
					<h3 class="text-4xl font-black text-gray-950 uppercase tracking-tighter mb-4">
						Chưa có chương trình mới
					</h3>
					<p class="text-gray-400 text-xl font-medium max-w-md mx-auto">
						Vui lòng quay lại sau để cập nhật các ưu đãi hấp dẫn nhất từ hệ thống AnhEm Motor.
					</p>
					<NuxtLink to="/" class="mt-12 inline-flex items-center gap-4 px-10 py-5 bg-gray-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-2xl">
						Về trang chủ
					</NuxtLink>
				</div>
			</div>
		</main>
		
		<!-- [7] FAQ SECTION -->
		<PromotionFAQ class="reveal reveal-up" />

		<!-- [8] SHOWROOM SECTION -->
		<PromotionShowroom class="reveal reveal-up" />
		
		<!-- [9] CALL TO ACTION -->
		<section class="py-16 md:py-24 bg-gray-950 relative overflow-hidden font-['Manrope']">
			<div class="absolute inset-0 opacity-30 bg-[url('/final_cta_rider_adventure_1778828626734.png')] bg-cover bg-center scale-110"/>
			<div class="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-gray-950"/>
			
			<div class="container mx-auto px-4 relative z-10 text-center space-y-12">
				<h2 class="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-tight">Bạn đã chọn được <br ><span class="text-red-600 italic">xế yêu</span>?</h2>
				<p class="text-gray-400 text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">Hãy để đội ngũ chuyên gia của AnhEm Motor tư vấn chi tiết nhất về giá lăn bánh và các ưu đãi đặc quyền dành riêng cho bạn.</p>
				<div class="flex flex-wrap justify-center gap-6 pt-6">
					<NuxtLink to="/support" class="px-12 py-6 bg-red-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_25px_50px_-12px_rgba(230,0,35,0.6)] hover:scale-110 hover:-rotate-1 transition-all">Liên hệ ngay</NuxtLink>
					<NuxtLink to="/products" class="px-12 py-6 bg-white/5 backdrop-blur-xl text-white border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">Xem bảng giá</NuxtLink>
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
</style>
