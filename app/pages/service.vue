<script setup>
import { ref } from 'vue';

useSeoMeta({
	title: "Dịch vụ Xe Máy Chuyên Nghiệp | AnhEm Motor",
	description: "Bảo dưỡng, sửa chữa, thay lốp xe máy chính hãng tại AnhEm Motor. Quy trình chuyên nghiệp, giá cả minh bạch, bảo hành dài hạn.",
});

const maintenanceStore = useMaintenanceStore();
const activeCategory = ref('all');
const isBookingModalOpen = ref(false);
const selectedService = ref(null);

await useAsyncData("maintenance-services", () =>
	maintenanceStore.fetchServices(),
);

const handleFilter = (category) => {
	activeCategory.value = category;
};

const openBooking = (service) => {
	selectedService.value = service;
	isBookingModalOpen.value = true;
};
</script>

<template>
	<div class="bg-white min-h-screen font-['Be_Vietnam_Pro'] text-gray-900 overflow-x-hidden">
		<!-- [1] HERO -->
		<ServiceHero />


		<!-- [2] FILTER BAR -->
		<ServiceFilterBar 
			:active-category="activeCategory" 
			@filter="handleFilter" 
		/>




		<!-- [3] SERVICES GRID -->
		<ServiceList 
			:services="maintenanceStore.services" 
			:active-category="activeCategory"
			@book="openBooking"
			@reset-filter="activeCategory = 'all'"
		/>


		<!-- [4] QUY TRÌNH PHỤC VỤ -->
		<ServiceProcess />


		<!-- Booking Modal Unified -->
		<ProductBookingModal 
			v-if="isBookingModalOpen" 
			:is-open="isBookingModalOpen"
			:variant="{ id: selectedService?.id, name: selectedService?.name || 'Tư vấn bảo dưỡng' }"
			type="Maintenance"
			@close="isBookingModalOpen = false"
		/>

		<CommonScrollToTop />
	</div>
</template>



<style scoped>
/* Simplified layout */
</style>
