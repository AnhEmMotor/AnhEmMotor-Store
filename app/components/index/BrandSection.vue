<template>
	<div class="brands-section">
		<div class="container">
			<h2>Thương Hiệu Uy Tín</h2>
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
							<div class="brand-icon">
								<img
									:src="brand.img"
									:alt="brand.alt"
									class="brand-logo"
									width="48"
									height="48"
									loading="lazy"
								>
							</div>
							<p>{{ brand.text }}</p>
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
import { useHomeStore } from "@/stores/home.store";

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
	@apply w-full bg-gradient-to-br from-gray-50 to-gray-100 py-10 sm:py-16 md:py-20;
}

.container {
	@apply container mx-auto px-4 sm:px-6 md:px-8;
}

.brands-section h2 {
	@apply relative mb-8 sm:mb-12 text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800;
}

.brands-section h2::after {
	content: "";
	@apply absolute -bottom-3 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-red-500 to-orange-400;
}

.brands-carousel-container {
	@apply relative mx-auto overflow-hidden;
}

.brands-carousel {
	@apply flex;
}

.brand-slide {
	@apply w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex-shrink-0 px-4;
}

.brand-card {
	@apply relative flex h-48 sm:h-56 md:h-64 flex-col justify-center overflow-hidden rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 ease-in-out;
}

.brand-card:hover {
	@apply shadow-lg;
}

.brand-icon {
	@apply mb-4 flex justify-center;
}

.brand-logo {
	@apply h-12 sm:h-16 md:h-20 w-auto aspect-square object-contain;
}

.brand-card p {
	@apply text-base leading-relaxed text-gray-600;
}

.carousel-dots {
	@apply mt-10 mb-1 flex justify-center gap-3;
}

.dot {
	@apply h-3 w-3 cursor-pointer rounded-full bg-red-500/30 transition-all duration-300 ease-in-out;
}

.dot.active {
	@apply scale-125 bg-red-500;
}

.dot:hover {
	@apply bg-red-500;
}
</style>
