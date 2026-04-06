<script setup>
defineProps({
	service: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="flex flex-col items-start gap-8 group">
		<div
			class="w-20 h-20 bg-slate-50 text-slate-900 rounded-[30px] flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white group-hover:-translate-y-2 transition-all duration-500 shadow-inner"
		>
			<Icon :name="service.icon" class="text-3xl" />
		</div>
		<div class="space-y-3">
			<h4 class="font-black text-xl uppercase tracking-tight">
				{{ service.title }}
			</h4>
			<p class="text-sm text-slate-400 leading-relaxed font-medium">
				{{ service.desc }}
			</p>
			<div class="w-10 h-1 bg-red-600 transition-all group-hover:w-full" />
		</div>
	</div>
</template>
