<script setup></script>

<template>
	<section
		class="relative h-[250px] md:h-[400px] flex items-center justify-center overflow-hidden"
	>
		<div
			class="absolute inset-0 bg-[url('https://cdn.honda.com.vn/news-motorbike/July2025/PC.webp')] bg-cover bg-center"
		>
			<div
				class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"
			/>
		</div>

		<div class="container mx-auto px-4 relative z-10">
			<div class="max-w-2xl animate-fade-in-left">
				<span
					class="inline-block bg-primary-red text-white text-xs md:text-sm font-bold px-4 py-1 rounded-full mb-4 uppercase tracking-widest"
				>
					Chương trình đặc biệt
				</span>
				<h1
					class="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg"
				>
					TỔNG HỢP <span class="text-primary-red">KHUYẾN MÃI</span><br />
					ANHEM MOTOR
				</h1>
				<p class="text-gray-200 text-lg md:text-xl font-medium max-w-xl">
					Cập nhật những ưu đãi hấp dẫn nhất dành cho các dòng xe Honda & Yamaha
					mới nhất trong tháng.
				</p>
			</div>
		</div>

		<div
			class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent"
		/>
	</section>
</template>

<style scoped>
.bg-primary-red {
	background-color: #e65151;
}
.text-primary-red {
	color: #e65151;
}

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

.animate-fade-in-left {
	animation: fadeInLeft 1s ease-out forwards;
}
</style>
