<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
	banners: {
		type: Array,
		default: () => [],
	},
	defaultBg: {
		type: String,
		default: "/assets/image/index/index-banner-bg.png",
	},
});

const currentBannerIndex = ref(0);
const slideDirection = ref("next");
let bannerTimer = null;

const activeBanner = computed(() => {
	return props.banners.length > 0
		? props.banners[currentBannerIndex.value]
		: null;
});

const nextBanner = () => {
	if (props.banners.length <= 1) return;
	slideDirection.value = "next";
	currentBannerIndex.value = (currentBannerIndex.value + 1) % props.banners.length;
	resetTimer();
};


const setBanner = (index) => {
	slideDirection.value = index > currentBannerIndex.value ? "next" : "prev";
	currentBannerIndex.value = index;
	resetTimer();
};

const startTimer = () => {
	bannerTimer = setInterval(nextBanner, 5000);
};

const resetTimer = () => {
	if (bannerTimer) {
		clearInterval(bannerTimer);
		startTimer();
	}
};

onMounted(() => {
	if (props.banners.length > 1) {
		startTimer();
	}
});

onUnmounted(() => {
	if (bannerTimer) clearInterval(bannerTimer);
});
</script>

<template>
	<section class="relative min-h-[300px] md:min-h-[400px] flex items-center overflow-hidden w-full">
		<!-- Background Layers with Transition -->
		<TransitionGroup :name="slideDirection === 'next' ? 'slide-next' : 'slide-prev'">
			<div
				v-for="(banner, index) in banners"
				v-show="index === currentBannerIndex"
				:key="banner.id || index"
				class="absolute inset-0 transition-transform duration-[10000ms] scale-110 active:scale-100 animate-ken-burns"
			>
				<picture>
					<source media="(max-width: 767px)" :srcset="banner.mobileImageUrl || defaultBg">
					<img :src="banner.desktopImageUrl || defaultBg" alt="Banner" class="w-full h-full object-cover">
				</picture>
				<div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
			</div>
		</TransitionGroup>

		<!-- Default Background if no banners -->
		<div
			v-if="banners.length === 0"
			class="absolute inset-0"
		>
			<picture>
				<source media="(max-width: 767px)" :srcset="defaultBg">
				<img :src="defaultBg" alt="Banner" class="w-full h-full object-cover">
			</picture>
			<div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
		</div>

		<div class="relative container mx-auto px-6 md:px-12 z-10 py-10">
			<div class="max-w-2xl text-white space-y-4 md:space-y-6">
				<Transition name="slide-up" mode="out-in">
					<div :key="currentBannerIndex" class="space-y-2">
						<h1 v-if="activeBanner?.title" class="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight drop-shadow-xl">
							{{ activeBanner.title }}
						</h1>
					</div>
				</Transition>

				<Transition name="slide-up" mode="out-in">
					<div :key="currentBannerIndex" class="text-sm md:text-base text-white/90 drop-shadow-md font-medium leading-relaxed">
						<p v-if="activeBanner?.description">{{ activeBanner.description }}</p>
					</div>
				</Transition>

				<div v-if="activeBanner?.ctaLink" class="flex flex-wrap gap-4 pt-4">
					<NuxtLink
						:to="activeBanner.ctaLink"
						class="h-12 px-6 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 flex items-center gap-2 group"
					>
						{{ activeBanner.ctaLabel || "Xem thêm" }}
						<Icon name="ph:arrow-right-bold" class="text-base transition-transform group-hover:translate-x-1" />
					</NuxtLink>
				</div>
			</div>
		</div>

		<!-- Navigation Dots -->
		<div v-if="banners.length > 1" class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20">
			<button
				v-for="(_, index) in banners"
				:key="index"
				class="group relative flex items-center justify-center p-2 outline-none"
				aria-label="Chuyển banner"
				@click="setBanner(index)"
			>
				<!-- Visual Dot -->
				<div
					class="relative rounded-full overflow-hidden transition-all duration-300 flex-shrink-0"
					:class="index === currentBannerIndex ? 'w-8 h-2' : 'w-2 h-2 group-hover:w-3'"
				>
					<!-- Background Track -->
					<div
						class="absolute inset-0 transition-colors duration-300"
						:class="index === currentBannerIndex ? 'bg-white/30' : 'bg-white/50 group-hover:bg-white/80'"
					/>
					<!-- Progress indicator for active dot -->
					<div
						v-if="index === currentBannerIndex"
						class="absolute inset-0 bg-primary origin-left animate-progress"
					/>
				</div>
			</button>
		</div>
	</section>
</template>

<style scoped>
@keyframes ken-burns {
	0% { transform: scale(1) translate(0, 0); }
	50% { transform: scale(1.05) translate(-1%, -1%); }
	100% { transform: scale(1) translate(0, 0); }
}

.animate-ken-burns {
	animation: ken-burns 20s ease-in-out infinite;
}

@keyframes progress {
	from { transform: scaleX(0); }
	to { transform: scaleX(1); }
}

.animate-progress {
	animation: progress 5s linear forwards;
}

/* Transitions */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
	transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-next-enter-from { transform: translateX(100%); opacity: 0; }
.slide-next-leave-to { transform: translateX(-100%); opacity: 0; }
.slide-prev-enter-from { transform: translateX(-100%); opacity: 0; }
.slide-prev-leave-to { transform: translateX(100%); opacity: 0; }

.slide-up-enter-active,
.slide-up-leave-active {
	transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from {
	opacity: 0;
	transform: translateY(20px);
}

.slide-up-leave-to {
	opacity: 0;
	transform: translateY(-20px);
}
</style>
