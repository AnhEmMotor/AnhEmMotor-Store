<template>
	<Teleport to="body">
		<Transition
			enter-active-class="transition duration-300 ease-out"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="transition duration-200 ease-in"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div v-if="isOpen" class="fixed inset-0 z-[3000] flex items-center justify-center p-4">
				<div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="$emit('close')"></div>
				
				<Transition
					enter-active-class="transition duration-500 ease-out"
					enter-from-class="opacity-0 scale-95 translate-y-8"
					enter-to-class="opacity-100 scale-100 translate-y-0"
					leave-active-class="transition duration-300 ease-in"
					leave-from-class="opacity-100 scale-100 translate-y-0"
					leave-to-class="opacity-0 scale-95 translate-y-8"
				>
					<div v-if="isOpen" class="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
						<button 
							@click="$emit('close')" 
							class="absolute right-6 top-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all z-10"
						>
							<Icon name="fa6-solid:xmark" class="text-lg" />
						</button>
						
						<div class="p-8 sm:p-12">
							<slot />
						</div>
					</div>
				</Transition>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
const props = defineProps({
	isOpen: {
		type: Boolean,
		required: true
	}
});

defineEmits(['close']);

// Lock scroll when open
watch(() => props.isOpen, (val) => {
	if (val) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = '';
	}
});

onBeforeUnmount(() => {
	document.body.style.overflow = '';
});
</script>
