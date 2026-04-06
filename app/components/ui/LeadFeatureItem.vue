<script setup>
defineProps({
	icon: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<div class="flex items-center gap-2">
		<Icon :name="icon" class="text-red-600" />
		{{ text }}
	</div>
</template>
