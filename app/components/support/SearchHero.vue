<template>
	<section class="relative pt-16 pb-20 overflow-hidden bg-gray-900">
		<!-- Background Image with Lighter Overlay -->
		<div class="absolute inset-0 z-0">
			<img 
				src="/images/support/hero-bg.png" 
				alt="AnhEm Motor Support Team" 
				class="w-full h-full object-cover opacity-70"
			>
			<!-- Softer Gradient to highlight image -->
			<div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-white"/>
		</div>

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
			<div class="space-y-6 max-w-3xl mx-auto">
				<div class="space-y-3">
					<div class="inline-flex items-center gap-2.5 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 mb-2">
						<span class="w-1 h-1 bg-red-600 rounded-full animate-pulse"/>
						<span class="text-[9px] font-extrabold uppercase tracking-[0.3em] text-white">Trung tâm hỗ trợ</span>
					</div>
					<h1 class="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight drop-shadow-2xl">
						Anh Em Motor có thể <br >
						giúp gì được cho bạn?
					</h1>
				</div>

				<!-- Global Search Bar -->
				<div class="relative group max-w-xl mx-auto pt-2">
					<div class="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"/>
					<div class="relative flex items-center bg-white rounded-xl overflow-hidden shadow-2xl">
						<div class="pl-5 text-gray-400">
							<Icon name="fa6-solid:magnifying-glass" class="text-base" />
						</div>
						<input 
							type="text" 
							placeholder="Nhập vấn đề bạn đang gặp phải..." 
							class="w-full py-4 px-5 text-[13px] font-bold text-gray-900 outline-none placeholder:text-gray-400"
						>
						<button class="mr-1.5 px-6 py-3 bg-gray-900 text-white rounded-lg text-[10px] font-extrabold uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg">
							Tìm kiếm
						</button>
					</div>
				</div>

				<!-- Quick Keywords -->
				<div class="flex flex-wrap justify-center gap-4 pt-1">
					<span class="text-[9px] font-extrabold text-white/50 uppercase tracking-widest drop-shadow-sm">Từ khóa:</span>
					<a
v-for="tag in ['Trả góp', 'Bảng giá xe', 'Địa chỉ', 'Bảo dưỡng']" :key="tag" href="#" 
						class="text-[9px] font-extrabold text-white hover:text-red-500 uppercase tracking-widest transition-colors border-b border-white/20 hover:border-red-500 pb-0.5 drop-shadow-md"
					>
						{{ tag }}
					</a>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
</script>

<style scoped>
</style>
