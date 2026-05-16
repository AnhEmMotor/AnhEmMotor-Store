<template>
	<section class="py-12 md:py-20 bg-gray-50">
		<div class="container mx-auto px-4">
			<div class="bg-gray-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
				<div class="flex flex-col lg:flex-row items-stretch">
					<!-- Text Content -->
					<div class="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center space-y-8 z-10">
						<div class="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full w-fit">
							<span class="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
							<span class="text-[10px] font-black text-red-500 uppercase tracking-widest">Trải nghiệm trực tiếp</span>
						</div>
						
						<h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
							Ghé thăm <span class="text-red-600">Showroom</span> <br />
							Nhận thêm quà tặng
						</h2>
						
						<p class="text-gray-400 text-lg font-medium leading-relaxed">
							Khám phá không gian trưng bày hiện đại của AnhEm Motor. Tận mắt chiêm ngưỡng các dòng xe mới nhất và nhận tư vấn chuyên sâu về các chương trình ưu đãi độc quyền chỉ có tại cửa hàng.
						</p>
						
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
							<div class="flex items-center gap-4 group">
								<div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-red-600 transition-all">
									<Icon name="ph:map-pin-fill" class="text-xl text-white" />
								</div>
								<div class="flex flex-col">
									<span class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Địa điểm</span>
									<span class="text-sm font-bold text-white">Quận 12, TP. Hồ Chí Minh</span>
								</div>
							</div>
							<div class="flex items-center gap-4 group">
								<div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-red-600 transition-all">
									<Icon name="ph:clock-fill" class="text-xl text-white" />
								</div>
								<div class="flex flex-col">
									<span class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Giờ mở cửa</span>
									<span class="text-sm font-bold text-white">08:00 - 20:00 (Hàng ngày)</span>
								</div>
							</div>
						</div>
						
						<div class="flex flex-wrap gap-6 pt-6">
							<NuxtLink to="/support" class="px-10 py-5 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 hover:scale-105 transition-all shadow-2xl shadow-red-600/30">
								Đăng ký tham quan
							</NuxtLink>
						</div>
					</div>
					
					<!-- Image with Overlay -->
					<div class="lg:w-1/2 relative min-h-[400px]">
						<img 
							src="/premium_motorcycle_showroom_visit_1778827603878.png" 
							class="w-full h-full object-cover"
							alt="Showroom AnhEm Motor"
						>
						<div class="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent"></div>
						
						<!-- Floating Stats -->
						<div class="absolute bottom-10 right-10 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl animate-bounce-slow">
							<div class="flex flex-col text-center">
								<span class="text-3xl font-black text-white leading-none">500+</span>
								<span class="text-[10px] font-black text-red-500 uppercase tracking-widest mt-1">Lượt khách mỗi ngày</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
@keyframes bounceSlow {
	0%, 100% { transform: translateY(0); }
	50% { transform: translateY(-10px); }
}
.animate-bounce-slow {
	animation: bounceSlow 3s ease-in-out infinite;
}
</style>
