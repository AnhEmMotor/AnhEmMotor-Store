<script setup>



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
</script>

<template>
	<div v-if="aboutStore.aboutContent" class="about-page bg-white">
		<AboutHeroSection :data="aboutStore.aboutContent" />
		
		<AboutMissionSection :data="aboutStore.aboutContent.mission" />
		
		<AboutServicesSection :data="aboutStore.aboutContent.services" />
		
		<AboutGallerySection />
		
		<AboutCommitmentSection :data="aboutStore.aboutContent.commitment" />

		
		<AboutWhyChooseUsSection :data="aboutStore.aboutContent.whyChooseUs" />
		
		<AboutMapSection :locations="aboutStore.locations" />

	</div>
</template>
