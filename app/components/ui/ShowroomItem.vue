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
		<div class="space-y-3 flex-1">
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
					class="text-[10px] font-medium leading-tight"
					:class="isSelected ? 'text-white/60' : 'text-slate-400'"
				>
					{{ showroom.address }}
				</p>
			</div>

			<div v-if="isSelected" class="space-y-3 pt-2 animate-fade-in">
				<div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-400">
					<Icon name="fa6-solid:clock" />
					<span>{{ showroom.hours }}</span>
				</div>
				<div class="flex flex-wrap gap-2">
					<span v-for="s in showroom.services" :key="s" class="px-2 py-1 bg-white/10 rounded-md text-[8px] font-bold uppercase tracking-tighter">
						{{ s }}
					</span>
				</div>
				<a 
					:href="showroom.directionLink" 
					target="_blank"
					class="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-red-600 transition-all shadow-lg shadow-red-600/20"
					@click.stop
				>
					<Icon name="fa6-solid:route" />
					Chỉ đường ngay
				</a>
			</div>
		</div>
		<Icon
			v-if="!isSelected"
			name="fa6-solid:chevron-right"
			class="text-xl transition-all text-slate-200 group-hover/btn:translate-x-1"
		/>

	</button>
</template>

<style scoped>
@keyframes fade-in {
	from {
		opacity: 0;
		transform: translateY(5px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
.animate-fade-in {
	animation: fade-in 0.4s ease-out forwards;
}
</style>

