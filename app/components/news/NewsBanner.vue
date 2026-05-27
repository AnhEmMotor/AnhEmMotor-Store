<script setup>
defineProps({
	title: {
		type: String,
		default: 'TIN TỨC & SỰ KIỆN'
	},
	subtitle: {
		type: String,
		default: 'Cập nhật tin tức mới nhất về xe máy, sự kiện showroom và cẩm nang công nghệ từ AnhEm Motor.'
	},
	backgroundImage: {
		type: String,
		default: '/news_hero_banner.png'
	}
});

const scrollToNews = () => {
	const element = document.getElementById('news-content');
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
	}
};
</script>

<template>
	<section class="relative min-h-[620px] lg:h-[750px] flex items-center bg-gray-950 overflow-hidden font-['Manrope']">
		<!-- Background Image with Deep Overlay -->
		<div class="absolute inset-0 z-0">
			<img 
				:src="backgroundImage" 
				class="w-full h-full object-cover opacity-40 scale-105"
				:alt="title"
			>
			<div class="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-transparent"/>
		</div>

		<div class="container mx-auto px-4 relative z-10">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				<!-- Left Content -->
				<div class="max-w-2xl animate-fade-in-left">
					<div class="inline-flex items-center gap-3 px-5 py-2.5 bg-red-600/10 border border-red-600/20 rounded-full mb-10 backdrop-blur-sm">
						<span class="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(230,0,35,0.8)]"/>
						<span class="text-[11px] md:text-xs font-black text-red-500 uppercase tracking-[0.25em]">Bản tin AnhEm Motor</span>
					</div>

					<h1 class="text-3xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-[1.1] tracking-tight uppercase">
						CẬP NHẬT <br >
						<span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">TIN TỨC</span><br >
						NỔI BẬT
					</h1>

					<p class="text-gray-400 text-lg md:text-2xl font-medium max-w-xl mb-12 leading-relaxed border-l-4 border-red-600 pl-8">
						{{ subtitle }}
					</p>

					<div class="flex flex-wrap gap-4 md:gap-6">
						<button 
							class="px-6 md:px-10 py-4 md:py-5 bg-red-600 text-white rounded-xl md:rounded-2xl font-black text-xs md:sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl flex items-center gap-3 md:gap-4 group"
							@click="scrollToNews"
						>
							Khám phá ngay
							<Icon name="ph:arrow-down-bold" class="text-lg md:text-xl group-hover:translate-y-1 transition-transform" />
						</button>
						<NuxtLink 
							to="/support"
							class="px-6 md:px-10 py-4 md:py-5 bg-white/5 backdrop-blur-xl text-white border border-white/10 rounded-xl md:rounded-2xl font-black text-xs md:sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2 md:gap-3"
						>
							Liên hệ báo chí
							<Icon name="ph:chat-circle-dots-fill" class="text-lg md:text-xl" />
						</NuxtLink>
					</div>
				</div>

				<!-- Right Visual Element - Showroom Spotlight Card -->
				<div class="hidden lg:block relative group animate-fade-in-right">
					<!-- Glow effect -->
					<div class="absolute -inset-20 bg-red-600/15 rounded-full blur-[100px] group-hover:bg-red-600/25 transition-all duration-1000"/>
					
					<div class="relative rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-1000 group-hover:border-red-600/20">
						<img 
							src="/premium_motorcycle_showroom_visit_1778827603878.png" 
							class="w-full aspect-[4/5] object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
							alt="AnhEm Motor Showroom"
						>
						<!-- Highlight Tag on Image -->
						<div class="absolute top-10 right-10 w-24 h-24 bg-red-600 rounded-full flex flex-col items-center justify-center text-white shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-700 border-4 border-white/20">
							<span class="text-[9px] font-black uppercase text-center leading-none mb-1">Showroom</span>
							<span class="text-base font-black italic uppercase leading-none">HOT</span>
						</div>

						<div class="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent">
							<div class="space-y-2">
								<p class="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Tiêu điểm sự kiện</p>
								<h3 class="text-3xl font-black text-white uppercase tracking-tighter">KHAI TRƯƠNG <span class="text-red-500 italic">SHOWROOM MỚI</span></h3>
								<div class="flex items-center gap-4 pt-4">
									<div class="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
										<Icon name="ph:calendar-blank-fill" class="text-red-500" />
										<span class="text-[10px] text-white font-bold uppercase">Tháng này</span>
									</div>
									<div class="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
										<Icon name="ph:users-fill" class="text-red-500" />
										<span class="text-[10px] text-white font-bold uppercase">Đặc quyền VIP</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Decorative Elements -->
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
