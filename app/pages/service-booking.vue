<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';

const route = useRoute();
const router = useRouter();
const maintenanceStore = useMaintenanceStore();
const bookingStore = useBookingStore();

const serviceId = route.query.id;
const isSubmitting = ref(false);
const isSuccess = ref(false);

const { data } = await useAsyncData("maintenance-services-booking", async () => {
	if (maintenanceStore.services.length === 0) {
		await maintenanceStore.fetchServices();
	}
	return maintenanceStore.services;
});

const service = computed(() => {
	return maintenanceStore.services.find(s => s.id == serviceId);
});

const form = reactive({
	fullName: '',
	email: '',
	phone: '',
	date: '',
	session: 'Sáng',
	hour: '08:00 AM',
	location: 'Tại cửa hàng',
	motorcycleModel: '',
	vehicleType: '',
	version: '',
	color: '',
	condition: '',
	note: '',
	isConfirmed: false
});

const morningHours = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'];
const afternoonHours = ['01:30 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'];

const availableHours = computed(() => {
	return form.session === 'Sáng' ? morningHours : afternoonHours;
});

watch(() => form.session, (newVal) => {
	form.hour = newVal === 'Sáng' ? morningHours[0] : afternoonHours[0];
});

const minDate = computed(() => {
	const today = new Date();
	return today.toISOString().split('T')[0];
});

const handleSubmit = async () => {
	isSubmitting.value = true;
	try {
		const preferredDate = new Date(form.date);
		const [timeStr, ampm] = form.hour.split(' ');
		const [hours, minutes] = timeStr.split(':').map(Number);
		
		let h = hours;
		if (ampm === 'PM' && h < 12) h += 12;
		if (ampm === 'AM' && h === 12) h = 0;
		
		preferredDate.setHours(h, minutes, 0);

		await bookingStore.createBooking({
			fullName: form.fullName,
			email: form.email,
			phoneNumber: form.phone,
			productVariantId: service.value?.id || null,
			preferredDate: preferredDate.toISOString(),
			location: form.location,
			note: `Loại xe: ${form.vehicleType}. Mẫu xe: ${form.motorcycleModel}. Phiên bản: ${form.version}. Màu sắc: ${form.color}. Tình trạng: ${form.condition}. Buổi: ${form.session}. Giờ: ${form.hour}. Ghi chú: ${form.note}`,
			bookingType: 'Maintenance'
		});

		isSuccess.value = true;
	} catch (error) {
		alert("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng kiểm tra lại thông tin.");
		console.error(error);
	} finally {
		isSubmitting.value = false;
	}
};

useHead({ title: 'Đăng ký Dịch vụ | AnhEm Motor' });
</script>

