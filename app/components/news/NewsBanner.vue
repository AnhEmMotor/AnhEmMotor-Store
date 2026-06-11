<script setup>
defineProps({
	title: {
		type: String,
		default: "TIN TỨC & SỰ KIỆN",
	},
	subtitle: {
		type: String,
		default:
			"Cập nhật tin tức mới nhất về xe máy, sự kiện showroom và cẩm nang công nghệ từ AnhEm Motor.",
	},
	backgroundImage: {
		type: String,
		default: "/news_hero_banner.png",
	},
});
</script>

<template>
	<section
		class="relative min-h-[400px] lg:h-[450px] flex items-center bg-gray-950 overflow-hidden font-['Manrope']"
	>
		
		<div class="absolute inset-0 z-0">
			<img
				:src="backgroundImage"
				class="w-full h-full object-cover opacity-40 scale-105"
				:alt="title"
			>
			<div
				class="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-transparent"
			/>
		</div>

		<div class="container mx-auto px-4 relative z-10">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				
				<div class="max-w-2xl animate-fade-in-left">
					<h1
						class="text-3xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-[1.1] tracking-tight uppercase"
					>
						CẬP NHẬT
						<span
							class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600"
							>TIN TỨC</span
						>
						NỔI BẬT
					</h1>

					<p
						class="text-gray-400 text-lg md:text-2xl font-medium max-w-xl mb-12 leading-relaxed border-l-4 border-red-600 pl-8"
					>
						{{ subtitle }}
					</p>
				</div>

				
				<div class="hidden lg:block relative group animate-fade-in-right">
					
					<div
						class="absolute -inset-20 bg-red-600/15 rounded-full blur-[100px] group-hover:bg-red-600/25 transition-all duration-1000"
					/>

					<div
						class="relative rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-1000 group-hover:border-red-600/20"
					>
						<img
							src="/premium_motorcycle_showroom_visit_1778827603878.png"
							class="w-full aspect-[4/5] object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
							alt="AnhEm Motor Showroom"
						>
						
						<div
							class="absolute top-10 right-10 w-24 h-24 bg-red-600 rounded-full flex flex-col items-center justify-center text-white shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-700 border-4 border-white/20"
						>
							<span
								class="text-[9px] font-black uppercase text-center leading-none mb-1"
								>Showroom</span
							>
							<span class="text-base font-black italic uppercase leading-none"
								>HOT</span
							>
						</div>

						<div
							class="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"
						>
							<div class="space-y-2">
								<p
									class="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]"
								>
									Tiêu điểm sự kiện
								</p>
								<h3
									class="text-3xl font-black text-white uppercase tracking-tighter"
								>
									KHAI TRƯƠNG
									<span class="text-red-500 italic">SHOWROOM MỚI</span>
								</h3>
								<div class="flex items-center gap-4 pt-4">
									<div
										class="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10"
									>
										<Icon name="ph:calendar-blank-fill" class="text-red-500" />
										<span class="text-[10px] text-white font-bold uppercase"
											>Tháng này</span
										>
									</div>
									<div
										class="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10"
									>
										<Icon name="ph:users-fill" class="text-red-500" />
										<span class="text-[10px] text-white font-bold uppercase"
											>Đặc quyền VIP</span
										>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		
		<div
			class="absolute top-1/4 -right-20 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none"
		/>
	</section>
</template>

<style scoped>
@keyframes fadeInLeft {
	from {
		opacity: 0;
		transform: translateX(-50px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
@keyframes fadeInRight {
	from {
		opacity: 0;
		transform: translateX(50px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}

.animate-fade-in-left {
	animation: fadeInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-fade-in-right {
	animation: fadeInRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
