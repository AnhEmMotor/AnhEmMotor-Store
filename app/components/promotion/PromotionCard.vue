<script setup>
defineProps({
	promotion: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<NuxtLink
		:to="`/promotion/${promotion.slug}`"
		class="block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col relative"
	>
		<div v-if="promotion.isHot" class="absolute top-4 left-4 z-10">
			<span
				class="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse"
			>
				Hot
			</span>
		</div>

		<div class="relative overflow-hidden aspect-[16/9]">
			<img
				:src="promotion.image"
				:alt="promotion.title"
				class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
			>
			<div
				class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
			>
				<span class="text-white text-sm font-semibold"
					>Xem chi tiết chương trình</span
				>
			</div>
		</div>

		<div class="p-6 flex flex-col flex-1">
			<div class="flex items-center text-gray-400 text-xs mb-3 font-medium">
				<Icon name="fa6-regular:calendar-days" class="mr-2" />
				{{ promotion.date }}
			</div>

			<h3
				class="text-xl font-bold text-gray-800 mb-3 leading-tight group-hover:text-primary-red transition-colors duration-300 line-clamp-2"
			>
				{{ promotion.title }}
			</h3>

			<p class="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
				{{ promotion.shortDescription }}
			</p>

			<div
				class="flex items-center text-primary-red font-bold text-sm group-hover:translate-x-2 transition-transform duration-300"
			>
				Khám phá ngay
				<Icon name="fa6-solid:chevron-right" class="ml-2 text-xs" />
			</div>
		</div>
	</NuxtLink>
</template>

<style scoped>
.text-primary-red {
	color: #e65151;
}
</style>
