<script setup lang="ts">
useSeoMeta({
	title: "Trang chủ",
	description:
		"AnhEm Motor - Chuyên cung cấp xe máy, phụ tùng, phụ kiện chính hãng.",
	ogTitle: "Trang chủ",
	ogDescription:
		"AnhEm Motor - Chuyên cung cấp xe máy, phụ tùng, phụ kiện chính hãng.",
	ogImage: "/assets/image/index/index-banner-bg.webp",
	twitterTitle: "Trang chủ",
	twitterDescription:
		"AnhEm Motor - Chuyên cung cấp xe máy, phụ tùng, phụ kiện chính hãng.",
	twitterImage: "/assets/image/index/index-banner-bg.webp",
	twitterCard: "summary_large_image",
});

useHead({
	link: [
		{
			rel: "icon",
			type: "image/x-icon",
			href: "/favicon.ico",
		},
	],
});
</script>

<template>
	<main class="home-page">
		<IndexTheBanner />
		<IndexSeoContent />
		<IndexBrandSection />
		<IndexAboutUs />
	</main>
</template>
