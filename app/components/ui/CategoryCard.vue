<script setup>
defineProps({
	category: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<NuxtLink
		:to="category.path"
		class="group relative bg-white p-6 rounded-[40px] border border-slate-100 transition-all hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden"
	>
		<div
			:class="[
				'w-full aspect-[16/10] rounded-[32px] flex items-center justify-center transition-all duration-500 mb-4 relative z-10 overflow-hidden',
				category.bgColor,
			]"
		>
			<img
				:src="category.image"
				:alt="category.name"
				class="w-3/4 h-3/4 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
			>

			<div
				class="absolute -bottom-4 -right-4 w-16 h-16 bg-white/20 blur-xl rounded-full"
			/>
		</div>

		<div class="relative z-10 space-y-1">
			<h3 class="font-black text-lg text-slate-900 uppercase tracking-tight">
				{{ category.name }}
			</h3>
			<p class="text-[12px] text-slate-500 font-medium leading-tight">
				{{ category.description }}
			</p>
		</div>

		<div
			class="mt-4 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
		>
			<Icon name="fa6-solid:arrow-right" class="text-xs" />
		</div>

		<div
			class="absolute bottom-0 left-0 w-full h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"
		/>
	</NuxtLink>
</template>
