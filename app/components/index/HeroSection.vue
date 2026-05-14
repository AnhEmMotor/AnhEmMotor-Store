<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

const layoutStore = useLayoutStore();
const homeStore = useHomeStore();
const { heroBikeModels: bikeModels } = storeToRefs(layoutStore);

const currentBikeModel = ref("");
let modelIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Banner sliding logic
const currentBannerIndex = ref(0);
const slideDirection = ref("next");
let bannerTimer = null;

const fallbackBanners = [
	{
		id: "fb1",
		image: "/assets/image/index/banner1.png",
		title: "Showroom Sang Trọng",
		description: "Trải nghiệm không gian trưng bày xe phân khối lớn hiện đại và đẳng cấp nhất khu vực.",
		link: "/products",
	},
	{
		id: "fb2",
		image: "/assets/image/index/banner2.png",
		title: "Dịch Vụ Chuyên Nghiệp",
		description: "Đội ngũ kỹ thuật viên giàu kinh nghiệm cùng trang thiết bị hiện đại, chăm sóc xế yêu của bạn tốt nhất.",
		link: "/support",
	},
	{
		id: "fb3",
		image: "/assets/image/index/banner3.png",
		title: "Phụ Tùng Chính Hãng",
		description: "Cung cấp đầy đủ các loại phụ tùng, đồ chơi xe máy chính hãng từ các thương hiệu hàng đầu thế giới.",
		link: "/products",
	},
	{
		id: "fb4",
		image: "/assets/image/index/banner4.png",
		title: "Ưu Đãi Ngập Tràn",
		description: "Hỗ trợ trả góp 0%, duyệt hồ sơ nhanh chóng và nhiều quà tặng hấp dẫn khi mua xe mới.",
		link: "/promotion",
	},
	{
		id: "fb5",
		image: "/assets/image/index/banner5.png",
		title: "AnhEm Motor",
		description: "Hệ thống cửa hàng xe máy uy tín, phục vụ tận tâm 24/7.",
		link: "/about",
	},
];

const banners = computed(() => {
	const storeBanners = homeStore.banners || [];
	return storeBanners.length > 0 ? storeBanners : fallbackBanners;
});

const activeBanner = computed(() => {
	return banners.value.length > 0
		? banners.value[currentBannerIndex.value]
		: null;
});

const heroBg = computed(() => {
	return activeBanner.value?.image || "/assets/image/index/index-banner-bg.webp";
});

const nextBanner = () => {
	if (banners.value.length <= 1) return;
	slideDirection.value = "next";
	currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value.length;
	resetTimer();
};

