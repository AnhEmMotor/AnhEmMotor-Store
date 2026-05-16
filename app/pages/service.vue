<script setup>
import { ref } from 'vue';
const router = useRouter();

useSeoMeta({
	title: "Dịch vụ Xe Máy Chuyên Nghiệp | AnhEm Motor",
	description: "Bảo dưỡng, sửa chữa, thay lốp xe máy chính hãng tại AnhEm Motor. Quy trình chuyên nghiệp, giá cả minh bạch, bảo hành dài hạn.",
});

const maintenanceStore = useMaintenanceStore();
const activeCategory = ref('all');


await useAsyncData("maintenance-services-v2", async () => {
	await maintenanceStore.fetchServices();
	return maintenanceStore.services;
});

const handleFilter = (category) => {
	activeCategory.value = category;
};

const openBooking = (service) => {
	router.push({
		path: '/service-booking',
		query: { id: service?.id }
	});
};
</script>

<template>
	<div class="bg-white min-h-screen text-gray-900 overflow-x-hidden">
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




		<CommonScrollToTop />
	</div>
</template>



<style scoped>
/* Simplified layout */
</style>
