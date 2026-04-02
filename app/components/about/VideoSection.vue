<script setup>
defineProps({
	data: {
		type: Object,
		required: true,
	},
});

const allowAttributes =
	"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
</script>

<template>
	<section
		class="py-10 sm:py-16 mb-6 sm:mb-10 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative w-screen left-1/2 -translate-x-1/2"
	>
		<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
			<h2
				class="text-3xl md:text-4xl text-center mb-4 font-bold text-white drop-shadow-md"
			>
				{{ data.title }}
			</h2>
			<p class="text-center text-lg text-gray-300 mb-8 sm:mb-10">
				{{ data.subtitle }}
			</p>

			<div
				class="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
			>
				<iframe
					class="absolute inset-0 w-full h-full border-none rounded-2xl"
					:src="data.url"
					title="Video Trailer"
					frameborder="0"
					:allow="allowAttributes"
					allowfullscreen
				/>
			</div>
		</div>
	</section>
</template>
