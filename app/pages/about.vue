<script setup>
definePageMeta({
	transition: {
		name: "page",
		mode: "out-in",
	},
});

useSeoMeta({
	title: "Về chúng tôi | AnhEm Motor",
	description:
		"Tìm hiểu về AnhEm Motor - đại lý xe máy chính hãng uy tín hàng đầu.",
});

const aboutStore = useAboutStore();

await useAsyncData("about-content", async () => {
	await Promise.all([
		aboutStore.fetchAboutContent(),
		aboutStore.fetchLocations(),
	]);
	return true;
});

// Animation logic
if (import.meta.client) {
	onMounted(() => {
		const observerOptions = {
			threshold: 0.1,
			rootMargin: "0px 0px -50px 0px"
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('active');
				}
			});
		}, observerOptions);

		document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
	});
}
</script>

<template>
	<div v-if="aboutStore.aboutContent" class="about-page bg-white overflow-hidden">
		<AboutHeroSection :data="aboutStore.aboutContent" class="reveal" />
		
		<AboutMissionSection :data="aboutStore.aboutContent.mission" class="reveal reveal-delay-1" />
		
		<AboutServicesSection :data="aboutStore.aboutContent.services" class="reveal" />
		
		<AboutGallerySection class="reveal" />
		
		<AboutCommitmentSection :data="aboutStore.aboutContent.commitment" class="reveal" />

		<AboutWhyChooseUsSection :data="aboutStore.aboutContent.whyChooseUs" class="reveal" />
		
		<AboutContactSection :data="aboutStore.aboutContent.contact" class="reveal" />

		<AboutVideoSection :data="aboutStore.aboutContent.video" class="reveal" />

		<AboutMapSection :locations="aboutStore.locations" class="reveal" />
	</div>
</template>

