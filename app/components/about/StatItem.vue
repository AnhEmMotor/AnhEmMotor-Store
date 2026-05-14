<script setup>
defineProps({
	value: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<div class="space-y-4">
		<div class="text-5xl md:text-7xl font-black text-[#f84a5e] drop-shadow-[0_0_20px_rgba(248,74,94,0.3)]">
			{{ value }}
		</div>
		<div class="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">
			{{ label }}
		</div>
	</div>
</template>
