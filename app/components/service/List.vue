<template>
	<div id="services-grid" class="bg-white pt-8 pb-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Header Title -->
			<div class="mb-10 text-center space-y-4">
				<h2 class="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter">
					Chi Tiết Các <span class="text-red-600">Gói Dịch Vụ</span>
				</h2>
				<p class="text-gray-400 text-xs font-black uppercase tracking-[0.4em]">Tiêu chuẩn kỹ thuật 5 sao</p>
			</div>

			<!-- Zigzag List -->
			<div class="space-y-0">
				<ServiceRow 
					v-for="(service, idx) in filteredServices" 
					:key="service.id" 
					:service="service"
					:is-reversed="idx % 2 !== 0"
					@book="$emit('book', $event)"
				/>
			</div>

			<!-- Empty State -->
			<div v-if="filteredServices.length === 0" class="text-center py-32 bg-gray-50 rounded-[4rem] border border-gray-100">
				<div class="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
					<Icon name="fa6-solid:magnifying-glass" class="text-4xl text-gray-200" />
				</div>
				<p class="text-gray-400 font-black uppercase tracking-[0.3em] text-sm">Không tìm thấy dịch vụ trong danh mục này</p>
				<button @click="$emit('reset-filter')" class="mt-8 text-red-600 font-black uppercase tracking-widest text-xs hover:underline">Xem tất cả dịch vụ</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	services: {
		type: Array,
		required: true
	},
	activeCategory: {
		type: String,
		default: 'all'
	}
});

defineEmits(['book', 'reset-filter']);

const filteredServices = computed(() => {
	if (props.activeCategory === 'all') return props.services;
	return props.services.filter(s => s.category === props.activeCategory);
});
</script>
