<script setup>
import { ref, onMounted } from "vue";
import { getAllPromotions } from "~/data/promotionData";

useSeoMeta({
	title: "Chương Trình Khuyến Mãi Xe Máy | AnhEm Motor",
	description: "Khám phá các chương trình khuyến mãi hấp dẫn từ AnhEm Motor.",
});

const promotions = ref([]);
onMounted(() => {
	promotions.value = getAllPromotions();
});
</script>

<template>
	<div class="bg-gray-50 min-h-screen">
		<PromotionBanner />
		<main class="container mx-auto px-4 py-12 md:py-16">
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
			>
				<div
					v-for="(promotion, index) in promotions"
					:key="promotion.id"
					class="animate-fade-in-up"
					:style="{ animationDelay: `${(index % 3) * 100}ms` }"
				>
					<PromotionCard :promotion="promotion" />
				</div>
			</div>
			<div v-if="promotions.length === 0" class="text-center py-20">
				<i class="fas fa-tags text-6xl text-gray-300 mb-4" />
				<h3 class="text-2xl font-bold text-gray-600 mb-2">
					Chưa có chương trình khuyến mãi
				</h3>
				<p class="text-gray-500">
					Vui lòng quay lại sau để cập nhật các ưu đãi mới nhất
				</p>
			</div>
		</main>
		<CommonScrollToTop />
	</div>
</template>

<style scoped>
@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-in-up {
	animation: fadeInUp 0.6s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
	opacity: 0;
}
</style>

