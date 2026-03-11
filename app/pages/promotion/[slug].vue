<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getPromotionBySlug } from "~/data/promotionData";

const route = useRoute();
const promotion = ref(null);

const shareUrl = computed(() => {
	if (import.meta.client) return window.location.href;
	return "";
});

const formatDate = (dateString) => {
	const parts = dateString.split("/");
	if (parts.length === 3) {
		return `${parts[0]} tháng ${parts[1]} năm ${parts[2]}`;
	}
	return dateString;
};

const loadPromotion = () => {
	const slug = route.params.slug;
	promotion.value = getPromotionBySlug(slug);
	if (promotion.value) {
		useSeoMeta({
			title: `${promotion.value.fullTitle} | AnhEm Motor`,
			description:
				promotion.value.description ??
				"Chi tiết chương trình khuyến mãi từ AnhEm Motor.",
		});
	}
};

onMounted(() => {
	loadPromotion();
});
watch(
	() => route.params.slug,
	() => {
		loadPromotion();
		window.scrollTo({ top: 0, behavior: "smooth" });
	},
);
</script>

<template>
	<div class="bg-gray-50 min-h-screen pt-20 lg:pt-24">
		<main
			v-if="promotion"
			class="container mx-auto px-4 py-8 md:py-12 max-w-4xl"
		>
			<div
				class="bg-white rounded-xl shadow-xl p-6 md:p-10 mb-8 animate-fade-in"
			>
				<p class="text-center text-gray-500 text-sm mb-4">
					Ngày {{ formatDate(promotion.date) }}
				</p>
				<h1
					class="text-3xl md:text-4xl font-extrabold text-primary-red mb-6 text-center leading-tight"
				>
					{{ promotion.fullTitle }}
				</h1>
				<CommonSocialShare :url="shareUrl" :title="promotion.fullTitle" />
				<div class="prose prose-lg max-w-none mb-8">
					<div v-html="promotion.content" />
				</div>
				<PromotionCarousel
					v-if="promotion.carouselImages && promotion.carouselImages.length > 0"
					:images="promotion.carouselImages"
				/>
				<div
					v-if="promotion.duration"
					class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6"
				>
					<p class="font-semibold text-gray-800">
						<i class="far fa-calendar-alt mr-2 text-yellow-600" />
						Thời gian áp dụng:
						<span class="text-primary-red">{{ promotion.duration }}</span>
					</p>
				</div>
				<div
					v-if="promotion.benefits && promotion.benefits.length > 0"
					class="my-8"
				>
					<h3 class="text-xl font-bold text-gray-800 mb-4">Chi tiết ưu đãi:</h3>
					<div class="space-y-6">
						<div
							v-for="(benefit, index) in promotion.benefits"
							:key="index"
							class="border-l-4 border-primary-red pl-4"
						>
							<h4 class="font-bold text-lg text-primary-red mb-2">
								{{ benefit.model }}
							</h4>
							<ul class="space-y-2">
								<li
									v-for="(option, optIndex) in benefit.options"
									:key="optIndex"
									class="flex items-start"
								>
									<i class="fas fa-gift text-primary-red mr-3 mt-1" />
									<span>{{ option }}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<CommonContactInfo
					v-if="promotion.contactInfo"
					:contactInfo="promotion.contactInfo"
					:financialCompanies="promotion.financialCompanies"
					description="Mọi thông tin liên quan đến Chương trình khuyến mại, khách hàng vui lòng liên hệ theo thông tin sau để được hướng dẫn, giải đáp:"
					closingText="Xin trân trọng cảm ơn, Công ty Honda Việt Nam."
				/>
			</div>
		</main>

		<div v-else class="container mx-auto px-4 py-20 text-center">
			<i class="fas fa-exclamation-triangle text-6xl text-gray-400 mb-4" />
			<h2 class="text-2xl font-bold text-gray-800 mb-4">
				Không tìm thấy chương trình khuyến mãi
			</h2>
			<NuxtLink to="/promotion" class="text-primary-red hover:underline"
				>← Quay lại trang khuyến mãi</NuxtLink
			>
		</div>
		<CommonScrollToTop />
	</div>
</template>

<style scoped>
.text-primary-red {
	color: #e65151;
}
.border-primary-red {
	border-color: #e65151;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-in {
	animation: fadeIn 0.8s ease-out;
}

.prose {
	color: #374151;
}
.prose p {
	margin-bottom: 1rem;
	line-height: 1.75;
	text-align: justify;
}
.prose strong {
	font-weight: 700;
	color: #1f2937;
}
</style>
