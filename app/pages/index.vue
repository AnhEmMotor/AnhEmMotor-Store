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
	<div class="home-page space-y-0">
		<!-- 1. HERO BANNER -->
		<IndexHeroSection />
		
		<!-- 2. USP / LÝ DO CHỌN BẠN -->
		<IndexUSPSection />
		
		<!-- 3. DANH MỤC SẢN PHẨM -->
		<IndexProductCategories />
		
		<!-- 4. SẢN PHẨM NỔI BẬT -->
		<IndexFeaturedProducts />
		
		<!-- 5. CHƯƠNG TRÌNH TRẢ GÓP -->
		<IndexSalesEnablers />
		
		<!-- 6. ƯU ĐÃI / KHUYẾN MÃI -->
		<IndexPromotionsSection />
		
		<!-- 7. VIDEO / REVIEW THỰC TẾ -->
		<IndexReelsShowcase />
		
		<!-- 8. LÝ DO / CAM KẾT DOANH NGHIỆP -->
		<IndexCommitmentSection />
		
		<!-- 9. REVIEW KHÁCH HÀNG -->
		<IndexTestimonialSection />
		
		<!-- 10. HỆ THỐNG SHOWROOM -->
		<IndexShowroomSection />
		
		<!-- 11. BLOG / KIẾN THỨC -->
		<IndexNewsSEO />
		
		<!-- 12. CTA CUỐI -->
		<IndexLeadFooter />
		
		<!-- 13. FLOATING COMPONENTS -->
		<IndexCompareBar />
	</div>



</template>

<style scoped>
@reference "../assets/main.css";

.home-page {
	@apply bg-white text-slate-900;
}
</style>
