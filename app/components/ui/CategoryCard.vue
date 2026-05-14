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
		class="group relative bg-white p-6 rounded-24 border border-slate-100 transition-all duration-500 hover:shadow-elevated hover:border-primary/20 hover:-translate-y-3 flex flex-col overflow-hidden"
	>
		<div
			class="w-full aspect-[4/3] rounded-18 overflow-hidden mb-8 relative bg-slate-50"
		>
			<img
				:src="category.image"
				:alt="category.name"
				class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
			>
		</div>

		<div class="px-2 pb-4">
			<div class="flex justify-between items-start mb-3">
				<h3 class="font-bold text-[22px] text-slate-900 group-hover:text-primary transition-colors">
					{{ category.name }}
				</h3>
				<div
					class="w-10 h-10 bg-slate-50 text-slate-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0"
				>
					<Icon name="ph:arrow-right-bold" class="text-base" />
				</div>
			</div>
			<p class="text-base text-slate-500 font-medium leading-relaxed">
				{{ category.description }}
			</p>
		</div>

		<div
			class="absolute top-8 right-8 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-bold uppercase tracking-widest text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0"
		>
			Khám phá
		</div>
	</NuxtLink>
</template>
