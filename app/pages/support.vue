<script setup>
useSeoMeta({
	title: "Hỗ trợ khách hàng | AnhEm Motor",
	description: "Trung tâm hỗ trợ khách hàng AnhEm Motor - Giải đáp thắc mắc về mua xe, trả góp và bảo dưỡng định kỳ.",
});

const contactStore = useContactStore();

const indicators = [
	'Phản hồi trong 15 phút',
	'Hỗ trợ nhanh trong giờ hoạt động',
	'Tư vấn miễn phí toàn hệ thống'
];

const handleContactSubmit = async (data) => {

	const { resetForm, ...formData } = data;
	const success = await contactStore.submitContact(formData);
	if (success && resetForm) {
		resetForm();
	}
};
// Scroll Reveal Logic
onMounted(() => {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('reveal-visible')
			}
		})
	}, { threshold: 0.1 })

	document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
	<div class="bg-white min-h-screen overflow-x-hidden">
		<!-- [1] NEW HERO: SEARCH -->
		<SupportSearchHero class="reveal reveal-up" />

		<!-- [2] SUPPORT CATEGORIES (Danh mục câu hỏi) -->
		<SupportCategories class="bg-white reveal reveal-up" />

		<!-- [3] FAQ SECTION (Câu hỏi thường gặp) -->
		<SupportFAQ class="reveal reveal-up" />

		<!-- [4] CONTACT SECTION (Form đăng ký liên hệ) -->
		<section class="relative py-24 bg-white overflow-hidden border-t border-gray-100 reveal reveal-up">
			<!-- Background Decorative Elements -->
			<div class="absolute top-0 right-0 w-1/3 h-full bg-red-600/5 -skew-x-12 transform translate-x-1/4"></div>
			
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
					<!-- Info Side -->
					<div class="flex flex-col reveal reveal-left">
						<div class="space-y-6 flex-1">
							<div class="space-y-6">
								<div class="inline-flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full shadow-sm border border-gray-100">
									<span class="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
									<span class="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-500">Kết nối trực tiếp</span>
								</div>
								<h2 class="text-4xl lg:text-6xl font-extrabold text-gray-900 uppercase tracking-tighter leading-[1]">
									Trung tâm <br />
									<span class="text-red-600">Hỗ trợ tận tâm</span>
								</h2>

								<p class="text-gray-500 text-lg font-medium leading-relaxed max-w-md italic border-l-4 border-red-600/30 pl-6">
									"Chúng tôi lắng nghe để thấu hiểu, phản hồi để sẻ chia. Mọi thắc mắc của bạn là cơ hội để AnhEm Motor hoàn thiện hơn."
								</p>
							</div>
						</div>

						<!-- Quick Support Indicators -->
						<div class="space-y-5 pt-12 border-t border-gray-100 max-w-sm mt-12">
							<div v-for="(indicator, idx) in indicators" :key="idx" class="flex items-center gap-4 group cursor-default">
								<div class="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:rotate-12">
									<Icon name="ph:check-bold" class="text-xs text-primary group-hover:text-white" />
								</div>
								<span class="text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">{{ indicator }}</span>
							</div>
						</div>

						<!-- NEW: Quick Channels -->
						<div class="mt-12 grid grid-cols-2 gap-6 max-w-md">
							<a href="tel:1900xxxx" class="flex flex-col p-6 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all group border border-gray-100">
								<Icon name="ph:phone-call-fill" class="text-4xl text-primary group-hover:scale-110 transition-transform mb-6" />
								<h4 class="text-[10px] font-black uppercase tracking-[0.2em] mb-1 text-gray-400">Hotline 24/7</h4>
								<p class="text-lg font-black text-gray-900">1900.xxxx</p>
							</a>
							<a href="#" class="flex flex-col p-6 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all group border border-gray-100">
								<Icon name="ph:chat-circle-dots-fill" class="text-4xl text-primary group-hover:scale-110 transition-transform mb-6" />
								<h4 class="text-[10px] font-black uppercase tracking-[0.2em] mb-1 text-gray-400">Zalo Tư vấn</h4>
								<p class="text-lg font-black text-gray-900">Phản hồi ngay</p>
							</a>
						</div>

						<!-- RESTORED: Commitment Cards -->
						<div class="mt-10 space-y-6">
							<div class="flex items-start gap-6 p-6 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:shadow-gray-100 transition-all bg-gray-50/30 group">
								<div class="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500">
									<Icon name="ph:shield-star-fill" class="text-3xl text-primary group-hover:text-white" />
								</div>
								<div>
									<h4 class="text-sm font-black text-gray-900 uppercase tracking-widest mb-2">Cam kết bảo mật</h4>
									<p class="text-[11px] text-gray-500 font-medium leading-relaxed">
										Thông tin của bạn được bảo mật tuyệt đối và chỉ sử dụng cho mục đích tư vấn hỗ trợ từ AnhEm Motor.
									</p>
								</div>
							</div>
							<div class="flex items-start gap-6 p-6 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:shadow-gray-100 transition-all bg-gray-50/30 group">
								<div class="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500">
									<Icon name="ph:clock-countdown-fill" class="text-3xl text-primary group-hover:text-white" />
								</div>
								<div>
									<h4 class="text-sm font-black text-gray-900 uppercase tracking-widest mb-2">Phản hồi thần tốc</h4>
									<p class="text-[11px] text-gray-500 font-medium leading-relaxed">
										Đội ngũ của chúng tôi cam kết liên hệ lại trong vòng tối đa 30 phút trong giờ làm việc.
									</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Form Side -->
					<div class="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/80 border border-gray-50 overflow-hidden reveal reveal-right transform hover:scale-[1.01] transition-transform duration-700">
						<div class="bg-primary/5 p-8 border-b border-gray-50">
							<h3 class="text-xl font-black text-gray-900 uppercase tracking-wider">Gửi yêu cầu hỗ trợ</h3>
							<p class="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Thông tin của bạn sẽ được xử lý bảo mật</p>
						</div>
						<ContactForm
							:is-submitting="contactStore.isSubmitting"
							:status-message="contactStore.statusMessage"
							:status-type="contactStore.statusType"
							@submit="handleContactSubmit"
						/>
						
						<!-- [5] PROCESS TIMELINE (Integrated) -->
						<div class="px-6 sm:px-10 pb-12 border-t border-gray-50 bg-gray-50/50">
							<SupportTimeline />
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- [5] STORE LOCATOR -->
		<SupportStoreLocator class="bg-white reveal reveal-up" />
	</div>
</template>

<style>
.reveal {
	opacity: 0;
	transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-up { transform: translateY(50px); }
.reveal-left { transform: translateX(-50px); }
.reveal-right { transform: translateX(50px); }
.reveal-visible {
	opacity: 1;
	transform: translate(0, 0);
}
</style>

<style scoped>
@reference "../assets/main.css";
</style>
