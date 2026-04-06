<script setup>
defineProps({
	benefit: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div
		class="bg-white rounded-3xl p-6 border border-red-100 group hover:shadow-lg transition-all cursor-default"
	>
		<Icon
			:name="benefit.icon"
			class="text-3xl text-red-600 mb-2 group-hover:scale-110 transition-transform"
		/>
		<h4 class="font-bold text-sm text-slate-900">
			{{ benefit.title }}
		</h4>
		<p class="text-[10px] text-slate-500">
			{{ benefit.description }}
		</p>
	</div>
</template>
