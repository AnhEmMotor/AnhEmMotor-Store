<script setup>
defineProps({
	isOpen: {
		type: Boolean,
		required: true,
	},
	videoUrl: {
		type: String,
		default: "",
	},
});

defineEmits(["close"]);
</script>

<template>
	<Transition
		enter-active-class="transition duration-300 ease-out"
		enter-from-class="opacity-0"
		enter-to-class="opacity-100"
		leave-active-class="transition duration-200 ease-in"
		leave-from-class="opacity-100"
		leave-to-class="opacity-0"
	>
		<div
			v-if="isOpen"
			class="fixed inset-0 z-[200] flex items-center justify-center p-4"
		>
			<div
				class="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
				@click="$emit('close')"
			/>

			<div
				class="relative w-full max-w-5xl aspect-video bg-black rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(220,38,38,0.3)] border border-white/10 group/modal"
			>
				<iframe
					v-if="videoUrl"
					:src="videoUrl + '?autoplay=1'"
					class="w-full h-full"
					frameborder="0"
					allow="
						accelerometer;
						autoplay;
						clipboard-write;
						encrypted-media;
						gyroscope;
						picture-in-picture;
					"
					allowfullscreen
				/>

				<button
					class="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md"
					@click="$emit('close')"
				>
					<Icon name="fa6-solid:xmark" class="text-xl" />
				</button>
			</div>
		</div>
	</Transition>
</template>
