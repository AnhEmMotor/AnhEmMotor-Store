<script setup>
const scrollToOffers = () => {
	const element = document.getElementById('promotion-content');
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
	}
};
</script>

<template>
	<section class="relative min-h-[620px] lg:h-[750px] flex items-center bg-gray-900 overflow-hidden font-['Manrope']">
		
		<div class="absolute inset-0 z-0">
			<img 
				src="https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=1920" 
				class="w-full h-full object-cover opacity-40 scale-105"
				alt="AnhEm Motor Promotion"
			>
			<div class="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-transparent"/>
		</div>

		<div class="container mx-auto px-4 relative z-10">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				
				<div class="max-w-2xl animate-fade-in-left">
					<div class="inline-flex items-center gap-3 px-5 py-2.5 bg-red-600/10 border border-red-600/20 rounded-full mb-10 backdrop-blur-sm">
						<span class="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(230,0,35,0.8)]"/>
						<span class="text-[11px] md:text-xs font-black text-red-500 uppercase tracking-[0.25em]">Ưu đãi bùng nổ tháng 08</span>
					</div>

					<h1 class="text-3xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-[1.1] tracking-tight uppercase">
						TỔNG HỢP <br >
						<span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">KHUYẾN MÃI</span><br >
						CỰC KHỦNG
					</h1>

					<p class="text-gray-400 text-lg md:text-2xl font-medium max-w-xl mb-12 leading-relaxed border-l-4 border-red-600 pl-8">
						Cơ hội duy nhất trong năm để sở hữu các dòng xe <span class="text-white">Honda & Yamaha</span> với mức giá không tưởng.
					</p>

					<div class="flex flex-wrap gap-4 md:gap-6">
						<button 
							class="px-6 md:px-10 py-4 md:py-5 bg-red-600 text-white rounded-xl md:rounded-2xl font-black text-xs md:sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl flex items-center gap-3 md:gap-4 group"
							@click="scrollToOffers"
						>
							Xem ưu đãi
							<Icon name="ph:arrow-down-bold" class="text-lg md:text-xl group-hover:translate-y-1 transition-transform" />
						</button>
						<NuxtLink 
							to="/support"
							class="px-6 md:px-10 py-4 md:py-5 bg-white/5 backdrop-blur-xl text-white border border-white/10 rounded-xl md:rounded-2xl font-black text-xs md:sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2 md:gap-3"
						>
							Tư vấn
							<Icon name="ph:chat-circle-dots-fill" class="text-lg md:text-xl" />
						</NuxtLink>
					</div>
				</div>

				
				<div class="hidden lg:block relative group animate-fade-in-right">
					
					<div class="absolute -inset-20 bg-red-600/15 rounded-full blur-[100px] group-hover:bg-red-600/25 transition-all duration-1000"/>
					
					<div class="relative rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-1000 group-hover:border-red-600/20">
						<img 
							src="/hero_honda_sh_2025_spotlight_1778828554894.png" 
							class="w-full aspect-[4/5] object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
							alt="Honda SH 2025"
						>
						
						<div class="absolute top-10 right-10 w-24 h-24 bg-red-600 rounded-full flex flex-col items-center justify-center text-white shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-700 border-4 border-white/20">
							<span class="text-[10px] font-black uppercase">Giảm tới</span>
							<span class="text-xl font-black italic">10Tr</span>
						</div>

						<div class="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent">
							<div class="space-y-2">
								<p class="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Spotlight của tuần</p>
								<h3 class="text-3xl font-black text-white uppercase tracking-tighter">HONDA SH <span class="text-red-500 italic">NEW 2025</span></h3>
								<div class="flex items-center gap-4 pt-4">
									<div class="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
										<Icon name="ph:check-circle-fill" class="text-red-500" />
										<span class="text-[10px] text-white font-bold uppercase">Sẵn xe</span>
									</div>
									<div class="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
										<Icon name="ph:check-circle-fill" class="text-red-500" />
										<span class="text-[10px] text-white font-bold uppercase">Trả góp 0%</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		
		<div class="absolute top-1/4 -right-20 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none"/>
		<div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent z-10"/>
	</section>
</template>

<style scoped>
@keyframes fadeInLeft {
	from { opacity: 0; transform: translateX(-50px); }
	to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeInRight {
	from { opacity: 0; transform: translateX(50px); }
	to { opacity: 1; transform: translateX(0); }
}

.animate-fade-in-left {
	animation: fadeInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-fade-in-right {
	animation: fadeInRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
