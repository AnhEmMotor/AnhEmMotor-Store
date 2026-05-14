<script setup>
defineProps({
	service: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="bg-white p-8 rounded-24 border border-slate-100 shadow-soft hover:shadow-elevated hover:-translate-y-2 transition-all duration-500 group">
		<div
			class="w-16 h-16 bg-primary/5 text-primary rounded-18 flex items-center justify-center shrink-0 mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500"
		>
			<Icon :name="service.icon" class="text-3xl" />
		</div>
		<div class="space-y-3">
			<h4 class="font-bold text-xl text-slate-900 group-hover:text-primary transition-colors">
				{{ service.title }}
			</h4>
			<p class="text-base text-slate-500 leading-relaxed font-medium">
				{{ service.desc }}
			</p>
		</div>
	</div>
</template>
