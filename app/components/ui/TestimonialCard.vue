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
		class="bg-white p-8 md:p-10 rounded-24 border border-slate-100 hover:border-primary/20 transition-all duration-500 shadow-soft hover:shadow-elevated relative group"
	>
		<div class="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
			<div class="flex items-center gap-5">
				<div
					class="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-24 overflow-hidden shadow-soft border-4 border-white bg-slate-50 shrink-0"
				>
					<img
						v-if="testimonial.image"
						:src="testimonial.image"
						:alt="testimonial.name"
						class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
					>
					<span v-else class="text-slate-400 font-bold text-2xl uppercase">
						{{ testimonial.name[0] }}
					</span>
				</div>
				<div class="space-y-1.5">
					<h4 class="font-bold text-lg text-slate-900 leading-none">
						{{ testimonial.name }}
					</h4>
					<p
						class="text-xs text-primary font-bold uppercase tracking-widest"
					>
						{{ testimonial.car }}
					</p>
				</div>
			</div>
			<div
				class="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full"
			>
				{{ testimonial.date }}
			</div>
		</div>
		<p class="text-base text-slate-500 leading-relaxed font-medium italic">
			"{{ testimonial.comment }}"
		</p>

        <div class="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
            <Icon name="ph:quotes-fill" class="text-xl" />
        </div>
	</div>
</template>
