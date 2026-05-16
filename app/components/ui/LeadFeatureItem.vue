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
		<ClientOnly>
			<Icon :name="icon" class="text-red-600" />
		</ClientOnly>
		{{ text }}
	</div>
</template>
