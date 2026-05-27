<template>
	<div class="sticky top-[64px] lg:top-[72px] z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] w-full py-2.5 font-['Manrope']">
		<!-- Mobile: Horizontal Scroll with Full Visibility -->
		<div
			ref="scrollContainer"
			class="flex overflow-x-auto lg:hidden no-scrollbar scroll-smooth px-4 gap-2 py-1.5"
			@touchstart="handleTouchStart"
			@touchmove="handleTouchMove"
		>
			<button
				v-for="cat in categories"
				:key="cat.id"
				class="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 group min-w-[120px] border-2 relative snap-start"
				:class="[
					activeCategory === cat.id
					? 'bg-primary text-white shadow-lg shadow-primary/30 border-primary scale-105'
					: 'bg-white text-gray-500 border-gray-200 hover:border-primary/20 hover:text-primary'
				]"
				@click="$emit('filter', cat.id)"
			>
				<Icon
					:name="cat.icon"
					class="text-base transition-transform duration-300 group-hover:scale-110"
					:class="activeCategory === cat.id ? 'text-white' : 'text-gray-400 group-hover:text-primary'"
				/>
				<span class="whitespace-nowrap">{{ cat.label }}</span>
				<div v-if="activeCategory === cat.id" class="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#fff] animate-pulse"/>
			</button>
		</div>

		<!-- Desktop: Centered Grid Layout -->
		<div class="hidden lg:flex justify-center">
			<div class="flex flex-wrap items-center justify-center gap-2.5 p-1.5 bg-gray-50/50 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-sm max-w-5xl">
				<button
					v-for="cat in categories"
					:key="cat.id"
					class="flex items-center gap-2.5 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 group relative"
					:class="[
						activeCategory === cat.id
						? 'bg-primary text-white shadow-lg scale-105 z-20 shadow-primary/20'
						: 'text-gray-400 hover:text-gray-900 hover:bg-white'
					]"
					@click="$emit('filter', cat.id)"
				>
					<Icon
						:name="cat.icon"
						class="text-base transition-transform duration-500 group-hover:scale-110"
						:class="activeCategory === cat.id ? 'text-white' : 'text-gray-400 group-hover:text-primary'"
					/>
					{{ cat.label }}
					<div v-if="activeCategory === cat.id" class="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff]"/>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
	activeCategory: {
		type: String,
		default: 'all'
	}
});

defineEmits(['filter']);

const scrollContainer = ref(null);
let scrollStartX = 0;
let scrollLeft = 0;

const handleTouchStart = (e) => {
	scrollStartX = e.touches[0].clientX;
	scrollLeft = scrollContainer.value.scrollLeft;
};

const handleTouchMove = (e) => {
	const deltaX = scrollStartX - e.touches[0].clientX;
	scrollContainer.value.scrollLeft = scrollLeft + deltaX;
};

const categories = [
	{ id: 'all', label: 'Tất cả dịch vụ', icon: 'ph:grid-four-fill' },
	{ id: 'maintenance', label: 'Bảo dưỡng', icon: 'ph:wrench-fill' },
	{ id: 'repair', label: 'Sửa chữa', icon: 'ph:gear-fill' },
	{ id: 'tires', label: 'Lốp xe', icon: 'ph:tire-fill' },
	{ id: 'cleaning', label: 'Vệ sinh', icon: 'ph:sparkle-fill' },
	{ id: 'electrical', label: 'Hệ thống điện', icon: 'ph:lightning-fill' }
];
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
	display: none;
}
.no-scrollbar {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
</style>
