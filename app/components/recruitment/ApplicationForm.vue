<template>
	<section id="apply-form" class="py-20 bg-white overflow-hidden relative">

		<!-- Background decorative light -->
		<div class="absolute bottom-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"/>

		<div class="container mx-auto px-6">
			<div class="flex flex-col lg:flex-row gap-16 items-start">
				<!-- Process Section -->
				<div class="lg:w-5/12 space-y-12">
					<div class="space-y-4">
						<div class="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full">
							<span class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"/>
							<span class="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Hành trình sự nghiệp</span>
						</div>
						<h2 class="text-3xl md:text-4xl font-black text-gray-900 leading-[0.95] italic uppercase tracking-tighter">
							Quy trình <br >
							<span class="text-primary underline decoration-black/5 underline-offset-8">Ứng tuyển</span>
						</h2>
						<p class="text-base text-gray-500 font-medium leading-relaxed max-w-lg">
							Chúng tôi tối giản quy trình để bạn có thể gia nhập đội ngũ nhanh nhất, tập trung vào năng lực thực tế.
						</p>
					</div>


					<div class="space-y-12 relative">
						<!-- Progress Line -->
						<div class="absolute left-7 top-0 bottom-0 w-[2px] bg-gray-100"/>

						<div v-for="(step, index) in steps" :key="index" class="relative flex gap-10 group">
							<div class="w-14 h-14 rounded-2xl bg-white border-2 border-gray-100 flex items-center justify-center text-gray-400 font-black text-xl z-10 group-hover:border-primary group-hover:text-primary group-hover:scale-110 transition-all duration-500 shadow-sm">
								{{ index + 1 }}
							</div>
							<div class="pt-2">
								<h3 class="text-xl font-black text-gray-900 mb-2 group-hover:text-primary transition-colors italic uppercase tracking-tight">{{ step.title }}</h3>
								<p class="text-gray-500 font-medium leading-relaxed">{{ step.desc }}</p>
							</div>
						</div>
					</div>

					<div class="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex items-start gap-6">
						<div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-primary/20">
							<Icon name="fa6-solid:circle-info" class="text-xl" />
						</div>
						<div>
							<h4 class="text-lg font-black text-gray-900 italic uppercase tracking-tight mb-2">Lưu ý nhỏ</h4>
							<p class="text-gray-500 text-sm font-medium leading-relaxed">
								Nếu bạn chưa có sẵn CV, đừng ngần ngại để lại thông tin. Chúng tôi sẽ liên hệ để trao đổi trực tiếp nếu thông tin cơ bản phù hợp.
							</p>
						</div>
					</div>
				</div>

				<!-- Form Section -->
				<div class="lg:w-7/12 w-full">
					<div class="bg-[#0a0a0a] rounded-[3.5rem] p-10 md:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden group">
						<!-- Glows -->
						<div class="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -mr-40 -mt-40 group-hover:bg-primary/30 transition-all duration-1000"/>
						<div class="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -ml-32 -mb-32"/>

						<div class="relative z-10">
							<div class="mb-12">
								<h3 class="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Gửi hồ sơ ngay</h3>
								<p class="text-white/40 font-medium">Thông tin của bạn sẽ được bộ phận nhân sự bảo mật tuyệt đối.</p>
							</div>

							<form class="space-y-8" @submit.prevent="submitForm">
								<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div class="space-y-3">
										<label class="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Họ và Tên *</label>
										<input
											v-model="form.name"
											type="text"
											placeholder="Nguyễn Văn A"
											class="w-full px-8 py-5 rounded-[1.5rem] bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium"
											required
										>
									</div>
									<div class="space-y-3">
										<label class="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Số điện thoại *</label>
										<input
											v-model="form.phone"
											type="tel"
											placeholder="09xx xxx xxx"
											class="w-full px-8 py-5 rounded-[1.5rem] bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium"
											required
										>
									</div>
								</div>

								<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div class="space-y-3">
										<label class="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Email</label>
										<input
											v-model="form.email"
											type="email"
											placeholder="email@example.com"
											class="w-full px-8 py-5 rounded-[1.5rem] bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium"
										>
									</div>
									<div class="space-y-3 relative">
										<label class="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Vị trí ứng tuyển *</label>
										<div class="relative">
											<select
												v-model="form.position"
												class="w-full px-8 py-5 rounded-[1.5rem] bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none font-medium"
												required
											>
												<option value="" disabled class="bg-[#1a1a1a]">Chọn vị trí...</option>
												<option v-for="pos in positions" :key="pos" :value="pos" class="bg-[#1a1a1a]">{{ pos }}</option>
												<option value="Khác" class="bg-[#1a1a1a]">Khác (Vui lòng ghi rõ ở ghi chú)</option>
											</select>
											<Icon name="fa6-solid:chevron-down" class="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 text-xs pointer-events-none" />
										</div>
									</div>
								</div>

								<div class="space-y-3">
									<label class="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Đính kèm CV (PDF, DOCX)</label>
									<div
										class="relative w-full px-8 py-10 rounded-[2rem] bg-white/5 border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-white/[0.07] transition-all flex flex-col items-center justify-center cursor-pointer group/upload"
										@click="triggerFileUpload"
									>
										<div class="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover/upload:scale-110 group-hover/upload:bg-primary transition-all duration-500">
											<Icon name="fa6-solid:cloud-arrow-up" class="text-3xl text-white/20 group-hover/upload:text-white transition-colors" />
										</div>
										<p class="text-sm font-black text-white/30 uppercase tracking-widest group-hover/upload:text-white transition-colors">
											{{ fileName || 'Tải lên hồ sơ của bạn' }}
										</p>
										<input ref="fileInput" type="file" class="hidden" @change="handleFileChange" >
									</div>
								</div>

								<div class="space-y-3">
									<label class="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Ghi chú thêm</label>
									<textarea
										v-model="form.message"
										rows="4"
										placeholder="Giới thiệu ngắn về bản thân hoặc kinh nghiệm của bạn..."
										class="w-full px-8 py-5 rounded-[2rem] bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none font-medium"
									/>
								</div>

								<button
									type="submit"
									:disabled="isSubmitting"
									class="group w-full py-6 bg-primary text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.4em] hover:bg-white hover:text-primary active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-xl shadow-primary/20"
								>
									<template v-if="!isSubmitting">
										GỬI HỒ SƠ NGAY
										<Icon name="fa6-solid:paper-plane" class="text-sm group-hover:translate-x-2 transition-transform" />
									</template>
									<template v-else>
										<Icon name="fa6-solid:circle-notch" class="animate-spin text-lg" />
										ĐANG XỬ LÝ...
									</template>
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
const props = defineProps({
	preSelectedPosition: String
});