<template>
	<div class="booking-page min-h-screen bg-[#FDFDFD] py-12 lg:py-20">
		<!-- Decorative Background -->
		<div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
			<div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-600/5 rounded-full blur-[120px]"></div>
			<div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[100px]"></div>
		</div>

		<div class="container mx-auto px-6 relative z-10">
			<div class="max-w-7xl mx-auto">
				<!-- Header Section -->
				<div class="mb-6 animate-reveal-down">
					<h1 class="text-3xl lg:text-4xl font-[1000] text-gray-900 leading-none tracking-tighter uppercase italic">
						Đăng ký <span class="text-red-600">Dịch vụ</span>
					</h1>
					<div class="flex items-center gap-3 mt-3">
						<div class="h-[1px] w-8 bg-red-600"></div>
						<p class="text-gray-400 font-bold text-[8px] uppercase tracking-[0.3em]">
							Hệ thống đặt lịch chuyên nghiệp AnhEm Motor
						</p>
					</div>
				</div>

				<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
					<!-- Left: Form (Condensed) -->
					<div class="lg:col-span-8 animate-reveal-up pb-8">
						<div class="bg-white rounded-[2rem] p-6 lg:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
							<div class="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
							<div v-if="!isSuccess">
								<form @submit.prevent="handleSubmit" class="space-y-8">
									<!-- Customer Info -->
									<section class="space-y-6">
										<div class="flex items-center justify-between pb-3 border-b border-gray-50">
											<h2 class="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
												<span class="text-red-600 text-xl font-black">/01</span>
												Thông tin khách hàng
											</h2>
											<Icon name="ph:user-focus-fill" class="text-lg text-gray-200" />
										</div>
										<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
											<div class="space-y-2">
												<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Họ tên *</label>
												<input v-model="form.fullName" type="text" required placeholder="Ví dụ: Nguyễn Văn A" class="booking-input uppercase">
											</div>
											<div class="space-y-2">
												<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Số điện thoại *</label>
												<input v-model="form.phone" type="tel" required placeholder="09xx xxx xxx" class="booking-input">
											</div>
											<div class="space-y-2">
												<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
												<input v-model="form.email" type="email" placeholder="khachhang@gmail.com" class="booking-input">
											</div>
										</div>
									</section>

									<!-- Vehicle Info -->
									<section class="space-y-6 pt-4">
										<div class="flex items-center justify-between pb-3 border-b border-gray-50">
											<h2 class="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
												<span class="text-red-600 text-xl font-black">/02</span>
												Thông tin phương tiện
											</h2>
											<Icon name="ph:motorcycle-fill" class="text-lg text-gray-200" />
										</div>
										<div class="space-y-2">
											<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Dòng xe đang sử dụng *</label>
											<input v-model="form.motorcycleModel" type="text" required placeholder="Nhập tên xe (VD: SH 150i, Exciter...)" class="booking-input uppercase">
											
											<!-- Brand Suggestions -->
											<div class="flex flex-wrap gap-2 mt-2">
												<button 
													v-for="brand in ['Honda', 'Yamaha', 'Piaggio', 'Suzuki', 'SYM']" 
													:key="brand"
													type="button"
													@click="form.motorcycleModel = brand"
													class="text-[9px] font-black px-3 py-1.5 bg-white text-gray-400 rounded-lg hover:text-red-600 hover:border-red-600/30 transition-all border border-gray-100 uppercase tracking-widest"
												>
													{{ brand }}
												</button>
											</div>
										</div>
										<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div class="space-y-2">
												<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Loại xe</label>
												<select v-model="form.vehicleType" class="booking-input cursor-pointer">
													<option value="">Chọn loại xe</option>
													<option value="Xe ga">Xe ga</option>
													<option value="Xe số">Xe số</option>
													<option value="Xe côn tay">Xe côn tay</option>
													<option value="Moto">Moto</option>
												</select>
											</div>
											<div class="space-y-2">
												<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phiên bản</label>
												<select v-model="form.version" class="booking-input cursor-pointer">
													<option value="">Chọn phiên bản</option>
													<option value="Tiêu chuẩn">Tiêu chuẩn</option>
													<option value="Đặc biệt">Đặc biệt</option>
													<option value="Cao cấp">Cao cấp</option>
													<option value="Thể thao">Thể thao</option>
													<option value="Khác">Khác</option>
												</select>
											</div>
											<div class="space-y-2">
												<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Màu sắc</label>
												<select v-model="form.color" class="booking-input cursor-pointer">
													<option value="">Chọn màu sắc</option>
													<option value="Đen">Đen</option>
													<option value="Trắng">Trắng</option>
													<option value="Đỏ">Đỏ</option>
													<option value="Xanh">Xanh</option>
													<option value="Xám">Xám</option>
													<option value="Vàng">Vàng</option>
													<option value="Khác">Khác</option>
												</select>
											</div>
										</div>
										<div class="space-y-2">
											<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tình trạng xe / Yêu cầu chi tiết *</label>
											<textarea v-model="form.condition" required rows="4" placeholder="Mô tả tình trạng xe hoặc yêu cầu của bạn..." class="booking-input resize-none py-4"></textarea>
											
											<div class="flex flex-wrap gap-2 mt-3">
												<button 
													v-for="sug in ['Bảo dưỡng định kỳ', 'Xe khó nổ máy', 'Phanh không ăn', 'Có tiếng động lạ', 'Thay lốp mới']" 
													:key="sug"
													type="button"
													@click="form.condition = sug"
													:class="[
														'text-[10px] font-black px-4 py-2 rounded-xl transition-all border uppercase tracking-wider',
														form.condition === sug 
															? 'bg-red-600 text-white border-red-600' 
															: 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-white hover:border-red-600/30'
													]"
												>
													{{ sug }}
												</button>
											</div>
										</div>
									</section>

									<!-- Schedule -->
									<section class="space-y-6 pt-4">
										<div class="flex items-center justify-between pb-3 border-b border-gray-50">
											<h2 class="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
												<span class="text-red-600 text-xl font-black">/03</span>
												Thời gian hẹn
											</h2>
											<Icon name="ph:clock-countdown-fill" class="text-lg text-gray-200" />
										</div>
										<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
											<div class="space-y-2">
												<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ngày hẹn *</label>
												<input v-model="form.date" type="date" required :min="minDate" class="booking-input">
											</div>
											<div class="space-y-2">
												<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Buổi</label>
												<select v-model="form.session" class="booking-input cursor-pointer">
													<option value="Sáng">Sáng</option>
													<option value="Chiều">Chiều</option>
												</select>
											</div>
											<div class="space-y-2">
												<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Giờ dự kiến</label>
												<div class="relative">
													<select v-model="form.hour" class="booking-input cursor-pointer appearance-none">
														<option v-for="h in availableHours" :key="h" :value="h">{{ h }}</option>
													</select>
													<Icon name="ph:clock-fill" class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
												</div>
											</div>
										</div>
									</section>

									<!-- Confirmation -->
									<div class="pt-4">
										<label class="flex items-start gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100 cursor-pointer group hover:bg-white hover:border-red-600/30 transition-all">
											<div class="relative flex items-center justify-center mt-1">
												<input v-model="form.isConfirmed" type="checkbox" required class="peer appearance-none w-6 h-6 rounded-lg border-2 border-gray-200 checked:bg-red-600 checked:border-red-600 transition-all cursor-pointer">
												<Icon name="ph:check-bold" class="absolute text-[12px] text-white opacity-0 peer-checked:opacity-100 transition-all pointer-events-none" />
											</div>
											<span class="text-[11px] font-bold text-gray-500 tracking-wide select-none leading-relaxed">
												Tôi xác nhận thông tin trên là chính xác và đồng ý đặt lịch dịch vụ tại AnhEm Motor.
											</span>
										</label>
									</div>

									<button type="submit" :disabled="isSubmitting || !form.isConfirmed" class="w-full py-5 bg-gray-950 text-white font-[1000] text-xs uppercase tracking-[0.4em] rounded-[1.25rem] hover:bg-red-600 transition-all shadow-xl disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-3 group mt-6">
										<span v-if="!isSubmitting">Xác nhận đăng ký ngay</span>
										<span v-else>Đang xử lý yêu cầu...</span>
										<Icon v-if="!isSubmitting" name="ph:paper-plane-tilt-fill" class="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
										<Icon v-else name="svg-spinners:ring-resize" class="text-sm" />
									</button>

									<!-- Cancel Button -->
									<button type="button" @click="router.back()" class="w-full py-4 bg-white border border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] rounded-[1.25rem] hover:bg-gray-50 hover:text-red-600 hover:border-red-600/30 transition-all mt-3">
										Hủy bỏ yêu cầu
									</button>
								</form>
							</div>

							<!-- Success State -->
							<div v-else class="py-20 text-center space-y-8">
								<div class="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
									<Icon name="ph:check-circle-fill" class="text-5xl" />
								</div>
								<div class="space-y-4">
									<h2 class="text-3xl font-black text-gray-900 uppercase italic">Đăng ký thành công!</h2>
									<p class="text-gray-500 font-medium max-w-sm mx-auto">
										Cảm ơn bạn đã tin tưởng AnhEm Motor. Đội ngũ chăm sóc khách hàng sẽ liên hệ với bạn trong vòng 5 phút để xác nhận.
									</p>
								</div>
								<div class="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
									<button @click="router.push('/')" class="px-10 py-4 bg-gray-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-red-600 transition-all shadow-lg">
										Về trang chủ
									</button>
									<button @click="router.push('/service')" class="px-10 py-4 bg-white border border-gray-100 text-gray-900 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-gray-50 transition-all">
										Xem dịch vụ khác
									</button>
								</div>
							</div>
						</div>
					</div>

					<!-- Right: Booking Summary Sticky (40%) -->
					<div class="lg:col-span-4 animate-reveal-right">
						<div class="sticky top-10 space-y-4">
							<!-- Summary Card -->
							<div class="bg-[#0D1117] rounded-[2rem] p-8 lg:p-10 text-white relative overflow-hidden shadow-xl border border-white/5">
								<div class="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl"></div>
								
								<div class="relative z-10 space-y-8">
									<div class="flex items-center justify-between">
										<h2 class="text-[8px] font-[1000] uppercase tracking-[0.4em] text-red-600">Booking Summary</h2>
										<div class="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
											<Icon name="ph:calendar-check-fill" class="text-base text-red-600" />
										</div>
									</div>

									<div v-if="service" class="space-y-6">
										<div class="space-y-2">
											<p class="text-[9px] font-black text-gray-500 uppercase tracking-widest">Dịch vụ đã chọn</p>
											<h3 class="text-2xl font-[1000] uppercase italic leading-[0.9] text-white tracking-tighter">{{ service.name }}</h3>
										</div>
										
										<div class="grid grid-cols-2 gap-6 py-6 border-y border-white/5">
											<div class="space-y-1">
												<p class="text-[8px] font-black text-gray-500 uppercase tracking-widest">Giá dự kiến</p>
												<p class="text-xl font-[1000] text-red-600 leading-none">{{ service.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price) : 'Liên hệ' }}</p>
											</div>
											<div class="space-y-1">
												<p class="text-[8px] font-black text-gray-500 uppercase tracking-widest">Thời gian hẹn</p>
												<p class="text-base font-[1000] text-white leading-tight uppercase italic">
													{{ form.date ? new Date(form.date).toLocaleDateString('vi-VN') : '17/5/2026' }}<br>
													<span class="text-[9px] text-red-600 font-bold tracking-widest">{{ form.hour || '10:00 AM' }}</span>
												</p>
											</div>
										</div>

										<div class="space-y-3">
											<p class="text-[8px] font-black text-gray-500 uppercase tracking-widest">Quyền lợi dịch vụ</p>
											<div v-for="feat in service.features?.slice(0, 3)" :key="feat" class="flex items-start gap-2 group/item">
												<Icon name="ph:check-circle-fill" class="text-xs text-red-600 mt-0.5" />
												<span class="text-[11px] font-medium text-gray-400 group-hover/item:text-gray-200 transition-colors leading-tight">{{ feat }}</span>
											</div>
										</div>
									</div>

									<!-- Trust Signals -->
									<div class="space-y-3 pt-6 border-t border-white/5">
										<div class="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
											<div class="w-8 h-8 bg-red-600/10 rounded-lg flex items-center justify-center">
												<Icon name="ph:shield-star-fill" class="text-base text-red-600" />
											</div>
											<div>
												<p class="text-[9px] font-black uppercase tracking-tight text-white">Phụ tùng chính hãng</p>
												<p class="text-[8px] font-bold text-gray-500">Bảo hành 12 tháng</p>
											</div>
										</div>
										<div class="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
											<div class="w-8 h-8 bg-red-600/10 rounded-lg flex items-center justify-center">
												<Icon name="ph:user-gear-fill" class="text-base text-red-600" />
											</div>
											<div>
												<p class="text-[9px] font-black uppercase tracking-tight text-white">Kỹ thuật viên 5 sao</p>
												<p class="text-[8px] font-bold text-gray-500">Chuyên nghiệp - Tận tâm</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<!-- Support & Info Blocks -->
							<div class="grid grid-cols-1 gap-3">
								<div class="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3 group hover:border-red-600/30 transition-all">
									<div class="w-10 h-10 bg-red-600/5 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-all">
										<Icon name="ph:phone-call-fill" class="text-lg text-red-600 group-hover:text-white" />
									</div>
									<div>
										<p class="text-[8px] font-black text-gray-400 uppercase tracking-widest">Hotline hỗ trợ 24/7</p>
										<p class="text-base font-black text-gray-900 tracking-tight">(024) 6562 0606</p>
									</div>
								</div>
								
								<div class="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3 group hover:border-red-600/30 transition-all">
									<div class="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-all">
										<Icon name="ph:clock-fill" class="text-lg text-gray-400 group-hover:text-white" />
									</div>
									<div>
										<p class="text-[8px] font-black text-gray-400 uppercase tracking-widest">Giờ làm việc</p>
										<p class="text-xs font-bold text-gray-900 tracking-tight">08:00 AM - 08:00 PM</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.booking-page {
	font-family: 'Manrope', sans-serif;
}

.booking-input {
	width: 100%;
	padding: 0.75rem 1rem;
	background-color: #f7f7f8;
	border: 1.5px solid #e4e4e7;
	border-radius: 0.75rem;
	font-size: 12px;
	font-weight: 500;
	color: #111827;
	transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	outline: none;
}
.booking-input:hover {
	background-color: #fff;
	border-color: #d1d5db;
}
.booking-input:focus {
	background-color: #fff;
	border-color: #dc2626;
	box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.08), 0 15px 45px -10px rgba(0, 0, 0, 0.08);
}
.booking-input::placeholder {
	color: #9ca3af;
	font-weight: 500;
}

@keyframes reveal-down {
	from { opacity: 0; transform: translateY(-30px); }
	to { opacity: 1; transform: translateY(0); }
}

@keyframes reveal-up {
	from { opacity: 0; transform: translateY(40px); }
	to { opacity: 1; transform: translateY(0); }
}

@keyframes reveal-right {
	from { opacity: 0; transform: translateX(40px); }
	to { opacity: 1; transform: translateX(0); }
}

.animate-reveal-down {
	animation: reveal-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-reveal-up {
	animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-reveal-right {
	animation: reveal-right 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
