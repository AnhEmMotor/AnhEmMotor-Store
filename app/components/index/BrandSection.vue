<template>
	<div class="brands-section">
		<div class="container mx-auto px-6">
			<div class="section-header">
				<span class="subtitle">Đối tác & Dòng xe</span>
				<h2 class="title text-4xl md:text-5xl lg:text-[42px] font-bold">Thương hiệu đồng hành</h2>
				<p class="description">AnhEm Motor tự hào là đối tác phân phối các dòng xe máy chính hãng từ những thương hiệu hàng đầu.</p>
			</div>

			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
				<div
					v-for="(brand, index) in homeStore.brands"
					:key="index"
					class="brand-card"
				>
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
</template>

<script setup lang="js">
const homeStore = useHomeStore();
</script>

<style lang="css" scoped>
@reference '../../assets/main.css';

.brands-section {
	@apply w-full bg-slate-50 py-20 border-y border-slate-100;
}

.section-header {
	@apply mb-16 text-left max-w-3xl;
}

.subtitle {
	@apply block text-primary font-bold uppercase tracking-widest text-xs mb-3;
}

.title {
	@apply text-slate-900 mb-6 tracking-tight;
}

.description {
	@apply text-slate-500 text-base md:text-lg font-medium max-w-2xl leading-relaxed;
}

.brand-card {
	@apply flex flex-col items-center justify-center rounded-18 bg-white p-8 h-44 text-center shadow-soft transition-all duration-500 border border-slate-100 hover:shadow-elevated hover:border-primary/20 hover:-translate-y-1;
}

.brand-logo {
	@apply h-12 w-auto object-contain transition-all duration-500 filter grayscale opacity-40;
}

.brand-card:hover .brand-logo {
	@apply grayscale-0 opacity-100 scale-110;
}

.brand-name {
	@apply mt-4 text-sm font-bold text-slate-400 transition-colors uppercase tracking-widest;
}

.brand-card:hover .brand-name {
	@apply text-primary;
}
</style>