const form = ref({
	name: '',
	phone: '',
	email: '',
	position: '',
	message: ''
});

const { submitApplication, isSubmitting } = useRecruitment();
const fileName = ref('');
const fileInput = ref(null);

const positions = [
	'Nhân viên Tư vấn Bán hàng',
	'Kỹ thuật viên Sửa chữa & Bảo dưỡng',
	'Nhân viên Chăm sóc Khách hàng',
	'Quản lý Showroom',
	'Nhân viên Kho / Phụ tùng'
];

const steps = [
	{
		title: 'Gửi hồ sơ',
		desc: 'Hoàn thiện form ứng tuyển trực tuyến hoặc gửi trực tiếp tại hệ thống cửa hàng AnhEm Motor.'
	},
	{
		title: 'Sơ tuyển',
		desc: 'Bộ phận nhân sự sẽ xem xét hồ sơ và liên hệ phỏng vấn sơ bộ trong vòng 24-48h làm việc.'
	},
	{
		title: 'Phỏng vấn',
		desc: 'Trao đổi trực tiếp để hiểu rõ hơn về năng lực, thái độ và định hướng phát triển của bạn.'
	},
	{
		title: 'Thử việc',
		desc: 'Gia nhập đội ngũ, được đào tạo bài bản và bắt đầu hành trình bứt phá sự nghiệp mới.'
	}
];

watch(() => props.preSelectedPosition, (newVal) => {
	if (newVal) {
		form.value.position = newVal;
	}
});

const triggerFileUpload = () => fileInput.value.click();

const handleFileChange = (e) => {
	const file = e.target.files[0];
	if (file) {
		fileName.value = file.name;
	}
};

const submitForm = async () => {
	try {
		const response = await submitApplication(form.value);
		if (response.success) {
			alert('Cảm ơn bạn đã ứng tuyển! Chúng tôi sẽ liên hệ sớm nhất có thể.');
			form.value = { name: '', phone: '', email: '', position: '', message: '' };
			fileName.value = '';
		}
	} catch {
		alert('Có lỗi xảy ra, vui lòng thử lại sau.');
	}
};
</script>
