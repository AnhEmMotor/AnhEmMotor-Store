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
</script>

<template>
	<div class="bg-white min-h-screen">
		<!-- [1] NEW HERO: SEARCH -->
		<SupportSearchHero />

		<!-- [2] SUPPORT CATEGORIES (Danh mục câu hỏi) -->
		<SupportCategories class="bg-white" />

		<!-- [3] FAQ SECTION (Câu hỏi thường gặp) -->
		<SupportFAQ />

		<!-- [4] CONTACT SECTION (Form đăng ký liên hệ) -->
		<section class="relative py-16 bg-white overflow-hidden border-t border-gray-100">
			<!-- Background Decorative Elements -->
			<div class="absolute top-0 right-0 w-1/3 h-full bg-red-600/5 -skew-x-12 transform translate-x-1/4"></div>
			
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
					<!-- Info Side -->
					<div class="flex flex-col">
						<div class="space-y-6 flex-1">
							<div class="space-y-5">
								<div class="inline-flex items-center gap-3 px-3 py-1.5 bg-gray-50 rounded-full shadow-sm border border-gray-100">
									<span class="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
									<span class="text-[9px] font-extrabold uppercase tracking-widest text-gray-400">Kết nối trực tiếp</span>
								</div>
								<h2 class="text-4xl lg:text-5xl font-extrabold text-gray-900 uppercase tracking-tight leading-[1.1]">
									Trung tâm <br />
									<span class="text-red-600">Hỗ trợ khách hàng</span>
								</h2>

								<p class="text-gray-500 text-sm font-medium leading-relaxed max-w-md">
									Nếu bạn không tìm thấy câu trả lời trong FAQ, đừng ngần ngại để lại thông tin hoặc liên hệ trực tiếp với chúng tôi qua các kênh dưới đây.
								</p>
							</div>
						</div>

						<!-- Quick Support Indicators -->
						<div class="space-y-4 pt-10 border-t border-gray-100 max-w-sm">
							<div v-for="(indicator, idx) in indicators" :key="idx" class="flex items-center gap-4 group">
								<div class="w-6 h-6 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
									<Icon name="ph:check-bold" class="text-[10px] text-primary group-hover:text-white" />
								</div>
								<span class="text-[11px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">{{ indicator }}</span>
							</div>
						</div>

						<!-- NEW: Quick Channels -->
						<div class="mt-12 grid grid-cols-2 gap-4 max-w-md">
							<a href="tel:1900xxxx" class="flex flex-col p-5 bg-gray-50 rounded-[24px] hover:bg-primary hover:text-white transition-all group border border-gray-100">
								<Icon name="ph:phone-call-fill" class="text-3xl text-primary group-hover:text-white mb-4" />
								<h4 class="text-xs font-black uppercase tracking-wider mb-1">Hotline 24/7</h4>
								<p class="text-[10px] font-bold opacity-60 uppercase tracking-widest">1900.xxxx</p>
							</a>
							<a href="#" class="flex flex-col p-5 bg-gray-50 rounded-[24px] hover:bg-primary hover:text-white transition-all group border border-gray-100">
								<Icon name="ph:chat-circle-dots-fill" class="text-3xl text-primary group-hover:text-white mb-4" />
								<h4 class="text-xs font-black uppercase tracking-wider mb-1">Zalo Tư vấn</h4>
								<p class="text-[10px] font-bold opacity-60 uppercase tracking-widest">Phản hồi ngay</p>
							</a>
						</div>

						<!-- NEW: Commitment Cards -->
						<div class="mt-10 space-y-6">
							<div class="flex items-start gap-6 p-6 rounded-[28px] border border-gray-100 hover:shadow-xl hover:shadow-gray-100 transition-all">
								<div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
									<Icon name="ph:shield-star-fill" class="text-3xl text-primary" />
								</div>
								<div>
									<h4 class="text-sm font-black text-gray-900 uppercase tracking-widest mb-2">Cam kết bảo mật</h4>
									<p class="text-[11px] text-gray-500 font-medium leading-relaxed">
										Thông tin của bạn được bảo mật tuyệt đối và chỉ sử dụng cho mục đích tư vấn hỗ trợ từ AnhEm Motor.
									</p>
								</div>
							</div>
							<div class="flex items-start gap-6 p-6 rounded-[28px] border border-gray-100 hover:shadow-xl hover:shadow-gray-100 transition-all">
								<div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
									<Icon name="ph:clock-countdown-fill" class="text-3xl text-primary" />
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
					<div class="bg-white rounded-[32px] shadow-2xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
						<ContactForm
							:is-submitting="contactStore.isSubmitting"
							:status-message="contactStore.statusMessage"
							:status-type="contactStore.statusType"
							@submit="handleContactSubmit"
						/>
						
						<!-- [5] PROCESS TIMELINE (Integrated) -->
						<div class="px-6 sm:px-10 pb-10">
							<SupportTimeline />
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- [5] STORE LOCATOR -->
		<SupportStoreLocator class="bg-white" />
	</div>
</template>

<style scoped>
</style>
