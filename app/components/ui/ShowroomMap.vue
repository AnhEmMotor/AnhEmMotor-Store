<script setup>
defineProps({
	showroom: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div
		class="rounded-[24px] md:rounded-[50px] overflow-hidden h-full border-4 md:border-[10px] border-white shadow-xl md:shadow-[0_50px_100px_-30px_rgba(0,0,0,0.15)] relative"
	>
		<Transition name="fade" mode="out-in">
			<iframe
				:key="showroom.city"
				:title="`Bản đồ showroom tại ${showroom.city}`"
				:src="showroom.map"
				width="100%"
				height="100%"
				style="border: 0"
				allowfullscreen
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			/>
		</Transition>
	</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
