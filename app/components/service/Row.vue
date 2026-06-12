<template>
	<div 
		ref="rowRef"
		:class="[
			'flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-16 border-b border-gray-100 last:border-0 group transition-all duration-1000',
			isReversed ? 'lg:flex-row-reverse' : '',
			isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
		]"
	>
		
		<div 
			class="w-full lg:w-1/2 relative transition-all duration-1000 delay-300"
			:class="isVisible ? 'opacity-100 translate-x-0' : (isReversed ? 'opacity-0 translate-x-20' : 'opacity-0 -translate-x-20')"
		>
			<div class="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl group-hover:shadow-primary/20 transition-all duration-700 aspect-[4/3] border border-gray-100">
				<img 
					:src="service.image || '/service-hero.png'" 
					:alt="service.name" 
					class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
				>
				<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"/>
				
				
				<div class="absolute top-8 left-8 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl border border-gray-50 transform group-hover:-translate-y-2 group-hover:rotate-6 transition-all duration-500">
					<Icon v-if="!isEmoji(service.icon)" :name="service.icon || 'fa6-solid:wrench'" class="text-3xl text-primary" />
					<span v-else class="text-3xl">{{ service.icon }}</span>
				</div>
			</div>
			
			<div 
				:class="[
					'absolute -top-10 -bottom-10 w-2/3 bg-primary/5 rounded-[4rem] blur-3xl -z-10 animate-pulse-slow',
					isReversed ? '-left-10' : '-right-10'
				]"
			/>
		</div>

		
		<div 
			class="w-full lg:w-1/2 space-y-8 transition-all duration-1000 delay-500"
			:class="isVisible ? 'opacity-100 translate-x-0' : (isReversed ? 'opacity-0 -translate-x-20' : 'opacity-0 translate-x-20')"
		>
			<div class="space-y-4">
				<div class="flex items-center gap-4">
					<span class="text-[12px] font-black text-primary bg-primary/5 px-5 py-2 rounded-full border border-primary/10 tracking-widest uppercase">
						{{ service.categoryLabel }}
					</span>
					<div class="flex-grow h-[1px] bg-gradient-to-r from-primary/20 to-transparent"/>
				</div>
				<h3 class="text-3xl lg:text-4xl font-black text-gray-900 leading-[1.1] tracking-tight">
					{{ service.name }}
				</h3>
				<p class="text-gray-500 text-base md:text-xl font-medium leading-relaxed max-w-xl">
					{{ service.description }}
				</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div v-for="(feature, idx) in service.features" :key="idx" class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all duration-500 group/feat">
					<Icon name="fa6-solid:circle-check" class="text-primary text-base flex-shrink-0 group-hover/feat:scale-125 transition-transform" />
					<span class="text-[14px] font-bold text-gray-700 uppercase tracking-tight">{{ feature }}</span>
				</div>
			</div>

			<div class="flex flex-wrap items-center gap-8 pt-4">
				<div class="group/price cursor-default">
					<p class="text-[11px] font-black text-gray-400 mb-2 uppercase tracking-widest">Giá dịch vụ</p>
					<p class="text-4xl font-black text-primary transition-transform group-hover/price:scale-105 origin-left">
						{{ formatPrice(service.price) }}
					</p>
				</div>
				<div class="w-[1px] h-16 bg-gray-100 hidden sm:block"/>
				<div class="group/time cursor-default">
					<p class="text-[11px] font-black text-gray-400 mb-2 uppercase tracking-widest">Thời gian dự kiến</p>
					<p class="text-2xl font-black text-gray-900 transition-transform group-hover/time:scale-105 origin-left">
						{{ service.estimatedTime }} Phút
					</p>
				</div>
			</div>

			<div class="pt-6">
				<button 
					class="px-10 py-4 bg-gray-950 text-white text-[12px] font-black uppercase tracking-[0.2em] rounded-[1.5rem] hover:bg-primary transition-all duration-500 shadow-2xl shadow-gray-950/20 active:scale-95 flex items-center gap-4 group/btn relative overflow-hidden"
					@click="$emit('book', service)"
				>
					<span class="relative z-10">Đăng ký ngay</span>
					<Icon name="fa6-solid:arrow-right-long" class="relative z-10 group-hover:translate-x-3 transition-transform text-base" />
					<div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"/>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

defineProps({
	service: {
		type: Object,
		required: true
	},
	isReversed: {
		type: Boolean,
		default: false
	}
});

defineEmits(['book']);

const rowRef = ref(null);
const isVisible = ref(false);

onMounted(() => {
	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			isVisible.value = true;
			observer.disconnect();
		}
	}, { threshold: 0.2 });

	if (rowRef.value) {
		observer.observe(rowRef.value);
	}
});

const formatPrice = (price) => {
	if (!price) return 'Liên hệ';
	return 'Từ ' + new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const isEmoji = (str) => {
	if (!str) return false;
	const regexExp = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
	return regexExp.test(str);
};
</script>

<style scoped>
@keyframes pulse-slow {
	0%, 100% { opacity: 0.3; transform: scale(1); }
	50% { opacity: 0.6; transform: scale(1.1); }
}
.animate-pulse-slow {
	animation: pulse-slow 6s infinite ease-in-out;
}
</style>

