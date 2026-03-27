<script setup>
defineProps({
	service: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div
		class="fade-in bg-white p-6 sm:p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col h-full"
	>
		<span class="block text-4xl sm:text-5xl mb-4">{{ service.icon }}</span>
		<h3 class="text-xl sm:text-2xl mb-4 text-gray-800 font-bold">
			{{ service.title }}
		</h3>
		<p class="text-sm sm:text-base text-gray-600 mb-4">
			{{ service.description }}
		</p>
		<div class="text-lg sm:text-xl font-bold text-red-600 mb-6">
			{{ service.price }}
		</div>
		<ul class="list-none pl-0 space-y-2">
			<li
				v-for="(feature, index) in service.features"
				:key="index"
				class="text-sm sm:text-base text-gray-700 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold"
			>
				{{ feature }}
			</li>
		</ul>
	</div>
</template>

<style scoped>
.fade-in {
	opacity: 0;
	transform: translateY(30px);
	transition: all 0.6s;
}

.fade-in.visible {
	opacity: 1;
	transform: translateY(0);
}
</style>
