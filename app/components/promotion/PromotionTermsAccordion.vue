<script setup>
const props = defineProps({
	terms: {
		type: Array,
		default: () => [],
	},
});

const activeIndex = ref(0);

const toggle = (index) => {
	activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
	<div class="space-y-4">
		<div 
			v-for="(term, index) in terms" 
			:key="index"
			class="bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-500"
			:class="{ 'shadow-xl shadow-gray-200/50 border-primary/20': activeIndex === index }"
		>
			<button 
				class="w-full px-8 py-6 flex items-center justify-between text-left group"
				@click="toggle(index)"
			>
				<span 
					class="text-sm font-black uppercase tracking-widest transition-colors"
					:class="activeIndex === index ? 'text-red-600' : 'text-gray-900 group-hover:text-red-600'"
				>
					{{ index + 1 }}. {{ term.title }}
				</span>
				<div 
					class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center transition-all duration-500"
					:class="{ 'rotate-180 bg-red-600 text-white': activeIndex === index }"
				>
					<Icon name="ph:caret-down-bold" class="text-sm" />
				</div>
			</button>

			<div 
				class="transition-all duration-500 ease-in-out overflow-hidden"
				:style="{ maxHeight: activeIndex === index ? '500px' : '0' }"
			>
				<div class="px-8 pb-8 text-gray-500 font-medium leading-relaxed">
					<div class="w-full h-[1px] bg-gray-50 mb-6"></div>
					{{ term.content }}
				</div>
			</div>
		</div>
	</div>
</template>
