<template>
	<div class="brands-section">
		<div class="container">
			<div class="section-header">
				<span class="subtitle">Hệ sinh thái đối tác</span>
				<h2 class="title">Thương Hiệu Uy Tín</h2>
				<p class="description">Chúng tôi hợp tác với những nhà sản xuất hàng đầu thế giới để mang lại trải nghiệm tốt nhất cho bạn.</p>
			</div>

			<div
				class="brands-carousel-container"
				@mouseenter="stopAutoSlide"
				@mouseleave="startAutoSlide"
			>
				<div
					ref="carouselRef"
					class="brands-carousel"
					:style="carouselStyle"
					@transitionend="handleTransitionEnd"
				>
					<div
						v-for="(brand, index) in carouselBrands"
						:key="index"
						class="brand-slide"
					>
						<div class="brand-card">
							<div v-if="brand.origin" class="origin-badge">
								{{ brand.origin }}
							</div>
							<div class="brand-logo-wrapper">
								<img
									:src="brand.img"
									:alt="brand.alt"
									class="brand-logo"
									loading="lazy"
								>
							</div>
							<div class="brand-info">
								<h3 class="brand-name">{{ brand.name }}</h3>
								<p class="brand-desc line-clamp-1">{{ brand.text }}</p>
							</div>
							<div class="hover-decoration"></div>
						</div>
					</div>
				</div>

				<div class="carousel-dots">
					<span
						v-for="(_, index) in homeStore.brands"
						:key="index"
						class="dot"
						:class="{ active: activeDotIndex === index }"
						@click="goToSlide(index)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="js">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";


const homeStore = useHomeStore();
const carouselRef = ref(null);
const currentSlide = ref(0);
const useTransition = ref(true);
let autoSlideInterval = null;
let resizeObserver = null;
const slideWidth = ref(0);

const AUTOPLAY_DELAY = 3000;

const carouselBrands = computed(() => {
	const brands = homeStore.brands;
	return [...brands, ...brands];
});

const carouselStyle = computed(() => ({
	transform: `translateX(-${currentSlide.value * slideWidth.value}px)`,
	transition: useTransition.value ? "transform 0.5s ease-in-out" : "none",
}));

const activeDotIndex = computed(() => {
	if (homeStore.brands.length === 0) return 0;
	return currentSlide.value % homeStore.brands.length;
});

const nextSlide = () => {
	currentSlide.value++;
};

const goToSlide = (slideIndex) => {
	useTransition.value = true;
	currentSlide.value = slideIndex;
};

const handleTransitionEnd = () => {
	const brandsCount = homeStore.brands.length;
	if (brandsCount > 0 && currentSlide.value >= brandsCount) {
		useTransition.value = false;
		currentSlide.value = currentSlide.value % brandsCount;

		setTimeout(() => {
			useTransition.value = true;
		}, 20);
	}
};

const updateSlideWidth = () => {
	if (carouselRef.value && carouselRef.value.children.length > 0) {
		slideWidth.value = carouselRef.value.children[0].offsetWidth;
	}
};

const startAutoSlide = () => {
	if (autoSlideInterval) clearInterval(autoSlideInterval);
	autoSlideInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
};

const stopAutoSlide = () => {
	clearInterval(autoSlideInterval);
	autoSlideInterval = null;
};

onMounted(() => {
	startAutoSlide();
	updateSlideWidth();
	resizeObserver = new ResizeObserver(updateSlideWidth);
	if (carouselRef.value) {
		resizeObserver.observe(carouselRef.value);
	}
});

onBeforeUnmount(() => {
	stopAutoSlide();
	if (resizeObserver && carouselRef.value) {
		resizeObserver.unobserve(carouselRef.value);
	}
});
</script>

<style lang="css" scoped>
@reference '../../assets/main.css';

.brands-section {
	@apply w-full bg-slate-50 py-16 sm:py-24 relative overflow-hidden;
}

/* Background Decoration */
.brands-section::before {
	content: '';
	@apply absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none;
	background-image: radial-gradient(circle at 2px 2px, #000 1px, transparent 0);
	background-size: 40px 40px;
}

.container {
	@apply container mx-auto px-4 sm:px-6 relative z-10;
}

.section-header {
	@apply mb-16 text-center max-w-2xl mx-auto;
}

.subtitle {
	@apply block text-sm font-black text-red-600 uppercase tracking-[0.3em] mb-3;
}

.title {
	@apply text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter;
}

.description {
	@apply text-slate-500 text-sm sm:text-base font-medium;
}

.brands-carousel-container {
	@apply relative mx-auto;
}

.brands-carousel {
	@apply flex items-stretch;
}

.brand-slide {
	@apply w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex-shrink-0 px-3 pb-8;
}

.brand-card {
	@apply relative flex flex-col h-full items-center justify-between rounded-[2.5rem] bg-white p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] border border-slate-100 hover:border-red-500/20;
}

.brand-card:hover {
	@apply shadow-[0_20px_50px_rgba(239,68,68,0.1)] -translate-y-2;
}

.origin-badge {
	@apply absolute top-5 right-5 px-3 py-1 bg-slate-100 text-[10px] font-black text-slate-500 uppercase rounded-full tracking-widest z-20 transition-colors;
}

.brand-card:hover .origin-badge {
	@apply bg-red-500 text-white;
}

.brand-logo-wrapper {
	@apply flex-1 flex items-center justify-center mb-6 w-full;
}

.brand-logo {
	@apply max-h-16 sm:max-h-20 w-auto object-contain transition-all duration-500 filter grayscale opacity-60;
}

.brand-card:hover .brand-logo {
	@apply grayscale-0 opacity-100 scale-110;
}

.brand-info {
	@apply w-full mt-auto;
}

.brand-name {
	@apply text-lg font-black text-slate-800 mb-1 transition-colors;
}

.brand-card:hover .brand-name {
	@apply text-red-600;
}

.brand-desc {
	@apply text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed;
}

/* Hover Decoration */
.hover-decoration {
	@apply absolute bottom-0 left-1/2 w-0 h-1.5 bg-red-500 -translate-x-1/2 transition-all duration-500 rounded-full;
}

.brand-card:hover .hover-decoration {
	@apply w-12;
}

.carousel-dots {
	@apply mt-8 flex justify-center gap-3;
}

.dot {
	@apply h-1.5 w-8 cursor-pointer rounded-full bg-slate-200 transition-all duration-300 ease-in-out;
}

.dot.active {
	@apply bg-red-500 w-12;
}

.dot:hover {
	@apply bg-red-300;
}
</style>
