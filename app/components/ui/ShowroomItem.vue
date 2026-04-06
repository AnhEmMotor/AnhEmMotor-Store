<script setup>
defineProps({
	showroom: {
		type: Object,
		required: true,
	},
	isSelected: {
		type: Boolean,
		default: false,
	},
});

defineEmits(["select"]);
</script>

<template>
	<button
		:class="[
			'w-full text-left p-6 rounded-[35px] transition-all border-2 flex items-center justify-between group/btn',
			isSelected
				? 'bg-slate-900 border-slate-900 text-white shadow-2xl'
				: 'bg-white border-slate-100 text-slate-400 hover:border-slate-200',
		]"
		@click="$emit('select', showroom)"
	>
		<div class="space-y-1">
			<h4
				:class="[
					'font-black uppercase tracking-widest text-sm',
					isSelected
						? 'text-red-500'
						: 'text-slate-900 group-hover/btn:text-red-600',
				]"
			>
				{{ showroom.city }}
			</h4>
			<p
				class="text-[10px] font-medium leading-tight max-w-[200px]"
				:class="isSelected ? 'text-white/60' : 'text-slate-400'"
			>
				{{ showroom.address }}
			</p>
		</div>
		<Icon
			:name="isSelected ? 'fa6-solid:location-dot' : 'fa6-solid:chevron-right'"
			:class="[
				'text-xl transition-all',
				isSelected
					? 'text-red-500 scale-125'
					: 'text-slate-200 group-hover/btn:translate-x-1',
			]"
		/>
	</button>
</template>
