<script setup>
defineProps({
	services: {
		type: Array,
		required: true,
	},
});
</script>

<template>
	<section id="services" class="py-10 sm:py-16 md:py-20 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
			<h2
				class="section-title fade-in text-center text-3xl sm:text-4xl mb-4 sm:mb-8 relative"
			>
				Dịch Vụ Của Chúng Tôi
				<span
					class="absolute bottom-[-12px] sm:bottom-[-16px] left-1/2 -translate-x-1/2 w-20 h-1 bg-red-600 rounded-sm"
					aria-hidden="true"
				/>
			</h2>
			<div
				class="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 mt-10 sm:mt-16"
			>
				<ServiceCard
					v-for="(service, index) in services"
					:key="index"
					:service="service"
				/>
			</div>
		</div>
	</section>
</template>

<style scoped>
.section-title {
	font-weight: 700;
	color: #1f2937;
}

.fade-in {
	opacity: 0;
	transform: translateY(30px);
	transition: all 0.6s;
}

.fade-in.visible {
	opacity: 1;
	transform: translateY(0);
}
</style>
