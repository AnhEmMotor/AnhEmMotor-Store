<template>
	<div class="brands-section overflow-hidden relative">
		
		<div class="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none"/>
		<div class="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none"/>

		<div class="container mx-auto px-6">
			<div class="section-header">
				<span class="subtitle">Đối tác & Dòng xe</span>
				<h2 class="title text-4xl md:text-5xl lg:text-[42px] font-bold">Thương hiệu đồng hành</h2>
				<p class="description">AnhEm Motor tự hào là đối tác phân phối các dòng xe máy chính hãng từ những thương hiệu hàng đầu.</p>
			</div>
		</div>

		
		<div class="marquee-wrapper">
			<div class="marquee-content group">
				
				<div
					v-for="(brand, index) in homeStore.brands"
					:key="`brand-${index}`"
					class="brand-card"
				>
					<div class="brand-inner">
						<img
							:src="brand.img"
							:alt="brand.alt"
							class="brand-logo"
							loading="lazy"
						>
						<div class="brand-name">{{ brand.name }}</div>
					</div>
				</div>

				
				<div
					v-for="(brand, index) in homeStore.brands"
					:key="`brand-clone-${index}`"
					class="brand-card"
				>
					<div class="brand-inner">
						<img
							:src="brand.img"
							:alt="brand.alt"
							class="brand-logo"
							loading="lazy"
						>
						<div class="brand-name">{{ brand.name }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="js">
const homeStore = useHomeStore();
</script>

<style lang="css" scoped>
@reference '../../assets/main.css';

.brands-section {
	@apply w-full bg-slate-50 py-12 md:py-24 border-y border-slate-100;
}

.section-header {
	@apply mb-16 text-left max-w-3xl container mx-auto px-6;
}

.subtitle {
	@apply block text-red-600 font-bold uppercase tracking-widest text-xs mb-3;
}

.title {
	@apply text-slate-950 mb-6 tracking-tight;
}

.description {
	@apply text-slate-500 text-base md:text-lg font-medium max-w-2xl leading-relaxed;
}

.marquee-wrapper {
	@apply w-full overflow-hidden flex mt-4;
}

.marquee-content {
	@apply flex gap-6 md:gap-10 items-center py-4;
	animation: marquee 35s linear infinite;
	width: max-content;
}

.marquee-content:hover {
	animation-play-state: paused;
}

@keyframes marquee {
	0% { transform: translateX(0); }
	100% { transform: translateX(calc(-50% - 1.25rem)); } 
}

.brand-card {
	@apply shrink-0;
}

.brand-inner {
	@apply flex flex-col items-center justify-center rounded-2xl bg-white p-6 md:p-10 h-36 md:h-48 w-48 md:w-64 text-center shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(230,0,35,0.1)] hover:border-red-600/20 hover:-translate-y-2;
}

.brand-logo {
	@apply h-8 md:h-12 w-auto object-contain transition-all duration-500 filter grayscale opacity-40;
}

.brand-inner:hover .brand-logo {
	@apply grayscale-0 opacity-100 scale-110;
}

.brand-name {
	@apply mt-4 text-[10px] md:text-xs font-black text-slate-300 transition-colors uppercase tracking-widest;
}

.brand-inner:hover .brand-name {
	@apply text-red-600;
}
</style>
