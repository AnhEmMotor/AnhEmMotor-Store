<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
	transition: {
		name: "page",
		mode: "out-in",
	},
});

useSeoMeta({
	title: "Tải Ứng Dụng AnhEmMoto App | Đặt Lịch & Bảo Dưỡng Nhanh Chóng",
	description: "Tải ngay App AnhEmMoto để trải nghiệm dịch vụ chăm sóc xe máy hàng đầu: đặt lịch sửa chữa 30s, theo dõi sổ bảo dưỡng điện tử, tích điểm đổi quà và săn ngàn ưu đãi đặc quyền.",
});

const appStore = useAppStore();

// Lấy dữ liệu bất đồng bộ chuẩn Nuxt 3
await useAsyncData("app-content", async () => {
	await appStore.fetchAppContent();
	return true;
});

// Trạng thái Accordion FAQ
const activeFaq = ref(null);
const toggleFaq = (index) => {
	activeFaq.value = activeFaq.value === index ? null : index;
};

// Logic hiệu ứng cuộn mượt mà chuẩn AnhEmMotor
if (import.meta.client) {
	onMounted(() => {
		const observerOptions = {
			threshold: 0.05,
			rootMargin: "0px 0px -40px 0px"
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('active');
				}
			});
		}, observerOptions);

		document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
	});
}
</script>

