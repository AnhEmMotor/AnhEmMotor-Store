<template>
	<section ref="processRef" class="bg-gray-50 py-16 border-y border-gray-100 overflow-hidden relative">
		<!-- Background Accents -->
		<div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"/>
		<div class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"/>
		
		<div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
				<!-- Image Left -->
				<div 
					class="lg:col-span-5 relative order-2 lg:order-1 transition-all duration-1000"
					:class="isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-20'"
				>
					<div class="relative z-10 rounded-[2.5rem] overflow-hidden shadow-xl border-[8px] border-white group">
						<img src="/service-process.png" alt="Customer Service" class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000" >
						<div class="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
					</div>
					<!-- Experience Badge -->
					<div class="absolute -top-8 -right-8 w-44 h-44 bg-primary rounded-full flex flex-col items-center justify-center text-white border-[10px] border-gray-50 shadow-2xl group-hover:scale-110 transition-transform duration-500 z-20">
						<span class="text-4xl font-black">10+</span>
						<span class="text-[9px] font-black uppercase tracking-widest text-white/80">Năm Kinh Nghiệm</span>
					</div>
				</div>

				<!-- Content Right -->
				<div 
					class="lg:col-span-7 space-y-12 order-1 lg:order-2 transition-all duration-1000 delay-300"
					:class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'"
				>
					<div class="space-y-6">
						<h2 class="text-4xl md:text-5xl font-[1000] text-gray-900 leading-[0.9] tracking-tight">
							QUY TRÌNH <span class="text-primary italic underline decoration-primary/10 underline-offset-8">TẬN TÂM</span> <br >
							VÌ AN TOÀN CỦA BẠN
						</h2>

						<p class="text-gray-400 text-xs font-black uppercase tracking-[0.4em] flex items-center gap-3">
							<span class="w-2 h-2 bg-primary rounded-full"/>
							Minh bạch · Chuyên nghiệp · Nhanh chóng
						</p>
					</div>

					<div class="space-y-6">
						<div
v-for="(step, idx) in steps" :key="idx" 
							class="flex gap-6 p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
							:style="{ transitionDelay: `${idx * 200 + 500}ms` }"
							:class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
						>
							<div class="flex-shrink-0 w-16 h-16 bg-primary/5 rounded-[1.25rem] flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6 shadow-sm">
								<Icon :name="step.icon" class="text-3xl text-primary group-hover:text-white" />
							</div>
							<div class="space-y-2">
								<div class="flex items-center gap-3">
									<span class="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Bước 0{{ idx + 1 }}</span>
									<div class="w-10 h-[1px] bg-primary/20"/>
								</div>
								<h3 class="text-xl font-black text-gray-900 tracking-tight">{{ step.title }}</h3>

								<p class="text-gray-500 text-[13px] font-medium leading-relaxed max-w-lg">{{ step.desc }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const steps = [
	{
		title: "Đặt Lịch & Xác Nhận",
		desc: "Khách hàng đăng ký online hoặc qua hotline. Hệ thống sẽ xác nhận và sắp xếp kỹ thuật viên phù hợp nhất ngay lập tức.",
		icon: "fa6-solid:calendar-check"
	},
	{
		title: "Tiếp Nhận & Khám Xe",
		desc: "Kỹ thuật viên sử dụng máy chẩn đoán chuyên dụng để kiểm tra tổng quát tình trạng xe và báo giá chi tiết, minh bạch.",
		icon: "fa6-solid:wrench"
	},
	{
		title: "Hoàn Thiện & Bàn Giao",
		desc: "Thực hiện sửa chữa theo tiêu chuẩn hãng, kiểm tra vận hành và bàn giao xe sạch sẽ kèm sổ bảo hành điện tử.",
		icon: "fa6-solid:handshake-simple"
	}
];

const processRef = ref(null);
const isVisible = ref(false);

onMounted(() => {
	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			isVisible.value = true;
			observer.disconnect();
		}
	}, { threshold: 0.2 });

	if (processRef.value) {
		observer.observe(processRef.value);
	}
});
</script>

<style scoped>
.chat-slide-enter-active,
.chat-slide-leave-active {
	transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>

