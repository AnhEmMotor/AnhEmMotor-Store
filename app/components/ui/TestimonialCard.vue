<script setup>
defineProps({
	testimonial: {
		type: Object,
		required: true,
	},
	index: {
		type: Number,
		default: 0,
	},
});
</script>

<template>
	<div
		class="bg-white p-8 rounded-[40px] border border-slate-100 hover:border-red-600/20 transition-all shadow-sm hover:shadow-xl relative md:ml-12 group"
	>
		<div
			class="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-slate-50 z-10 hidden md:flex items-center justify-center group-hover:border-red-600 transition-colors"
		>
			<div
				class="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-red-600 transition-colors"
			/>
		</div>

		<div class="flex justify-between items-start mb-6">
			<div class="flex items-center gap-4">
				<div
					:class="[
						'w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-3xl overflow-hidden shadow-xl border-4 border-white',
						index === 0 ? 'bg-red-600' : 'bg-slate-900',
					]"
				>
					<img
						v-if="testimonial.image"
						:src="testimonial.image"
						:alt="testimonial.name"
						class="w-full h-full object-cover"
					>
					<span v-else class="text-white font-black text-2xl uppercase">
						{{ testimonial.name[0] }}
					</span>
				</div>
				<div class="space-y-1">
					<h4 class="font-black text-slate-900 leading-none">
						{{ testimonial.name }}
					</h4>
					<p
						class="text-[10px] text-red-600 font-black uppercase tracking-widest"
					>
						{{ testimonial.car }}
					</p>
				</div>
			</div>
			<div
				class="text-[10px] text-slate-400 font-bold uppercase tracking-widest"
			>
				{{ testimonial.date }}
			</div>
		</div>
		<p class="text-[15px] text-slate-500 leading-relaxed font-medium italic">
			"{{ testimonial.comment }}"
		</p>
	</div>
</template>
