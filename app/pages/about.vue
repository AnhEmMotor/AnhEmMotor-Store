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
	<div v-if="aboutStore.aboutContent" class="about-page">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
			<AboutMissionSection :data="aboutStore.aboutContent.mission" />
			<AboutServicesSection :data="aboutStore.aboutContent.services" />
			<AboutCommitmentSection :data="aboutStore.aboutContent.commitment" />
			<AboutWhyChooseUsSection :data="aboutStore.aboutContent.whyChooseUs" />
			<AboutContactSection :data="aboutStore.aboutContent.contact" />
		</div>
		<AboutVideoSection :data="aboutStore.aboutContent.video" />
		<AboutMapSection :locations="aboutStore.locations" />
	</div>
</template>
