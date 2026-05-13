<script setup>


const route = useRoute();
const promotionStore = usePromotionStore();

const { data: promotion } = await useAsyncData(
	`promotion-detail-${route.params.slug}`,
	() => promotionStore.fetchPromotionBySlug(route.params.slug),
	{
		watch: [() => route.params.slug],
	},
);

const shareUrl = computed(() => {
	if (import.meta.client) return window.location.href;
	return "";
});

const formatDate = (dateString) => {
	if (!dateString) return "";
	const parts = dateString.split("/");
	if (parts.length === 3) {
		return `${parts[0]} tháng ${parts[1]} năm ${parts[2]}`;
	}
	return dateString;
};

watchEffect(() => {
	if (promotion.value) {
		useSeoMeta({
			title: `${promotion.value.fullTitle} | AnhEm Motor`,
			description:
				promotion.value.description ??
				"Chi tiết chương trình khuyến mãi từ AnhEm Motor.",
		});
	}
});

watch(
	() => route.params.slug,
	() => {
		if (import.meta.client) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
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
					class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6 rounded-r-lg"
				>
					<p class="font-semibold text-gray-800 flex items-center">
						<Icon
							name="fa6-regular:calendar-days"
							class="mr-3 text-yellow-600 text-xl"
						/>
						Thời gian áp dụng:
						<span class="text-primary-red ml-2">{{ promotion.duration }}</span>
					</p>
				</div>

				<div
					v-if="promotion.benefits && promotion.benefits.length > 0"
					class="my-8"
				>
					<h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
						<Icon name="fa6-solid:gift" class="mr-3 text-primary-red" />
						Chi tiết ưu đãi:
					</h3>
					<div class="space-y-6">
						<div
							v-for="(benefit, index) in promotion.benefits"
							:key="index"
							class="bg-gray-50 p-5 rounded-xl border-t-2 border-primary-red shadow-sm"
						>
							<h4 class="font-bold text-lg text-primary-red mb-3">
								{{ benefit.model }}
							</h4>
							<ul class="space-y-2">
								<li
									v-for="(option, optIndex) in benefit.options"
									:key="optIndex"
									class="flex items-start"
								>
									<Icon
										name="fa6-solid:circle-check"
										class="text-green-500 mr-3 mt-1"
									/>
									<span class="text-gray-700">{{ option }}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<CommonContactInfo
					v-if="promotion.contactInfo"
					:contact-info="promotion.contactInfo"
					:financial-companies="promotion.financialCompanies"
					description="Mọi thông tin liên quan đến Chương trình khuyến mại, khách hàng vui lòng liên hệ theo thông tin sau để được hướng dẫn, giải đáp:"
					closing-text="Xin trân trọng cảm ơn!"
				/>
			</div>
		</main>

		<div v-else class="container mx-auto px-4 py-20 text-center">
			<Icon
				name="fa6-solid:triangle-exclamation"
				class="text-6xl text-gray-400 mb-4"
			/>
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

.prose :deep(p) {
	margin-bottom: 1.25rem;
	line-height: 1.75;
	text-align: justify;
}

.prose :deep(strong) {
	font-weight: 700;
	color: #1f2937;
}
</style>
