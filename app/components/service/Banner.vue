<template>
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="relative overflow-hidden rounded-[3rem] bg-gray-900 shadow-2xl">
			<!-- Background Image -->
			<img src="/promo-banner.png" alt="Promotion" class="absolute inset-0 w-full h-full object-cover opacity-60" >
			
			<!-- Gradient Overlay -->
			<div class="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"/>

			<!-- Content -->
			<div class="relative z-10 p-10 lg:p-16 flex flex-col lg:flex-row justify-between items-center gap-10">
				<div class="space-y-6 max-w-2xl text-center lg:text-left">
					<div class="inline-flex items-center gap-3 px-4 py-1.5 bg-red-600 text-white rounded-full">
						<Icon name="fa6-solid:fire" class="animate-bounce" />
						<span class="text-[10px] font-black">Ưu đãi độc quyền</span>
					</div>
					<h2 class="text-4xl lg:text-6xl font-black text-white leading-none">
						Giảm Ngay <span class="text-red-600">20%</span> <br >
						Dịch Vụ Lần Đầu
					</h2>
					<p class="text-gray-300 text-sm md:text-base font-medium leading-relaxed">
						Trải nghiệm quy trình bảo dưỡng tiêu chuẩn 5 sao với mức giá ưu đãi nhất dành riêng cho khách hàng mới. Đặt lịch ngay để nhận quà tặng trị giá 200k.
					</p>
					<div class="flex flex-wrap justify-center lg:justify-start gap-4">
						<button 
							class="px-10 py-5 bg-red-600 text-white text-[11px] font-black hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 active:scale-95 flex items-center gap-3 group"
							@click="$emit('book')"
						>
							Nhận Ưu Đãi Ngay
							<Icon name="fa6-solid:gift" class="group-hover:rotate-12 transition-transform" />
						</button>
						<div class="flex items-center gap-4 text-white/60 text-xs font-bold">
							<span class="w-10 h-[1px] bg-white/20"/>
							Kết thúc sau 3 ngày
						</div>
					</div>
				</div>

				<!-- Stats/Visual -->
				<div class="hidden lg:flex flex-col gap-6">
					<div class="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] text-center w-64">
						<p class="text-4xl font-black text-white mb-1">98%</p>
						<p class="text-[9px] font-black text-red-600">Khách hàng hài lòng</p>
					</div>
					<div class="p-8 bg-red-600 rounded-[2.5rem] text-center w-64 shadow-2xl shadow-red-600/40">
						<p class="text-4xl font-black text-white mb-1">05*</p>
						<p class="text-[9px] font-black text-white/80">Kỹ thuật viên hãng</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
defineEmits(['book']);
</script>
