<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const currentPlaceholder = ref("");
const phrases = [
	"Nhập tên xe bạn muốn sở hữu...",
	'Tìm "Winner X v4", "Vario 160" hoặc hãng xe...',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let timeoutId = null;

const typeEffect = () => {
	const currentPhrase = phrases[phraseIndex];
	let typingSpeed = isDeleting ? 20 : 30;

	if (isDeleting) {
		currentPlaceholder.value = currentPhrase.substring(0, charIndex - 1);
		charIndex--;
	} else {
		currentPlaceholder.value = currentPhrase.substring(0, charIndex + 1);
		charIndex++;
	}

	if (!isDeleting && charIndex === currentPhrase.length) {
		isDeleting = true;
		typingSpeed = 2000;
	} else if (isDeleting && charIndex === 0) {
		isDeleting = false;
		phraseIndex = (phraseIndex + 1) % phrases.length;
		typingSpeed = 500;
	}

	timeoutId = setTimeout(typeEffect, typingSpeed);
};

onMounted(() => {
	typeEffect();
});

import { useRouter } from "#app";

const router = useRouter();
const searchQuery = ref("");

const handleSearch = () => {
	const trimmed = searchQuery.value.trim();
	if (trimmed) {
		router.push({ path: "/products", query: { search: trimmed, page: 1 } });
	} else {
		router.push({ path: "/products", query: { page: 1 } });
	}
};

onUnmounted(() => {
	if (timeoutId) clearTimeout(timeoutId);
});
</script>

<template>
	<section id="hero" class="hero-section">
		<div class="hero-overlay" />
		<div class="hero-content">
			<h1>Tìm Chiếc Xe Máy Mơ Ước Của Bạn</h1>
			<p>
				Khám phá bộ sưu tập xe máy chính hãng đa dạng từ các thương hiệu hàng
				đầu thế giới
			</p>

			<form @submit.prevent="handleSearch" class="search-bar">
				<label for="searchInput" class="sr-only">Tìm kiếm sản phẩm</label>
				<input
					id="searchInput"
					type="text"
					:placeholder="currentPlaceholder"
					v-model="searchQuery"
				/>
				<button
					id="searchButton"
					type="submit"
					class="search-button"
					aria-label="Tìm kiếm sản phẩm"
				>
					<i class="fas fa-search" /> Tìm Kiếm
				</button>
			</form>

			<div class="hero-stats">
				<div class="stat-item">
					<span class="stat-number">50+</span>
					<span class="stat-label">Mẫu xe</span>
				</div>
				<div class="stat-item">
					<span class="stat-number">1K+</span>
					<span class="stat-label">Khách hàng</span>
				</div>
				<div class="stat-item">
					<span class="stat-number">5+</span>
					<span class="stat-label">Năm kinh nghiệm</span>
				</div>
			</div>
		</div>

		<Head>
			<link
				rel="preload"
				as="image"
				href="/assets/image/index/index-banner-bg.webp"
				fetchpriority="high"
			/>
		</Head>
	</section>
</template>

<style lang="css" scoped>
@reference '../../assets/main.css';

.hero-section {
	@apply min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-center text-center text-white relative overflow-hidden pt-16 sm:pt-10 mt-[-28px];
	width: 100vw;
	margin-left: calc(50% - 50vw);
	background:
		linear-gradient(135deg, rgba(231, 76, 60, 0), rgba(192, 57, 43, 0.1)),
		url("/assets/image/index/index-banner-bg.webp") center/cover;
}

.hero-overlay {
	@apply absolute top-0 left-0 right-0 bottom-0 z-[1];
	background-color: rgba(0, 0, 0, 0.4);
}

.hero-section::before {
	content: "";
	@apply absolute top-0 left-0 right-0 bottom-0;
	background: linear-gradient(
		45deg,
		transparent 30%,
		rgba(255, 255, 255, 0.1) 70%
	);
}

.hero-content {
	@apply relative z-[2] max-w-[1000px] my-[10px] mx-auto;
}

.hero-content h1 {
	@apply text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 rounded-[50px];
	text-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
}

.hero-content p {
	@apply text-base md:text-lg lg:text-[1.4rem] mb-10 text-white rounded-[50px] inline-block max-w-full;
	text-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
}

.search-bar {
	@apply flex flex-col sm:flex-row max-w-[600px] mx-auto bg-white/10 rounded-[50px] p-2 backdrop-blur-[10px];
}

.search-bar input {
	@apply flex-1 border-none bg-transparent py-[15px] px-5 text-[1.1rem] text-white outline-none;
}

.search-bar input::placeholder {
	@apply text-white/80;
}

.search-bar button {
	@apply bg-white text-black border-none py-[15px] px-4 sm:px-6 md:px-[30px] rounded-[50px] font-semibold cursor-pointer transition-all duration-300 ease-in-out mt-2 sm:mt-0;
}

.search-bar button:hover {
	@apply bg-white text-black;
}

.hero-stats {
	@apply flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-[60px] mt-[60px] pb-10;
}

.stat-item {
	@apply text-center;
}

.stat-number {
	@apply text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] font-extrabold block;
}

.stat-label {
	@apply text-sm sm:text-base opacity-80;
}
</style>
