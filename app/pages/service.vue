<script setup>
useSeoMeta({
	title: "Dịch vụ | AnhEm Motor",
	description:
		"Các dịch vụ bảo dưỡng, sửa chữa xe máy chuyên nghiệp tại AnhEm Motor.",
});

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
	document.querySelectorAll(".fade-in").forEach((el) => {
		observer.observe(el);
	});
});
</script>

<template>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
		<ServiceHero />
		<ServiceList />
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
