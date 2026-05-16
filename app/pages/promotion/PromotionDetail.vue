<script setup>
definePageMeta({
	path: '/promotion/:slug'
});
const route = useRoute();
const promotionStore = usePromotionStore();
const slug = route.params.slug;

const { data: promotion } = await useAsyncData(`promotion-${slug}`, () => 
	promotionStore.fetchPromotionBySlug(slug)
);

if (!promotion.value) {
	throw createError({ statusCode: 404, statusMessage: 'Chương trình không tồn tại' });
}

useSeoMeta({
	title: `${promotion.value.title} | AnhEm Motor`,
	description: promotion.value.shortDescription,
	ogImage: promotion.value.image,
});

// Mock related promotions
const relatedPromotions = computed(() => {
	return promotionStore.promotions.filter(p => p.slug !== slug).slice(0, 3);
});
</script>

<template>
	<div class="bg-white min-h-screen pb-20">
		<!-- [1] HERO LANDING SECTION -->
		<PromotionDetailHero :promotion="promotion" />

		<!-- [2] MAIN CONTENT GRID -->
		<div class="container mx-auto px-6 mt-12 md:mt-20">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
				
				<!-- LEFT COLUMN: CONTENT -->
				<div class="lg:col-span-8 space-y-20">
					
					<!-- BENEFITS CARDS -->
					<section class="space-y-10">
						<div class="flex flex-col gap-2">
							<span class="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">Đặc quyền của bạn</span>
							<h2 class="text-3xl md:text-4xl font-black text-gray-950 uppercase tracking-tighter">Ưu đãi nhận được</h2>
						</div>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div 
								v-for="(benefit, idx) in promotion.benefits" 
								:key="idx"
								class="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-start gap-6 hover:bg-white hover:shadow-xl transition-all duration-500 group"
							>
								<div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
									<Icon :name="benefit.icon" class="text-2xl" />
								</div>
								<div class="space-y-1">
									<h4 class="font-black text-lg text-gray-900 group-hover:text-red-600 transition-colors uppercase tracking-tight">{{ benefit.title }}</h4>
									<p class="text-sm text-gray-500 font-medium">{{ benefit.desc }}</p>
								</div>
							</div>
						</div>
					</section>

					<!-- RICH CONTENT -->
					<section class="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-gray-500 prose-p:leading-relaxed">
						<div v-html="promotion.content"></div>
					</section>

					<!-- APPLICABLE MODELS -->
					<section v-if="promotion.targetBikes?.length" class="space-y-10">
						<div class="flex flex-col gap-2">
							<span class="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">Sản phẩm tiêu biểu</span>
							<h2 class="text-3xl md:text-4xl font-black text-gray-950 uppercase tracking-tighter">Dòng xe áp dụng</h2>
						</div>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
							<div v-for="bike in promotion.targetBikes" :key="bike.name" class="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden group shadow-soft hover:shadow-elevated transition-all duration-500">
								<div class="aspect-video relative overflow-hidden">
									<img :src="bike.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" :alt="bike.name">
									<div class="absolute top-4 right-4 px-4 py-1.5 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">Khuyên dùng</div>
								</div>
								<div class="p-8 flex items-center justify-between">
									<div>
										<h4 class="font-black text-xl text-gray-950 uppercase tracking-tighter">{{ bike.name }}</h4>
										<p class="text-red-600 font-black text-sm italic mt-1">Từ {{ bike.price }} VNĐ</p>
									</div>
									<NuxtLink to="/products" class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
										<Icon name="ph:arrow-right-bold" />
									</NuxtLink>
								</div>
							</div>
						</div>
					</section>

					<!-- PROCESS STEPS -->
					<section class="py-16 bg-gray-950 rounded-[3rem] px-8 md:px-12 relative overflow-hidden">
						<div class="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full"></div>
						<div class="relative z-10 space-y-12">
							<div class="text-center space-y-2">
								<span class="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">Hành trình của bạn</span>
								<h2 class="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">Quy trình nhận ưu đãi</h2>
							</div>
							<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
								<div v-for="(step, idx) in promotion.steps" :key="idx" class="relative group">
									<div class="flex flex-col items-center text-center space-y-6">
										<div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 border border-white/5 relative z-10">
											<Icon :name="step.icon" class="text-2xl" />
											<span class="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-gray-950">{{ idx + 1 }}</span>
										</div>
										<div class="space-y-1">
											<h5 class="text-white font-black uppercase text-xs tracking-widest">{{ step.title }}</h5>
											<p class="text-gray-400 text-xs font-medium">{{ step.desc }}</p>
										</div>
									</div>
									<!-- Connector Line -->
									<div v-if="idx < 3" class="hidden lg:block absolute top-8 left-[70%] w-[60%] h-[1px] border-t border-dashed border-white/20"></div>
								</div>
							</div>
						</div>
					</section>

					<!-- TERMS & CONDITIONS -->
					<section class="space-y-10">
						<div class="flex flex-col gap-2">
							<span class="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">Quy định chi tiết</span>
							<h2 class="text-3xl md:text-4xl font-black text-gray-950 uppercase tracking-tighter">Điều kiện áp dụng</h2>
						</div>
						<PromotionTermsAccordion :terms="promotion.terms" />
					</section>

					<!-- GALLERY / SOCIAL PROOF -->
					<section class="space-y-10">
						<div class="flex flex-col gap-2 text-center md:text-left">
							<span class="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">Khoảnh khắc thực tế</span>
							<h2 class="text-3xl md:text-4xl font-black text-gray-950 uppercase tracking-tighter">Hình ảnh chương trình</h2>
						</div>
						<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
							<div v-for="(img, idx) in promotion.gallery" :key="idx" class="aspect-square rounded-[2rem] overflow-hidden group">
								<img :src="img" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Gallery image">
							</div>
						</div>
					</section>
				</div>

				<!-- RIGHT COLUMN: STICKY CTA -->
				<div class="lg:col-span-4">
					<PromotionStickyCTA :promotion="promotion" />
				</div>
			</div>
		</div>

		<!-- RELATED PROMOTIONS -->
		<div class="bg-gray-50 mt-32 py-32 border-y border-gray-100">
			<div class="container mx-auto px-6 space-y-16">
				<div class="flex flex-col md:flex-row justify-between items-end gap-10">
					<div class="space-y-4">
						<span class="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">Cơ hội khác cho bạn</span>
						<h2 class="text-4xl md:text-5xl font-black text-gray-950 uppercase tracking-tighter">Ưu đãi liên quan</h2>
					</div>
					<NuxtLink to="/promotion" class="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors flex items-center gap-2">
						Tất cả khuyến mãi <Icon name="ph:arrow-right-bold" />
					</NuxtLink>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					<PromotionCard v-for="p in relatedPromotions" :key="p.id" :promotion="p" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
@reference "../../assets/main.css";

/* Reveal animations for better scrolling experience */
section {
	@apply opacity-0 translate-y-8;
	animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

section:nth-child(2) { animation-delay: 300ms; }
section:nth-child(3) { animation-delay: 450ms; }

@keyframes reveal {
	from { opacity: 0; transform: translateY(30px); }
	to { opacity: 1; transform: translateY(0); }
}
</style>
