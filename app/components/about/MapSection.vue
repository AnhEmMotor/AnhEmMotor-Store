<script setup>
defineProps({
	locations: {
		type: Array,
		required: true,
	},
});

const searchLocation = (address) => {
	const encodedAddress = encodeURIComponent(address);
	const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
	window.open(searchUrl, "_blank");
};
</script>

<template>
	<section class="py-24 bg-gray-50">
		<div class="max-w-7xl mx-auto px-6">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight">
					Ghé Thăm Cửa Hàng
				</h2>
				<p class="text-xl text-gray-500 max-w-2xl mx-auto">
					Chào đón bạn đến với không gian trải nghiệm xe máy chuyên nghiệp và tận tâm.
				</p>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
				<!-- Map Column (65% approx) -->
				<div class="lg:col-span-8 rounded-[28px] overflow-hidden shadow-2xl h-[400px] md:h-[650px] border-[12px] border-white relative group">
					<iframe
						id="mapFrame"
						class="w-full h-full border-none grayscale-[0.2] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.290626800085!2d106.6974457!3d10.7928445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528cb61921c23%3A0x7d01878d6556f8f5!2zQW5oRW0gTW90b3I!5e0!3m2!1svi!2s!4v1709123456789!5m2!1svi!2s"
						allowfullscreen=""
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
					/>
				</div>

				<!-- Info Column (35% approx) -->
				<div class="lg:col-span-4 space-y-6">
					<AboutLocationInfo 
						address="123 Lê Văn Sỹ, Phường 13, Quận Phú Nhuận, TP. Hồ Chí Minh"
						hotline="0901.234.567"
						@search="searchLocation"
					/>

					

				</div>
			</div>
		</div>
	</section>
</template>


