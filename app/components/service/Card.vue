<template>
	<article 
		:class="[
			'group relative p-6 bg-white border border-gray-100 transition-all duration-500 flex flex-col h-full hover:shadow-xl hover:shadow-gray-200/40 rounded-2xl',
			service.isFeatured ? 'ring-2 ring-red-600 bg-gray-50' : ''
		]"
	>
		<!-- Accent bar left -->
		<div class="absolute left-0 top-10 bottom-10 w-0 group-hover:w-[4px] bg-red-600 transition-all duration-300 rounded-r-full"/>

		<div class="flex justify-end items-start mb-6">
			<div class="flex flex-col items-end gap-1">
				<span class="text-[9px] font-black text-yellow-600 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-lg">
					{{ service.estimatedTime || '30-60' }} Phút
				</span>
				<span v-if="service.isFeatured" class="text-[8px] font-black text-white bg-red-600 px-2 py-0.5 rounded-md">
					Phổ biến
				</span>
			</div>
		</div>

		<div class="space-y-4 flex-grow">
			<div class="space-y-2">
				<span class="text-[9px] font-black text-gray-400 block">
					{{ service.categoryLabel || 'Dịch vụ chuyên sâu' }}
				</span>
				<h3 class="text-lg font-black text-gray-900 group-hover:text-red-600 transition-colors leading-tight">
					{{ service.name }}
				</h3>
			</div>

			<p class="text-gray-500 text-xs font-medium leading-relaxed line-clamp-2 min-h-[32px]">
				{{ service.description }}
			</p>

			<div class="pt-2">
				<p class="text-red-600 font-black text-lg leading-none">
					{{ formatPrice(service.price) }}
					<span class="text-[9px] text-gray-400 ml-1 font-bold">/ lượt</span>
				</p>
			</div>


			<ul class="space-y-3 pt-4">
				<li v-for="(feature, idx) in service.features?.slice(0, 3)" :key="idx" class="flex items-start gap-3 text-[10px] font-bold text-gray-500 leading-tight">
					<Icon name="fa6-solid:circle-check" class="text-red-600 mt-0.5 flex-shrink-0" />
					{{ feature }}
				</li>
			</ul>
		</div>

		<div class="mt-6 pt-4 border-t border-gray-50">
			<button 
				class="w-full py-3.5 bg-gray-900 text-white text-[10px] font-black rounded-xl hover:bg-red-600 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn"
				@click="handleBooking"
			>
				Đặt Lịch Ngay
				<Icon name="fa6-solid:arrow-right-long" class="transition-transform group-hover/btn:translate-x-1" />
			</button>
		</div>
	</article>
</template>

<script setup>
const props = defineProps({
	service: {
		type: Object,
		required: true
	}
});

const emit = defineEmits(['book']);

const formatPrice = (price) => {
	if (!price) return 'Liên hệ';
	if (typeof price === 'string' && price.includes('Từ')) return price;
	return 'Từ ' + new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const handleBooking = () => {
	emit('book', props.service);
};
</script>
