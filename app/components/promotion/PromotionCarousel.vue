<script setup>
defineProps({
	images: {
		type: Array,
		required: true,
	},
});
</script>

<template>
	<div class="promotion-carousel my-10">
		<Swiper
			:modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
			:slides-per-view="1"
			:loop="true"
			:autoplay="{
				delay: 4000,
				disableOnInteraction: false,
			}"
			:pagination="{ clickable: true }"
			:navigation="true"
			class="rounded-2xl shadow-2xl overflow-hidden border-4 border-white"
		>
			<SwiperSlide v-for="(image, index) in images" :key="index">
				<div class="aspect-video relative group">
					<img
						:src="image"
						alt="Promotion Detail Image"
						class="w-full h-full object-cover"
					>
					<div
						class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"
					/>
				</div>
			</SwiperSlide>
		</Swiper>
	</div>
</template>

<style scoped>
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
	color: #e65151;
	background: white;
	width: 45px;
	height: 45px;
	border-radius: 50%;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
	font-size: 1.2rem;
	font-weight: bold;
}

:deep(.swiper-pagination-bullet-active) {
	background: #e65151;
	width: 25px;
	border-radius: 5px;
	transition: all 0.3s;
}
</style>