<template>
	<div v-if="appStore.appContent" class="min-h-screen bg-slate-950 text-white pt-24 pb-16 overflow-hidden font-sans">
		<!-- HERO SECTION -->
		<section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 z-10">
			<!-- Background Glows -->
			<div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
			<div class="absolute top-10 right-10 w-[300px] h-[300px] bg-red-950/5 rounded-full blur-[100px] pointer-events-none" />

			<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
				<!-- Left Text & CTAs -->
				<div class="lg:col-span-7 space-y-8 text-center lg:text-left">
					<div class="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-xs font-extrabold uppercase tracking-widest animate-reveal-down">
						<Icon name="ph:sparkle-fill" class="animate-pulse" /> {{ appStore.appContent.subtitle }}
					</div>

					<div class="animate-reveal-left opacity-0 [animation-delay:200ms] fill-mode-forwards">
						<h1 class="text-4xl sm:text-5xl lg:text-6xl font-[1000] tracking-tight uppercase leading-none" style="transform: skewX(-12deg); -webkit-transform: skewX(-12deg); transform-origin: left center;">
							ANHEMMOTO <span class="text-red-600 font-black">APP</span>
						</h1>
					</div>

					<p class="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed animate-reveal-up opacity-0 [animation-delay:400ms] fill-mode-forwards">
						{{ appStore.appContent.description }}
					</p>

					<!-- Download Buttons -->
					<div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 animate-reveal-up opacity-0 [animation-delay:600ms] fill-mode-forwards">
						<a :href="appStore.appContent.downloadLinks.appStore" target="_blank" class="flex items-center gap-3 px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-white/5 hover:shadow-[0_8px_25px_rgba(255,255,255,0.08)] font-black text-left w-full sm:w-auto">
							<Icon name="ph:apple-logo-fill" class="text-3xl text-gray-900" />
							<div class="leading-none">
								<div class="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Tải ứng dụng trên</div>
								<div class="text-sm font-[1000] mt-0.5">App Store</div>
							</div>
						</a>

						<a :href="appStore.appContent.downloadLinks.googlePlay" target="_blank" class="flex items-center gap-3 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/10 shadow-lg hover:shadow-[0_8px_25px_rgba(230,0,35,0.25)] hover:border-red-650/40 font-black text-left w-full sm:w-auto">
							<Icon name="ph:google-play-logo-fill" class="text-3xl text-red-650" />
							<div class="leading-none">
								<div class="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Tải ứng dụng trên</div>
								<div class="text-sm font-[1000] mt-0.5">Google Play</div>
							</div>
						</a>
					</div>

					<!-- RATINGS SECTION - Ngay dưới 2 nút Download (Cân đối nhất) -->
					<div class="flex items-center justify-center lg:justify-start gap-3 pt-2 animate-reveal-up opacity-0 [animation-delay:800ms] fill-mode-forwards">
						<div class="flex items-center gap-0.5 text-red-500">
							<Icon name="ph:star-fill" class="text-lg" />
							<Icon name="ph:star-fill" class="text-lg" />
							<Icon name="ph:star-fill" class="text-lg" />
							<Icon name="ph:star-fill" class="text-lg" />
							<Icon name="ph:star-fill" class="text-lg" />
						</div>
						<div class="text-sm font-bold text-gray-400">
							<span class="text-white font-extrabold text-base">4.9 / 5.0</span> (12,800+ đánh giá thực tế)
						</div>
					</div>
				</div>

				<!-- Right Phone Mockup -->
				<div class="lg:col-span-5 flex justify-center relative animate-reveal-right opacity-0 [animation-delay:400ms] fill-mode-forwards">
					<!-- Glow behind phone -->
					<div class="absolute inset-0 bg-red-600/10 rounded-full blur-3xl pointer-events-none scale-75" />

					<!-- Phone Container -->
					<div class="relative w-[290px] h-[580px] bg-slate-900 rounded-[3rem] border-4 border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] p-2">
						<!-- Dynamic Screen Shine -->
						<div class="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent rounded-[2.5rem] pointer-events-none z-20" />

						<!-- Notch -->
						<div class="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-full z-30 flex items-center justify-center gap-1.5">
							<div class="w-2 h-2 rounded-full bg-slate-900 border border-white/10" />
							<div class="w-12 h-1 bg-slate-800 rounded-full" />
						</div>

						<!-- App Internal UI Mockup -->
						<div class="w-full h-full bg-slate-950 rounded-[2.5rem] overflow-hidden flex flex-col p-4 pt-10 gap-3 text-left relative z-10 border border-white/5">
							<!-- Header -->
							<div class="flex justify-between items-center">
								<div>
									<div class="text-[9px] text-gray-500 font-bold">Xin chào,</div>
									<div class="text-xs font-black text-white">Khách hàng AnhEm</div>
								</div>
								<div class="w-8 h-8 rounded-full bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500">
									<Icon name="ph:bell-fill" class="text-sm" />
								</div>
							</div>

							<!-- Promotion Card -->
							<div class="bg-gradient-to-br from-red-600 to-red-850 p-4 rounded-2xl text-white shadow-lg shadow-red-600/40 border border-red-500/20">
								<span class="text-[8px] bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase">Ưu đãi hôm nay</span>
								<h3 class="text-sm font-black mt-1 leading-tight">Thay dầu xe máy<br>Giảm ngay 20%</h3>
								<p class="text-[9px] text-white/80 mt-1 font-bold">Độc quyền đặt lịch trên App</p>
							</div>

							<!-- Booking CTA -->
							<div class="bg-white/5 border border-white/10 hover:border-red-600/35 hover:shadow-[0_8px_20px_rgba(230,0,35,0.15)] hover:bg-white/[0.08] transition-all duration-300 rounded-2xl p-4 flex items-center justify-between cursor-pointer group/mock">
								<div class="flex items-center gap-3">
									<div class="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-[0_4px_10px_rgba(230,0,35,0.3)] group-hover/mock:scale-105 transition-all">
										<Icon name="ph:calendar-check-fill" />
									</div>
									<div>
										<p class="text-xs font-black group-hover/mock:text-red-500 transition-colors">Đặt Lịch Bảo Dưỡng</p>
										<p class="text-[8px] text-gray-500 font-bold">Chọn giờ & cửa hàng</p>
									</div>
								</div>
								<Icon name="ph:caret-right-bold" class="text-gray-400 text-xs group-hover/mock:translate-x-1 transition-transform" />
							</div>

							<!-- Grid -->
							<div class="grid grid-cols-2 gap-2.5">
								<div class="bg-white/5 border border-white/10 hover:border-red-600/35 hover:shadow-[0_8px_20px_rgba(230,0,35,0.15)] hover:bg-white/[0.08] transition-all duration-300 rounded-2xl p-3 flex flex-col justify-between h-22 cursor-pointer group/mock2">
									<Icon name="ph:wrench-fill" class="text-red-500 text-lg group-hover/mock2:scale-110 transition-transform" />
									<div>
										<p class="text-[10px] font-black group-hover/mock2:text-red-500 transition-colors">Sổ Bảo Dưỡng</p>
										<p class="text-[7px] text-gray-500 font-bold">Tra cứu lịch sử xe</p>
									</div>
								</div>
								<div class="bg-white/5 border border-white/10 hover:border-red-600/35 hover:shadow-[0_8px_20px_rgba(230,0,35,0.15)] hover:bg-white/[0.08] transition-all duration-300 rounded-2xl p-3 flex flex-col justify-between h-22 cursor-pointer group/mock3">
									<Icon name="ph:gift-fill" class="text-red-500 text-lg group-hover/mock3:scale-110 transition-transform" />
									<div>
										<p class="text-[10px] font-black group-hover/mock3:text-red-500 transition-colors">Đổi Quà Tặng</p>
										<p class="text-[7px] text-gray-500 font-bold">Tích điểm hội viên</p>
									</div>
								</div>
							</div>

							<!-- Rating Badge - Tự động giãn dài xuống dưới để lấp đầy khoảng trống -->
							<div class="flex-1 bg-white/5 border border-white/10 hover:border-red-600/30 hover:shadow-[0_8px_20px_rgba(230,0,35,0.1)] hover:bg-white/[0.08] transition-all duration-300 rounded-2xl p-4 flex flex-col justify-center items-center gap-2">
								<div class="w-9 h-9 rounded-full bg-red-600/10 flex items-center justify-center text-red-500 shrink-0 shadow-[0_0_12px_rgba(230,0,35,0.3)]">
									<Icon name="ph:star-fill" class="text-lg" />
								</div>
								<div class="text-center leading-none">
									<p class="text-xs font-black text-white">4.9 / 5.0</p>
									<p class="text-[8px] text-gray-400 font-extrabold mt-1.5">App Store & Google Play</p>
									<p class="text-[8px] text-gray-400 font-bold mt-1">(12,800+ đánh giá thực tế)</p>
								</div>
							</div>

							<!-- Emergency SOS Button -->
							<div class="mt-auto bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 shadow-[0_0_12px_rgba(230,0,35,0.25)] hover:shadow-[0_0_20px_rgba(230,0,35,0.45)] hover:scale-[1.02] rounded-xl py-2 px-3 flex items-center justify-center gap-2 text-center text-red-500 font-bold text-[10px] tracking-wider uppercase cursor-pointer transition-all duration-300">
								<Icon name="ph:first-aid-kit-fill" class="text-sm animate-pulse" /> Cứu Hộ Khẩn Cấp 24/7
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- STATS SECTION -->
		<section class="bg-slate-900/50 border-y border-white/5 py-10 relative z-10 reveal">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
					<div v-for="stat in appStore.appContent.stats" :key="stat.label">
						<p class="text-3xl sm:text-4xl font-[1000] text-red-500">{{ stat.value }}</p>
						<p class="text-xs font-black uppercase tracking-wider text-gray-400 mt-1">{{ stat.label }}</p>
					</div>
				</div>
			</div>
		</section>

		<!-- FEATURES SECTION -->
		<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 reveal">
			<div class="text-center max-w-3xl mx-auto mb-16">
				<h2 class="text-3xl sm:text-4xl font-[1000] tracking-tight uppercase italic">
					TÍNH NĂNG <span class="text-red-500">NỔI BẬT</span> CỦA APP
				</h2>
				<p class="text-gray-400 mt-4 font-bold text-sm sm:text-base">
					Toàn bộ tiện ích chăm sóc xe máy được tinh gọn tối đa trong một ứng dụng duy nhất, mang lại sự tiện lợi vượt trội cho bạn.
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<div v-for="(feat, index) in appStore.appContent.features" :key="feat.title" :class="`bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-red-600/40 hover:shadow-[0_15px_45px_-12px_rgba(230,0,35,0.28)] hover:-translate-y-1.5 transition-all duration-500 group reveal reveal-delay-${(index % 3) + 1}`">
					<div class="w-12 h-12 rounded-2xl bg-red-600/10 group-hover:bg-red-600 flex items-center justify-center text-red-500 group-hover:text-white transition-all duration-500 mb-6">
						<Icon :name="feat.icon" class="text-2xl" />
					</div>
					<h3 class="text-lg font-black uppercase tracking-wide">{{ feat.title }}</h3>
					<p class="text-gray-400 text-sm font-semibold mt-3 leading-relaxed">
						{{ feat.description }}
					</p>
				</div>
			</div>
		</section>

		<!-- FAQ SECTION -->
		<section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 border-t border-white/5 reveal">
			<div class="text-center mb-12">
				<h2 class="text-2xl sm:text-3xl font-[1000] tracking-tight uppercase italic">
					CÂU HỎI <span class="text-red-500">THƯỜNG GẶP</span>
				</h2>
			</div>

			<div class="space-y-4">
				<div v-for="(faq, index) in appStore.appContent.faqs" :key="index" class="bg-white/5 border rounded-2xl overflow-hidden transition-all duration-300" :class="[activeFaq === index ? 'border-red-600/40 bg-white/10 shadow-[0_10px_30px_rgba(230,0,35,0.06)]' : 'border-white/10 hover:border-red-600/20 hover:bg-white/[0.07] hover:shadow-[0_8px_20px_rgba(230,0,35,0.04)]']">
					<button class="w-full flex items-center justify-between p-5 text-left font-black text-sm sm:text-base hover:bg-white/5 transition-all outline-none" @click="toggleFaq(index)">
						<span>{{ faq.question }}</span>
						<Icon :name="activeFaq === index ? 'ph:minus-bold' : 'ph:plus-bold'" class="text-red-500 text-sm transition-transform" />
					</button>
					<div v-show="activeFaq === index" class="px-5 pb-5 pt-1 text-gray-400 text-xs sm:text-sm font-semibold leading-relaxed border-t border-white/5">
						{{ faq.answer }}
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
@keyframes reveal-down {
	from { opacity: 0; transform: translateY(-30px); }
	to { opacity: 1; transform: translateY(0); }
}

@keyframes reveal-left {
	from { opacity: 0; transform: translateX(-50px); }
	to { opacity: 1; transform: translateX(0); }
}

@keyframes reveal-right {
	from { opacity: 0; transform: translateX(50px); }
	to { opacity: 1; transform: translateX(0); }
}

@keyframes reveal-up {
	from { opacity: 0; transform: translateY(40px); }
	to { opacity: 1; transform: translateY(0); }
}

.animate-reveal-down {
	animation: reveal-down 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-reveal-left {
	animation: reveal-left 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-reveal-right {
	animation: reveal-right 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-reveal-up {
	animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.fill-mode-forwards {
	animation-fill-mode: forwards;
}
</style>