const prevBanner = () => {
	if (banners.value.length <= 1) return;
	slideDirection.value = "prev";
	currentBannerIndex.value = (currentBannerIndex.value - 1 + banners.value.length) % banners.value.length;
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

const typeEffect = () => {
	if (!bikeModels.value || bikeModels.value.length === 0) return;
	const currentFullText = bikeModels.value[modelIndex];

	if (isDeleting) {
		currentBikeModel.value = currentFullText.substring(0, charIndex - 1);
		charIndex--;
	} else {
		currentBikeModel.value = currentFullText.substring(0, charIndex + 1);
		charIndex++;
	}

	let typeSpeed = isDeleting ? 50 : 100;

	if (!isDeleting && charIndex === currentFullText.length) {
		typeSpeed = 2000;
		isDeleting = true;
	} else if (isDeleting && charIndex === 0) {
		isDeleting = false;
		modelIndex = (modelIndex + 1) % bikeModels.value.length;
		typeSpeed = 500;
	}

	setTimeout(typeEffect, typeSpeed);
};

onMounted(() => {
	typeEffect();
	startTimer();
});

onUnmounted(() => {
	if (bannerTimer) clearInterval(bannerTimer);
});
</script>

<template>
	<section class="relative min-h-[520px] md:min-h-[620px] flex items-center overflow-hidden">
		<!-- Background Layers with Transition -->
		<TransitionGroup :name="slideDirection === 'next' ? 'slide-next' : 'slide-prev'">
			<div
				v-for="(banner, index) in banners"
				v-show="index === currentBannerIndex"
				:key="banner.id || index"
				class="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110 active:scale-100 animate-ken-burns"
				:style="{
					backgroundImage: `url('${banner.image || '/assets/image/index/index-banner-bg.webp'}')`,
				}"
			>
				<div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
			</div>
		</TransitionGroup>

		<!-- Default Background if no banners -->
		<div
			v-if="banners.length === 0"
			class="absolute inset-0 bg-cover bg-center"
			style="background-image: url('/assets/image/index/index-banner-bg.webp')"
		>
			<div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
		</div>

		<div class="relative container mx-auto px-6 md:px-12 lg:px-20 z-10">
			<div class="max-w-4xl text-white space-y-8">
				<Transition name="slide-up" mode="out-in">
					<div :key="currentBannerIndex" class="space-y-4">
						<h2 class="text-primary font-bold tracking-widest uppercase text-sm md:text-base">ANHEM MOTOR</h2>
						<h1
							class="text-4xl md:text-6xl lg:text-[56px] font-extrabold leading-tight drop-shadow-xl"
						>
							<template v-if="activeBanner?.title">
								{{ activeBanner.title }}
							</template>
							<template v-else>
								Hệ thống xe máy & <br />
								<span class="text-white/90">Dịch vụ bảo dưỡng chuyên nghiệp</span>
							</template>
						</h1>
					</div>
				</Transition>

				<Transition name="slide-up" mode="out-in">
					<div
						:key="currentBannerIndex"
						class="text-lg md:text-xl text-white/80 max-w-2xl drop-shadow-md font-medium leading-relaxed space-y-3"
					>
						<template v-if="activeBanner?.description">
							{{ activeBanner.description }}
						</template>
						<template v-else>
							<div class="flex flex-col gap-2">
								<div class="flex items-center gap-3">
									<Icon name="ph:check-circle-fill" class="text-primary text-xl" />
									<span>Cam kết xe chính hãng, giá tốt nhất khu vực</span>
								</div>
								<div class="flex items-center gap-3">
									<Icon name="ph:check-circle-fill" class="text-primary text-xl" />
									<span>Hỗ trợ trả góp 0% lãi suất, duyệt hồ sơ 15 phút</span>
								</div>
								<div class="flex items-center gap-3">
									<Icon name="ph:check-circle-fill" class="text-primary text-xl" />
									<span>Dịch vụ bảo dưỡng, cứu hộ 24/7 tận nơi</span>
								</div>
							</div>
						</template>
					</div>
				</Transition>

				<div class="flex flex-wrap gap-4 pt-6">
					<NuxtLink
						:to="activeBanner?.link || '/products'"
						class="h-14 px-8 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 flex items-center gap-3 group"
					>
						{{ activeBanner?.link ? "Khám phá ngay" : "Mua ngay" }}
						<Icon
							name="ph:arrow-right-bold"
							class="text-lg transition-transform group-hover:translate-x-1"
						/>
					</NuxtLink>
					<NuxtLink
						to="/support"
						class="h-14 px-8 bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/20 rounded-xl font-bold backdrop-blur-md transition-all hover:-translate-y-1 flex items-center gap-3"
					>
						<Icon name="ph:calendar-check-bold" class="text-xl" />
						Đặt lịch bảo dưỡng
					</NuxtLink>
				</div>
			</div>
		</div>

		<!-- Navigation Dots -->
		<div v-if="banners.length > 1" class="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
			<button
				v-for="(_, index) in banners"
				:key="index"
				@click="setBanner(index)"
				class="group relative h-2 transition-all duration-300"
				:class="index === currentBannerIndex ? 'w-12' : 'w-2 hover:w-4'"
			>
				<div
					class="absolute inset-0 rounded-full bg-white/30 group-hover:bg-white/50 transition-colors"
					:class="{ 'bg-white': index === currentBannerIndex }"
				/>
				<div
					v-if="index === currentBannerIndex"
					class="absolute inset-0 rounded-full bg-primary origin-left animate-progress"
				/>
			</button>
		</div>

		<!-- Side Navigation Arrows -->
		<div v-if="banners.length > 1" class="hidden md:flex absolute inset-y-0 left-4 right-4 items-center justify-between pointer-events-none z-20">
			<button
				@click="prevBanner"
				class="w-12 h-12 flex items-center justify-center rounded-full bg-black/10 hover:bg-white text-white hover:text-black border border-white/10 backdrop-blur-md transition-all pointer-events-auto group"
			>
				<Icon name="ph:caret-left-bold" class="text-xl transition-transform group-hover:-translate-x-0.5" />
			</button>
			<button
				@click="nextBanner"
				class="w-12 h-12 flex items-center justify-center rounded-full bg-black/10 hover:bg-white text-white hover:text-black border border-white/10 backdrop-blur-md transition-all pointer-events-auto group"
			>
				<Icon name="ph:caret-right-bold" class="text-xl transition-transform group-hover:translate-x-0.5" />
			</button>
		</div>
	</section>
</template>


<style scoped>
@keyframes blink {
	0%,
	100% {
		border-color: transparent;
	}
	50% {
		border-color: #ef4444;
	}
}
.animate-typing {
	animation: blink 0.8s infinite;
}

@keyframes ken-burns {
	0% {
		transform: scale(1) translate(0, 0);
	}
	50% {
		transform: scale(1.1) translate(-1%, -1%);
	}
	100% {
		transform: scale(1) translate(0, 0);
	}
}

.animate-ken-burns {
	animation: ken-burns 20s ease-in-out infinite;
}

@keyframes progress {
	from {
		transform: scaleX(0);
	}
	to {
		transform: scaleX(1);
	}
}

.animate-progress {
	animation: progress 5s linear forwards;
}

/* Transitions */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
	transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Slide Next (Right to Left) */
.slide-next-enter-from {
	transform: translateX(100%) scale(1.1);
	opacity: 0;
}
.slide-next-leave-to {
	transform: translateX(-100%) scale(1);
	opacity: 0;
}

/* Slide Prev (Left to Right) */
.slide-prev-enter-from {
	transform: translateX(-100%) scale(1.1);
	opacity: 0;
}
.slide-prev-leave-to {
	transform: translateX(100%) scale(1);
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
	transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from {
	opacity: 0;
	transform: translateY(30px);
}

.slide-up-leave-to {
	opacity: 0;
	transform: translateY(-30px);
}

@keyframes fade-in {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
.animate-fade-in {
	animation: fade-in 0.8s ease-out forwards;
}
</style>
