<template>
	<div class="pt-10 border-t border-gray-50">
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
			<div v-for="(step, idx) in steps" :key="idx" class="relative group">
				<div class="flex items-center gap-4">
					<div class="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:-rotate-6 transition-all duration-500">
						<Icon :name="step.icon" class="text-sm" />
					</div>
					<div class="space-y-0.5">
						<h4 class="text-[10px] font-black text-gray-900 uppercase tracking-widest">{{ step.title }}</h4>
						<p class="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{{ step.time }}</p>
					</div>
					<!-- Connector (only for Desktop) -->
					<div v-if="idx < steps.length - 1" class="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[calc(100%-0.5rem)] w-6 h-[1px] bg-gray-100 group-hover:bg-primary/20 transition-colors"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const steps = [
	{ title: 'Gửi yêu cầu', time: 'Mất 1 phút', icon: 'fa6-solid:paper-plane' },
	{ title: 'AnhEm liên hệ', time: '15 - 30 Phút', icon: 'fa6-solid:headset' },
	{ title: 'Giải quyết', time: 'Ưu tiên hàng đầu', icon: 'fa6-solid:shield-check' },
];
</script>
