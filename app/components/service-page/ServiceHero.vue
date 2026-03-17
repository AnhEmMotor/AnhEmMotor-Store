<template>
	<section
		id="home"
		class="relative w-screen left-1/2 -translate-x-1/2 bg-cover bg-center bg-no-repeat text-white text-center py-32 sm:py-40 md:py-48 lg:py-[225px] mb-10 mt-[-16px]"
		:style="{ backgroundImage: `url(${heroImage})` }"
	>
		<div class="absolute inset-0 bg-black/50" />
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
			<div class="hero-content">
				<h1
					class="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] mb-4 text-white animate-fadeInUp"
				>
					Dịch Vụ Xe Máy Chuyên Nghiệp
				</h1>
				<p
					class="text-base sm:text-lg md:text-xl lg:text-[1.3rem] mb-8 text-white animate-fadeInUp animation-delay-200"
				>
					Chăm sóc xe máy của bạn với dịch vụ tốt nhất tại Việt Nam
				</p>
				<a
					href="#services"
					class="inline-block bg-red-600 text-white py-3 px-8 sm:py-4 sm:px-10 rounded-full font-bold no-underline transition-all duration-300 shadow-[0_8px_25px_rgba(220,38,38,0.3)] cursor-pointer hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(220,38,38,0.4)] text-sm sm:text-base"
					@click.prevent="scrollToServices"
				>
					Xem Dịch Vụ
				</a>
			</div>
		</div>
	</section>
</template>

<script setup>
const heroImage =
	"/assets/image/index/service-page/pngtree-auto-mechanic-working-in-garage-repair-service-image_15647943.webp";
const scrollToServices = (e) => {
	e.preventDefault();
	const target = document.querySelector("#services");
	if (target) {
		target.scrollIntoView({ behavior: "smooth", block: "start" });
	}
};
</script>
