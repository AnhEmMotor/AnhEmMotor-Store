<template>
	<div class="sticky top-[64px] lg:top-[72px] z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)]">
		<div class="max-w-7xl mx-auto px-6 lg:px-10">
			<div class="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar relative">
				<button 
					v-for="cat in categories" 
					:key="cat.id"
					@click="$emit('filter', cat.id)"
					:class="[
						'relative px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap z-10',
						activeCategory === cat.id 
							? 'text-white' 
							: 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
					]"
				>
					<span class="relative z-10">{{ cat.label }}</span>
					<!-- Active Indicator Pill -->
					<div 
						v-if="activeCategory === cat.id"
						class="absolute inset-0 bg-primary rounded-2xl shadow-[0_10px_25px_-5px_rgba(230,0,35,0.4)] z-0 animate-pill-grow"
					></div>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
defineProps({
	activeCategory: {
		type: String,
		default: 'all'
	}
});

defineEmits(['filter']);

const categories = [
	{ id: 'all', label: 'Tất cả dịch vụ' },
	{ id: 'maintenance', label: 'Bảo dưỡng' },
	{ id: 'repair', label: 'Sửa chữa' },
	{ id: 'tires', label: 'Lốp xe' },
	{ id: 'cleaning', label: 'Vệ sinh' },
	{ id: 'electrical', label: 'Hệ thống điện' }
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

@keyframes pill-grow {
	from { transform: scale(0.95); opacity: 0; }
	to { transform: scale(1); opacity: 1; }
}

.animate-pill-grow {
	animation: pill-grow 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>

