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
	<section class="relative min-h-[550px] md:h-[60vh] flex items-center overflow-hidden py-12 md:py-0">
		<div
			class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 active:scale-100"
			style="
				background-image: url(&quot;/assets/image/index/index-banner-bg.webp&quot;);
			"
		>
			<div
				class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"
			/>
		</div>

		<div class="relative container mx-auto px-6 z-10">
			<div class="max-w-4xl text-white space-y-4 md:space-y-6">
				<div class="flex flex-col gap-2 animate-fade-in">
					<span
						class="inline-block px-3 py-1 bg-red-600 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] rounded-full w-fit shadow-lg shadow-red-600/20"
					>
						Ưu đãi tháng này
					</span>
					<h1
						class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] drop-shadow-2xl uppercase italic tracking-tighter"
					>
						Lướt <span class="text-red-600">Xe Sang</span>,<br >
						Chỉ từ <span class="text-red-600">399Tr.</span>
					</h1>
				</div>


				<div class="space-y-3">
					<p
						class="text-sm sm:text-lg md:text-xl text-white/80 max-w-2xl drop-shadow-md font-medium leading-relaxed"
					>
						Tìm ngay các dòng xe
						<span
							class="text-red-500 font-bold border-r-2 border-red-500 pr-1 animate-typing inline-block"
						>
							{{ currentBikeModel }}
						</span>
						<br class="hidden sm:block">
						Hệ thống phân phối xe máy chính hãng uy tín nhất khu vực.<br class="hidden sm:block">
						<span class="text-white font-black italic underline decoration-red-600 underline-offset-4">Giảm ngay đến 20 Triệu</span> tháng này. Trả góp 0%.
					</p>
				</div>

				<div class="flex flex-col sm:flex-row flex-wrap gap-4 pt-2 md:pt-4 items-start sm:items-center">
					<NuxtLink
						to="/products"
						class="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 bg-red-600 hover:bg-white hover:text-red-600 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl shadow-red-600/40 hover:-translate-y-1 flex items-center justify-center gap-3 group"
					>
						Nhận Báo Giá
						<Icon
							name="fa6-solid:chevron-right"
							class="text-xs transition-transform group-hover:translate-x-1"
						/>
					</NuxtLink>
					
					<!-- Quick Form -->
					<div class="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center bg-white/10 backdrop-blur-md rounded-2xl p-1 border border-white/20 group focus-within:bg-white focus-within:border-white transition-all shadow-xl">
						<input 
							type="tel" 
							placeholder="Nhập SĐT nhận tư vấn ngay..." 
							class="bg-transparent px-6 py-4 text-white focus:text-black outline-none w-full sm:w-60 font-bold text-xs md:text-sm"
						/>
						<button class="bg-red-600 hover:bg-black text-white px-6 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all">
							Gửi Ngay
						</button>
					</div>
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
