<script setup>
defineProps({
	reel: {
		type: Object,
		required: true,
	},
});

defineEmits(["play"]);
</script>

<template>
	<div
		class="group relative aspect-[9/16] rounded-24 overflow-hidden bg-slate-100 cursor-pointer shadow-soft hover:shadow-elevated hover:-translate-y-2 transition-all duration-500"
		@click="$emit('play', reel.videoUrl)"
	>
		<img
			:src="reel.thumbnail"
			:alt="reel.title"
			class="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
		>

		<div
			class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"
		/>

		<div
			class="absolute inset-0 flex items-center justify-center"
		>
			<div
				class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/40 scale-75 group-hover:scale-100 transition-all duration-500 opacity-0 group-hover:opacity-100"
			>
				<Icon name="ph:play-fill" class="text-3xl ml-1" />
			</div>
		</div>

		<div class="absolute bottom-0 left-0 w-full p-3 sm:p-6 space-y-2 sm:space-y-3">
			<div class="flex items-center gap-2 sm:gap-3">
				<span
					class="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-primary text-white text-[8px] sm:text-[10px] font-bold rounded-lg"
				>
					{{ reel.duration }}
				</span>
				<span
					class="text-white/80 text-[8px] sm:text-[10px] font-bold flex items-center gap-1.5"
				>
					<Icon name="ph:eye-bold" />
					{{ reel.views }}
				</span>
			</div>
			<h3
				class="text-white font-bold text-xs sm:text-base line-clamp-2 leading-tight group-hover:text-primary transition-colors"
			>
				{{ reel.title }}
			</h3>
		</div>
	</div>
</template>

<style scoped>
.line-clamp-2 {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
