<script setup>
import { useHomeStore } from "@/stores/home.store";

const homeStore = useHomeStore();
await homeStore.fetchHomeData();

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
	<div class="home-page">
		<IndexHeroSection />
		<IndexQuickSearch />
		<IndexStatsSection />
		<IndexProductCategories />
		<IndexFeaturedProducts />
		<IndexReelsShowcase />
		<IndexSalesEnablers />
		<IndexTrustBuilding />
		<IndexNewsSEO />
		<IndexLeadFooter />
		<IndexCompareBar />
	</div>
</template>

<style scoped>
@reference "../assets/main.css";

.home-page {
	@apply bg-white text-slate-900;
}
</style>
