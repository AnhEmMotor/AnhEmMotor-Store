<template>
	<div class="hidden lg:block relative bg-[#0a0a0a] overflow-hidden">
		<img 
			src="/assets/image/index/login-banner-branded.png" 
			alt="AnhEmMotor Showroom" 
			class="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
		>


		<div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/>
		
		<div class="relative h-full flex flex-col justify-end p-16 text-white">
			<div class="mb-8">
				<h2 class="text-4xl font-extrabold leading-tight mb-4 italic uppercase tracking-tighter">
					Đồng hành cùng bạn <br >
					<span class="text-primary">trên mọi hành trình</span>
				</h2>
				<p class="text-white/60 text-lg font-medium">Đăng nhập để theo dõi lịch bảo dưỡng, báo giá và nhận ưu đãi đặc quyền từ AnhEm Motor.</p>
			</div>
			
			<div class="space-y-4">
				<div v-for="item in brandingFeatures" :key="item" class="flex items-center gap-3">
					<div class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
						<Icon name="fa6-solid:check" class="text-primary text-xs" />
					</div>
					<span class="text-sm font-bold uppercase tracking-wider text-white/80">{{ item }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const brandingFeatures = [
	'Theo dõi bảo dưỡng',
	'Quản lý báo giá',
	'Lịch sử dịch vụ'
];
</script>

<style scoped>
@keyframes slow-zoom {
	from { transform: scale(1.05); }
	to { transform: scale(1.15); }
}
.animate-slow-zoom {
	animation: slow-zoom 20s linear infinite alternate;
}
</style>

