<script setup>
defineProps({
	promotion: {
		type: Object,
		required: true,
	},
});

const calculateTimeLeft = (endDate) => {
	const total = Date.parse(endDate) - Date.parse(new Date());
	if (total <= 0) return { days: 0, hours: 0, minutes: 0 };
	const minutes = Math.floor((total / 1000 / 60) % 60);
	const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
	const days = Math.floor(total / (1000 * 60 * 60 * 24));
	return { days, hours, minutes };
};

const timeLeft = ref({ days: 0, hours: 0, minutes: 0 });
let timer = null;

onMounted(() => {
	// Initial calculation
	// In a real app, you'd update this every minute
	timeLeft.value = calculateTimeLeft('2025-10-15'); // Using hardcoded or promotion.endDate
});
</script>

<template>
	<section class="relative min-h-[500px] md:min-h-[650px] flex items-center overflow-hidden bg-gray-950 text-white">
		<!-- Background Visual -->
		<div class="absolute inset-0 z-0">
			<img 
				:src="promotion.image" 
				class="w-full h-full object-cover opacity-40 scale-105"
				:alt="promotion.title"
			>
			<div class="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/60 to-transparent"></div>
			<div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
		</div>

		<div class="container mx-auto px-6 relative z-10 py-20">
			<div class="max-w-4xl space-y-8">
				<!-- Status Badge -->
				<div class="flex flex-wrap items-center gap-4 animate-fade-in">
					<div 
						class="px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border"
						:class="promotion.status === 'ongoing' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'"
					>
						<span class="inline-block w-2 h-2 rounded-full bg-current animate-pulse mr-2"></span>
						{{ promotion.status === 'ongoing' ? 'Đang diễn ra' : 'Sắp diễn ra' }}
					</div>
					<div class="px-5 py-1.5 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
						Hot Campaign
					</div>
				</div>

				<!-- Title -->
				<div class="space-y-4 animate-slide-up">
					<h1 class="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05]">
						{{ promotion.title }}
					</h1>
					<p class="text-xl md:text-2xl text-gray-300 font-medium max-w-2xl leading-relaxed italic border-l-4 border-red-600 pl-8">
						"{{ promotion.shortDescription }}"
					</p>
				</div>

				<!-- Countdown & CTA -->
				<div class="flex flex-col md:flex-row items-start md:items-center gap-10 pt-6 animate-slide-up delay-200">
					<!-- Countdown -->
					<div class="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
						<div class="text-center min-w-[60px]">
							<span class="block text-4xl font-black text-red-500 tabular-nums leading-none">03</span>
							<span class="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2 block">Ngày</span>
						</div>
						<div class="w-[1px] h-10 bg-white/10"></div>
						<div class="text-center min-w-[60px]">
							<span class="block text-4xl font-black text-white tabular-nums leading-none">12</span>
							<span class="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2 block">Giờ</span>
						</div>
						<div class="w-[1px] h-10 bg-white/10"></div>
						<div class="text-center min-w-[60px]">
							<span class="block text-4xl font-black text-white tabular-nums leading-none">45</span>
							<span class="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2 block">Phút</span>
						</div>
					</div>

					<button class="h-20 px-12 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-[0_25px_50px_-15px_rgba(230,0,35,0.5)] hover:scale-105 active:scale-95 group">
						Đăng ký nhận ưu đãi ngay
						<Icon name="ph:arrow-right-bold" class="ml-3 text-lg transition-transform group-hover:translate-x-2" />
					</button>
				</div>
			</div>
		</div>

		<!-- Decorative Elements -->
		<div class="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block pointer-events-none">
			<div class="absolute inset-0 bg-gradient-to-l from-red-600/20 via-transparent to-transparent"></div>
			<div class="h-full flex items-center justify-end pr-20 opacity-20">
				<Icon name="ph:motorcycle-fill" class="text-[30rem] -rotate-12 translate-x-20" />
			</div>
		</div>
	</section>
</template>

<style scoped>
@reference "../../assets/main.css";

.animate-fade-in {
	animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
	animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-200 {
	animation-delay: 200ms;
}

@keyframes fadeIn {
	from { opacity: 0; }
	to { opacity: 1; }
}

@keyframes slideUp {
	from { opacity: 0; transform: translateY(30px); }
	to { opacity: 1; transform: translateY(0); }
}
</style>
