<template>
	<section class="relative w-full h-[60vh] md:h-[75vh] min-h-[500px] overflow-hidden flex items-center bg-gray-900">
		<!-- Background Image with Multi-layer Parallax Feel -->
		<div class="absolute inset-0 z-0 overflow-hidden">
			<img 
				src="/service-hero-cinematic.png" 
				alt="Cinematic Service" 
				class="w-full h-full object-cover transform animate-premium-zoom"
			/>
			<!-- Dynamic Overlays -->
			<div class="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/70 to-transparent z-10"></div>
			<div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/20 z-10"></div>
			<!-- Subtle Light Beam -->
			<div class="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 z-10 animate-pulse-slow"></div>
		</div>

		<div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-20 w-full pt-10">
			<div class="max-w-3xl">
				<!-- Badges (Staggered Entrance) -->
				<div class="flex flex-wrap gap-3 mb-8 animate-reveal-down">
					<div class="inline-flex items-center gap-2.5 px-4 py-2 bg-primary text-white rounded-2xl shadow-[0_10px_30px_-5px_rgba(230,0,35,0.4)] border border-primary/20">
						<Icon name="fa6-solid:shield-halved" class="text-xs" />
						<span class="text-[10px] font-black uppercase tracking-widest">Bảo hành chính hãng</span>
					</div>
					<div class="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-2xl">
						<span class="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
						<span class="text-[10px] font-black uppercase tracking-widest">Sẵn sàng phục vụ</span>
					</div>
				</div>

				<!-- Main Headline (Split Reveal Feel) -->
				<div class="space-y-6">
					<h1 class="text-5xl md:text-7xl lg:text-8xl font-[1000] text-white leading-[0.95] tracking-tight animate-reveal-left">
						DỊCH VỤ <br />
						<span class="text-primary italic relative inline-block">
							CHUẨN 5 SAO
							<span class="absolute -bottom-2 left-0 w-full h-2 bg-primary/20 -skew-x-12"></span>
						</span>
					</h1>
					<p class="text-gray-300 text-base md:text-xl font-medium max-w-xl leading-relaxed animate-reveal-up opacity-90 [animation-delay:400ms] fill-mode-forwards opacity-0">
						Hệ thống trang thiết bị hiện đại bậc nhất cùng đội ngũ chuyên gia được đào tạo từ chính hãng. Chúng tôi tận tâm cho sự an toàn của bạn.
					</p>
				</div>

				<!-- CTA Buttons (Interactive) -->
				<div class="flex flex-wrap gap-5 pt-10 animate-reveal-up opacity-0 [animation-delay:600ms] fill-mode-forwards">
					<button 
						@click="scrollToServices"
						class="px-10 py-5 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_20px_40px_-10px_rgba(230,0,35,0.5)] hover:shadow-[0_25px_50px_-10px_rgba(230,0,35,0.6)] hover:scale-105 active:scale-95 transition-all duration-500 flex items-center gap-3 group overflow-hidden relative"
					>
						<span class="relative z-10">Đặt Lịch Ngay</span>
						<Icon name="fa6-solid:calendar-check" class="relative z-10 group-hover:rotate-12 transition-transform text-base" />
						<div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
					</button>
					<button 
						@click="scrollToServices"
						class="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/20 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:text-gray-950 hover:border-white transition-all duration-500 active:scale-95"
					>
						Xem Bảng Giá
					</button>
				</div>

				<!-- Trust Signals Row (Staggered) -->
				<div class="flex items-center gap-10 mt-16 pt-8 border-t border-white/5 animate-reveal-up opacity-0 [animation-delay:800ms] fill-mode-forwards">
					<div v-for="(stat, idx) in stats" :key="idx" class="group cursor-default">
						<p class="text-3xl md:text-4xl font-black text-white leading-none group-hover:text-primary transition-colors duration-500">{{ stat.value }}</p>
						<p class="text-[10px] font-black text-primary uppercase tracking-widest mt-2 opacity-60 group-hover:opacity-100 transition-opacity">{{ stat.label }}</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Subtle Bottom Decoration -->
		<div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/50 to-transparent z-[5]"></div>
	</section>
</template>

<script setup>
const stats = [
	{ value: "15+", label: "Kinh nghiệm" },
	{ value: "20k+", label: "Lượt phục vụ" },
	{ value: "100%", label: "Chính hãng" }
];

const scrollToServices = () => {
	const el = document.getElementById('services-grid');
	if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>

<style scoped>
@keyframes premium-zoom {
	from { transform: scale(1.1); }
	to { transform: scale(1); }
}

@keyframes reveal-down {
	from { opacity: 0; transform: translateY(-30px); }
	to { opacity: 1; transform: translateY(0); }
}

@keyframes reveal-left {
	from { opacity: 0; transform: translateX(-50px); }
	to { opacity: 1; transform: translateX(0); }
}

@keyframes reveal-up {
	from { opacity: 0; transform: translateY(40px); }
	to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-slow {
	0%, 100% { opacity: 0.3; transform: scale(1); }
	50% { opacity: 0.6; transform: scale(1.1); }
}

.animate-premium-zoom {
	animation: premium-zoom 15s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-reveal-down {
	animation: reveal-down 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-reveal-left {
	animation: reveal-left 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-reveal-up {
	animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-pulse-slow {
	animation: pulse-slow 8s infinite ease-in-out;
}

.fill-mode-forwards {
	animation-fill-mode: forwards;
}
</style>

