<script setup>
import { useMaintenanceStore } from "@/stores/maintenance.store";

useSeoMeta({
	title: "Dịch vụ | AnhEm Motor",
	description:
		"Các dịch vụ bảo dưỡng, sửa chữa xe máy chuyên nghiệp tại AnhEm Motor.",
});

const maintenanceStore = useMaintenanceStore();

// SSR Fetching
await useAsyncData("maintenance-services", () =>
	maintenanceStore.fetchServices(),
);

onMounted(() => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
				}
			});
		},
		{ threshold: 0.1 },
	);

	if (import.meta.client) {
		document.querySelectorAll(".fade-in").forEach((el) => {
			observer.observe(el);
		});
	}
});
</script>

<template>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 bg-white min-h-screen">
		<ServiceHero />
		<ServiceList :services="maintenanceStore.services" />
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

.animate-fadeInUp {
	animation: fadeInUp 1s;
}

.animation-delay-200 {
	animation-delay: 0.2s;
	animation-fill-mode: both;
}

/* Các class fade-in được quản lý bởi IntersectionObserver trong script setup hoặc component con */
:deep(.fade-in) {
	opacity: 0;
	transform: translateY(30px);
	transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.fade-in.visible) {
	opacity: 1;
	transform: translateY(0);
}
</style>
