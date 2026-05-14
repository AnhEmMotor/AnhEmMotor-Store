<template>
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
			<!-- Branch Info -->
			<div class="lg:col-span-5 space-y-10">
				<div class="space-y-4">
					<h2 class="text-xs font-extrabold text-red-600 uppercase tracking-[0.3em]">Hệ thống showroom</h2>
					<p class="text-4xl font-extrabold text-gray-900 uppercase tracking-tight leading-tight">Ghé thăm cửa hàng</p>
					<p class="text-gray-400 text-sm font-medium leading-relaxed max-w-md">Trải nghiệm không gian mua sắm hiện đại và nhận sự tư vấn trực tiếp từ đội ngũ chuyên gia của AnhEm Motor.</p>
				</div>

				<div class="space-y-6">
					<div 
						class="p-8 rounded-[24px] border border-red-600 bg-white shadow-xl shadow-red-600/5 transition-all duration-500 relative overflow-hidden"
					>
						<div class="flex justify-between items-start mb-6">
							<div class="space-y-2">
								<h3 class="text-lg font-extrabold text-gray-900 uppercase tracking-tight">Cửa hàng AnhEm Motor</h3>
								<div class="flex items-center gap-2">
									<div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
									<span class="text-[10px] font-extrabold text-green-500 uppercase tracking-widest">Đang mở cửa</span>
								</div>
							</div>
							<div class="w-10 h-10 bg-red-600 text-white shadow-lg shadow-red-600/10 rounded-xl flex items-center justify-center">
								<Icon name="fa6-solid:star" class="text-xs" />
							</div>
						</div>
						
						<div class="space-y-4 mb-6">
							<div class="flex items-start gap-4">
								<Icon name="fa6-solid:map-pin" class="text-gray-400 mt-1" />
								<p class="text-sm text-gray-500 font-medium leading-relaxed">{{ store.address }}</p>
							</div>
							<div class="flex items-center gap-4">
								<Icon name="fa6-solid:phone" class="text-gray-400" />
								<p class="text-sm font-extrabold text-gray-900">{{ store.phone }}</p>
							</div>
						</div>

						<!-- Additional Info to fill whitespace -->
						<div class="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-gray-50">
							<div class="space-y-1">
								<span class="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Giờ hoạt động</span>
								<p class="text-xs font-bold text-gray-900">08:00 - 20:00</p>
							</div>
							<div class="space-y-1">
								<span class="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Dịch vụ hỗ trợ</span>
								<p class="text-xs font-bold text-gray-900">Mua xe · Bảo dưỡng</p>
							</div>
						</div>

						<!-- Action Buttons -->
						<div class="flex gap-3">
							<a :href="'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(store.address)" target="_blank" class="flex-1 px-6 py-4 bg-gray-900 text-white rounded-xl text-[11px] font-extrabold uppercase tracking-widest text-center hover:bg-red-600 transition-colors flex items-center justify-center gap-2 group">
								<Icon name="fa6-solid:directions" class="group-hover:rotate-12 transition-transform" />
								Chỉ đường ngay
							</a>
							<a :href="'tel:' + store.phone" class="px-6 py-4 bg-white border border-gray-200 text-gray-900 rounded-xl text-[11px] font-extrabold uppercase tracking-widest hover:border-red-600 transition-colors flex items-center justify-center">
								<Icon name="fa6-solid:phone" />
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Map View -->
			<div class="lg:col-span-7 h-[600px] lg:h-[700px] sticky top-24">
				<div class="w-full h-full bg-gray-100 rounded-[24px] overflow-hidden border-8 border-white shadow-xl relative">
					<iframe 
						:src="store.mapUrl" 
						width="100%" 
						height="100%" 
						style="border:0;" 
						allowfullscreen="" 
						loading="lazy" 
						referrerpolicy="no-referrer-when-downgrade"
						class="absolute inset-0 grayscale-[0.2] contrast-[1.1] transition-all duration-700"
					></iframe>
					
					<!-- Map Overlay -->
					<div class="absolute bottom-10 left-10 right-10 p-6 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl flex items-center justify-between">
						<div class="flex items-center gap-4">
							<div class="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white">
								<Icon name="fa6-solid:shop" class="text-sm" />
							</div>
							<div>
								<p class="text-[9px] font-extrabold text-red-600 uppercase tracking-widest">Vị trí chính xác</p>
								<p class="text-[13px] font-extrabold text-gray-900 uppercase">AnhEm Motor Showroom</p>
							</div>
						</div>
						<div class="px-3 py-1.5 bg-green-500/10 text-green-600 rounded-lg text-[9px] font-extrabold uppercase tracking-widest">
							Dẫn đường GPS
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
const store = { 
	name: 'Trụ sở chính AnhEm Motor', 
	address: '123 Đường Võ Thị Sáu, Phường Thống Nhất, TP. Biên Hòa, Đồng Nai', 
	phone: '0901 234 567',
	type: 'hq',
	mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.892953284566!2d106.8242485!3d10.9639534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174df44a7b74409%3A0xc3411b0e00f9f31b!2sV%C3%B5%20Th%E1%BB%8B%20S%C3%A1u%2C%20Bi%C3%AAn%20H%C3%B2a%2C%20%C4%90%E1%BB%93ng%20Nai!5e0!3m2!1svi!2s!4v1715421500000!5m2!1svi!2s'
};
</script>


