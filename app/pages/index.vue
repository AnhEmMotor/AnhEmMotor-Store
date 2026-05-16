<script setup>
const homeStore = useHomeStore();

const newsStore = useNewsStore();

await Promise.all([
	homeStore.fetchHomeData(),
	newsStore.fetchFeaturedNews(),
]);

useSeoMeta({
	title: "Trang chủ",
	ogImage: "/assets/image/index/index-banner-bg.png",
	twitterTitle: "Trang chủ",
	twitterDescription:
		"AnhEm Motor - Chuyên cung cấp xe máy, phụ tùng, phụ kiện chính hãng.",
	twitterImage: "/assets/image/index/index-banner-bg.png",
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
        <IndexPersonalizedRecommendations />
		<IndexBrandSection />
		<IndexReelsShowcase />
		<IndexSalesEnablers />
		<IndexTrustBuilding />
		<IndexNewsSEO />
		<IndexLeadFooter />
		<ProductCompareBar />
	</div>
</template>


<style scoped>
.home-page {
	background-color: white;
	color: #0f172a;
}
</style>
