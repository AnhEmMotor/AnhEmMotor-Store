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
				
				<div class="lg:col-span-8 rounded-[28px] overflow-hidden shadow-2xl h-[400px] md:h-[650px] border-[12px] border-white relative group">
					<iframe
						id="mapFrame"
						class="w-full h-full border-none grayscale-[0.2] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.15452442564!2d106.8336939!3d10.93762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174df8850f50511%3A0x852d023377c2fbe1!2sFPT%20PolySchool%20%C4%90%C3%B2ng%20Nai%20(%C6%A1%20s%E1%BB%9F%202)!5e0!3m2!1svn!2s!4v1716450000000!5m2!1svn!2s"
						allowfullscreen=""
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
					/>
				</div>

				
				<div class="lg:col-span-4 space-y-6">
					<AboutLocationInfo 
						address="193 Đỗ Văn Thi, Trấn Biên, Đồng Nai 76126, Việt Nam"
						hotline="0901.234.567"
						@search="searchLocation"
					/>

					

				</div>
			</div>
		</div>
	</section>
</template>


