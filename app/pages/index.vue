<script setup lang="ts">
useSeoMeta({
	title: "Trang chủ",
	ogImage: "/assets/image/index/index-banner-bg.webp",
	twitterTitle: "Trang chủ",
	twitterDescription:
		"AnhEm Motor - Chuyên cung cấp xe máy, phụ tùng, phụ kiện chính hãng.",
	twitterImage: "/assets/image/index/index-banner-bg.webp",
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
