<script setup>
</script>

<template>
	<section class="py-24 bg-white">
		<div class="max-w-7xl mx-auto px-6">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-5xl font-[800] text-gray-900 mb-6 uppercase tracking-tight">
					Không Gian Trải Nghiệm
				</h2>
				<p class="text-xl text-gray-500 max-w-2xl mx-auto">
					Hệ thống showroom và khu vực kỹ thuật hiện đại, nơi đam mê tốc độ được phục vụ chuyên nghiệp.
				</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<!-- Showroom Card -->
				<div class="relative group overflow-hidden rounded-[28px] shadow-2xl aspect-[4/5] bg-gray-100">
					<img 
						src="/images/about/interior.png" 
						alt="Showroom Interior" 
						class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-95 sepia-[0.1]"
					>
					<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
						<div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
							<h3 class="text-white text-xl font-black mb-2 uppercase">Showroom Hiện Đại</h3>
							<p class="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">Không gian trưng bày đẳng cấp với đầy đủ các dòng xe mới nhất.</p>
						</div>
					</div>
				</div>

				<!-- Team Card -->
				<div class="relative group overflow-hidden rounded-[28px] shadow-2xl aspect-[4/5] bg-gray-100">
					<img 
						src="/images/about/team.png" 
						alt="Our Team" 
						class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-95"
					>
					<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
						<div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
							<h3 class="text-white text-xl font-black mb-2 uppercase">Đội Ngũ Tận Tâm</h3>
							<p class="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">Đội ngũ tư vấn và kỹ thuật viên nhiệt huyết, luôn sẵn sàng hỗ trợ khách hàng.</p>
						</div>
					</div>
				</div>
				
				<!-- Maintenance Card -->
				<div class="relative group overflow-hidden rounded-[28px] shadow-2xl aspect-[4/5] bg-gray-100">
					<img 
						src="/images/about/maintenance.png" 
						alt="Maintenance Area" 
						class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-90 sepia-[0.1]"
					>
					<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
						<div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
							<h3 class="text-white text-xl font-black mb-2 uppercase">Khu Vực Kỹ Thuật</h3>
							<p class="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">Trang thiết bị tiên tiến cùng quy trình bảo dưỡng đạt chuẩn chính hãng.</p>
						</div>
					</div>
				</div>
			</div>

		</div>
	</section>
</template>

