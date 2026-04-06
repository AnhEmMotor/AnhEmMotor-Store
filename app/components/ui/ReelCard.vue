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
		class="group relative aspect-[9/16] rounded-[32px] overflow-hidden bg-slate-100 cursor-pointer shadow-xl hover:-translate-y-2 transition-all duration-500"
		@click="$emit('play', reel.videoUrl)"
	>
		<img
			:src="reel.thumbnail"
			:alt="reel.title"
			class="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
		>

		<div
			class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
		/>

		<div
			class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
		>
			<div
				class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 scale-75 group-hover:scale-100 transition-transform duration-500"
			>
				<Icon name="fa6-solid:play" class="text-white text-2xl ml-1" />
			</div>
		</div>

		<div class="absolute bottom-0 left-0 w-full p-6 space-y-2">
			<div class="flex items-center gap-3">
				<span
					class="px-2 py-1 bg-red-600 text-white text-[9px] font-black rounded-lg"
				>
					{{ reel.duration }}
				</span>
				<span
					class="text-white/70 text-[10px] font-bold flex items-center gap-1"
				>
					<Icon name="fa6-solid:eye" class="text-[8px]" />
					{{ reel.views }} lượt xem
				</span>
			</div>
			<h3
				class="text-white font-bold text-sm line-clamp-2 leading-snug group-hover:text-red-400 transition-colors"
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
