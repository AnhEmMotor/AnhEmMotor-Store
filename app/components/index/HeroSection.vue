<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useLayoutStore } from "../../stores/layout.store";

const layoutStore = useLayoutStore();
const { heroBikeModels: bikeModels } = storeToRefs(layoutStore);

const currentBikeModel = ref("");
let modelIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
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
});
</script>

<template>
	<section class="relative h-[70vh] flex items-center overflow-hidden">
		<div
			class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 active:scale-100"
			style="
				background-image: url(&quot;/assets/image/index/index-banner-bg.webp&quot;);
			"
		>
			<div
				class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"
			/>
		</div>

		<div class="relative container mx-auto px-6 z-10 pb-24">
			<div class="max-w-4xl text-white space-y-6">
				<h1
					class="text-3xl md:text-5xl lg:text-7xl font-black leading-[1.1] drop-shadow-2xl uppercase italic tracking-tighter"
				>
					Lướt <span class="text-red-600">Xe Sang</span>,<br >
					Nhận Báo <span class="text-red-600">Giá&nbsp;Tốt.</span>
				</h1>

				<p
					class="text-lg md:text-xl text-white/80 max-w-2xl drop-shadow-md font-medium leading-relaxed"
				>
					Tìm ngay các dòng xe
					<span
						class="text-red-500 font-bold border-r-2 border-red-500 pr-1 animate-typing inline-block"
					>
						{{ currentBikeModel }}
					</span>
					<br >
					Hệ thống phân phối xe máy chính hãng uy tín nhất khu vực.<br >
					Cam kết giá lăn bánh tốt nhất, thủ tục trả góp 15 phút.
				</p>

				<div class="flex flex-wrap gap-4 pt-4">
					<NuxtLink
						to="/products"
						class="px-10 py-5 bg-red-600 hover:bg-black text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl shadow-red-600/40 hover:-translate-y-1 flex items-center gap-3 group"
					>
						Xem danh sách sản phẩm
						<Icon
							name="fa6-solid:chevron-right"
							class="text-xs transition-transform group-hover:translate-x-1"
						/>
					</NuxtLink>
					<button
						class="px-10 py-5 bg-transparent hover:bg-white/10 text-white border-2 border-white/50 rounded-2xl font-black uppercase tracking-widest backdrop-blur-md transition-all hover:border-white hover:-translate-y-1"
					>
						Đăng Ký Lái Thử
					</button>
				</div>
			</div>
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
