<template>
	<div class="min-h-screen bg-white test-drive-page">
		<!-- [1] HERO SECTION - Compacted -->
		<section class="relative h-[45vh] min-h-[400px] flex items-center overflow-hidden">
			<div class="absolute inset-0 z-0">
				<img 
					src="/assets/image/anhem_motor_test_drive_banner_1778898900918.png" 
					alt="Showroom AnhEm Motor" 
					class="w-full h-full object-cover brightness-50 scale-105"
				>
				<div class="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent"></div>
			</div>

			<div class="container mx-auto px-6 relative z-10">
				<div class="max-w-2xl space-y-4">
					<div class="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-full">
						<span class="w-1 h-1 bg-primary rounded-full"></span>
						<span class="text-[10px] font-extrabold text-white uppercase tracking-[0.3em]">Hành trình trải nghiệm</span>
					</div>
					<h1 class="text-[32px] md:text-[50px] lg:text-[58px] font-extrabold text-white uppercase italic leading-[1.1] tracking-tight reveal-up">
						ĐẶT LỊCH<br><span class="text-primary drop-shadow-[0_0_20px_rgba(227,24,55,0.5)]">TRẢI NGHIỆM</span>
					</h1>
					<p class="text-[16px] md:text-[18px] text-gray-300 font-medium max-w-md leading-relaxed border-l-4 border-primary pl-4">
						Cảm nhận tinh hoa kỹ thuật cùng AnhEm Motor.
					</p>
				</div>
			</div>
			<div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
		</section>

		<!-- [2] MAIN REGISTRATION AREA -->
		<section class="relative z-20 -mt-12 pb-12">
			<div class="container mx-auto px-6">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
					
					<!-- Left Panel: Benefits & Vehicle -->
					<div class="lg:col-span-4 space-y-6 order-1">
						<!-- Vehicle Preview Card -->
						<div 
							@click="scrollToSelect"
							class="bg-white rounded-[20px] p-6 shadow-lg border border-gray-100 overflow-hidden relative group min-h-[350px] flex flex-col justify-center cursor-pointer hover:border-primary/30 transition-all duration-500"
						>
							<div v-if="selectedVehicle" class="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
								<div class="relative">
									<img :src="selectedVehicle.image || '/assets/image/placeholder-product.webp'" :alt="selectedVehicle.name" class="w-full max-h-48 object-contain drop-shadow-lg transition-all duration-700 group-hover:scale-105">
								</div>
								<div class="space-y-2 pt-2">
									<div class="flex items-end justify-between">
										<div class="space-y-0.5">
											<span class="text-[10px] font-bold text-primary uppercase tracking-wider">{{ selectedVehicle.brand }}</span>
											<h3 class="text-[22px] font-extrabold text-gray-900 uppercase italic tracking-normal">{{ selectedVehicle.name }}</h3>
										</div>
										<p class="text-primary font-black text-[18px] italic leading-none">{{ selectedVehicle.price }}</p>
									</div>
									<div class="h-[1px] w-full bg-gray-50 my-2"></div>
									<div class="grid grid-cols-2 gap-y-3 gap-x-4">
										<div v-for="spec in selectedVehicle.specs" :key="spec.l" class="flex flex-col gap-0.5">
											<span class="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{{ spec.l }}</span>
											<span class="text-[12px] font-extrabold text-gray-900">{{ spec.v }}</span>
										</div>
									</div>
								</div>
							</div>
							<div v-else class="text-center space-y-4 py-8 group-hover:scale-105 transition-transform">
								<div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/5 transition-colors">
									<Icon name="ph:motorcycle-bold" class="text-3xl text-gray-300 group-hover:text-primary transition-colors" />
								</div>
								<h3 class="text-[16px] font-extrabold text-gray-400 uppercase italic tracking-wide">Chọn xe lái thử</h3>
								<p class="text-[10px] text-gray-400 px-8 leading-relaxed italic">Vui lòng chọn dòng xe ở biểu mẫu bên cạnh để xem trước diện mạo & thông số.</p>
							</div>
						</div>

						<!-- Quick Stats -->
						<div class="grid grid-cols-2 gap-4">
							<div class="bg-gray-950 rounded-[20px] p-4 text-white text-center">
								<p class="text-[22px] font-extrabold leading-none">500+</p>
								<p class="text-[10px] font-semibold text-primary uppercase tracking-widest mt-1">Lượt trải nghiệm</p>
							</div>
							<div class="bg-gray-50 rounded-[20px] p-4 border border-gray-100 text-center">
								<p class="text-[22px] font-extrabold text-gray-900 leading-none">98%</p>
								<p class="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-1">Độ hài lòng</p>
							</div>
						</div>
					</div>

					<!-- Right Panel: Form -->
					<div class="lg:col-span-8 order-2">
						<div class="bg-white rounded-[20px] shadow-xl border border-gray-100 overflow-hidden">
							<div class="p-6 lg:p-8 space-y-8">
								<div class="flex items-end justify-between border-b border-gray-50 pb-4">
									<h2 class="text-[32px] md:text-[38px] font-extrabold text-gray-950 uppercase italic tracking-tight">Đăng ký <span class="text-primary">Lịch hẹn</span></h2>
									<p class="text-[10px] text-gray-400 font-bold uppercase tracking-wide">* Bắt buộc</p>
								</div>

								<form v-if="!isSuccess" @submit.prevent="handleSubmit" class="space-y-6">
									<div class="space-y-4">
										<div class="flex items-center gap-2">
											<span class="text-[12px] font-extrabold text-primary uppercase tracking-widest">01. Thông tin liên hệ</span>
											<div class="flex-grow h-[1px] bg-gray-50"></div>
										</div>
										<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
											<input v-model="form.fullName" type="text" required placeholder="Họ và tên *" class="premium-input">
											<input v-model="form.phone" type="tel" required placeholder="Số điện thoại *" class="premium-input">
											<input v-model="form.email" type="email" required placeholder="Địa chỉ Email *" class="premium-input">
											<div class="flex items-center gap-6 px-4 bg-white border border-[#ECECEC] rounded-lg">
												<span class="text-[13px] font-bold text-gray-400">Giới tính:</span>
												<div class="flex items-center gap-4">
													<label class="flex items-center gap-1.5 cursor-pointer group">
														<input v-model="form.gender" type="radio" value="Nam" class="w-4 h-4 accent-primary cursor-pointer">
														<span class="text-[13px] font-bold text-gray-900 group-hover:text-primary transition-colors">Nam</span>
													</label>
													<label class="flex items-center gap-1.5 cursor-pointer group">
														<input v-model="form.gender" type="radio" value="Nữ" class="w-4 h-4 accent-primary cursor-pointer">
														<span class="text-[13px] font-bold text-gray-900 group-hover:text-primary transition-colors">Nữ</span>
													</label>
												</div>
											</div>
										</div>
									</div>

									<div class="space-y-4">
										<div class="flex items-center gap-2">
											<span class="text-[12px] font-extrabold text-primary uppercase tracking-widest">02. Chi tiết lịch hẹn</span>
											<div class="flex-grow h-[1px] bg-gray-50"></div>
										</div>
										<div class="space-y-4">
											<div class="relative">
												<select id="vehicle-select" v-model="form.productVariantId" required class="premium-input appearance-none pr-10">
													<option value="" disabled>-- Chọn dòng xe muốn lái thử --</option>
													<option v-for="variant in variants" :key="variant.id" :value="variant.id">{{ variant.fullName }}</option>
												</select>
												<Icon name="fa6-solid:chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]" />
											</div>
											<div class="grid grid-cols-3 gap-3">
												<input v-model="form.date" type="date" required :min="minDate" class="premium-input text-[12px]">
												<select v-model="form.session" class="premium-input text-[12px]">
													<option value="Sáng">Sáng</option>
													<option value="Chiều">Chiều</option>
												</select>
												<select v-model="form.hour" class="premium-input text-[12px] font-extrabold">
													<option v-for="h in availableHours" :key="h" :value="h">{{ h }}</option>
												</select>
											</div>
										</div>
									</div>

									<div class="pt-2 space-y-4">
										<label class="flex items-start gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer">
											<input v-model="form.isConfirmed" type="checkbox" required class="mt-0.5">
											<span class="text-[11px] font-medium text-gray-500 leading-tight">Tôi đồng ý với các điều khoản đăng ký lái thử.</span>
										</label>
										<button type="submit" :disabled="isSubmitting || !form.isConfirmed" class="w-full py-4 bg-gradient-premium text-white font-extrabold text-[12px] uppercase tracking-[0.2em] rounded-lg shadow-glow transition-all">
											{{ isSubmitting ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN ĐẶT LỊCH' }}
										</button>
										<div class="grid grid-cols-3 gap-2">
											<div v-for="trust in trustElements" :key="trust.t" class="flex flex-col items-center text-center">
												<Icon :name="trust.i" class="text-primary text-sm mb-1" />
												<span class="text-[9px] font-extrabold text-gray-900 uppercase">{{ trust.t }}</span>
											</div>
										</div>
									</div>
								</form>

								<div v-else class="text-center py-8 space-y-4">
									<Icon name="ph:check-circle-fill" class="text-[50px] text-green-500" />
									<h2 class="text-[26px] font-extrabold uppercase italic">Thành công!</h2>
									<NuxtLink to="/products" class="inline-block px-6 py-3 bg-gray-900 text-white font-extrabold text-[11px] uppercase rounded-lg">Quay lại danh sách xe</NuxtLink>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- [3] PROCESS & FAQ - Compacted -->
		<section class="py-12 bg-gray-50">
			<div class="container mx-auto px-6">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
					<div class="space-y-6">
						<h2 class="text-[28px] font-extrabold uppercase italic tracking-tight">Quy trình <span class="text-primary">Lái thử</span></h2>
						<div class="grid grid-cols-1 gap-3">
							<div v-for="(step, idx) in processSteps" :key="idx" class="flex gap-3 items-center p-3 bg-white rounded-xl shadow-sm">
								<div class="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-bold text-[16px] shrink-0">{{ idx + 1 }}</div>
								<div class="space-y-1.5">
									<h5 class="text-[15px] font-extrabold uppercase leading-tight tracking-tight">{{ step.t }}</h5>
									<p class="text-[14px] text-gray-500 leading-normal">{{ step.d }}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="space-y-6">
						<h2 class="text-[28px] font-extrabold uppercase italic tracking-tight">Câu hỏi <span class="text-primary">Thường gặp</span></h2>
						<div class="space-y-3">
							<div 
								v-for="(faq, idx) in faqs" 
								:key="idx" 
								class="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300"
								:class="{'shadow-lg border-primary/20': activeFaq === idx}"
							>
								<button 
									@click="activeFaq = activeFaq === idx ? null : idx"
									class="w-full p-4 flex items-center justify-between text-left group"
								>
									<h4 
										class="text-[15px] font-extrabold uppercase transition-colors tracking-tight"
										:class="activeFaq === idx ? 'text-primary' : 'text-gray-900'"
									>
										{{ faq.q }}
									</h4>
									<div 
										class="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center transition-transform duration-300"
										:class="{'rotate-180 bg-primary/10 text-primary': activeFaq === idx}"
									>
										<Icon name="ph:caret-down-bold" class="text-[12px]" />
									</div>
								</button>
								<div 
									v-show="activeFaq === idx"
									class="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300"
								>
									<div class="h-[1px] w-full bg-gray-50 mb-3"></div>
									<p class="text-[14px] text-gray-500 leading-relaxed">{{ faq.a }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import productMapper from '~/core/application/mappers/product.mapper';

const route = useRoute();
const bookingStore = useBookingStore();
const productStore = useProductStore();

const isSubmitting = ref(false);
const isSuccess = ref(false);
const activeFaq = ref(null);
const variants = ref([]);
const selectedVehicle = ref(null);

const minDate = computed(() => {
	const today = new Date();
	return today.toISOString().split('T')[0];
});

const form = reactive({
	fullName: '',
	phone: '',
	email: '',
	gender: 'Nam',
	productVariantId: '',
	date: '',
	session: 'Sáng',
	hour: '08:00 AM',
	isConfirmed: false
});

const morningHours = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'];
const afternoonHours = ['01:30 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];

const availableHours = computed(() => {
	return form.session === 'Sáng' ? morningHours : afternoonHours;
});

const scrollToSelect = () => {
	const element = document.getElementById('vehicle-select');
	if (element) {
		element.focus();
		element.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
};

watch(() => form.session, (newVal) => {
	form.hour = newVal === 'Sáng' ? morningHours[0] : afternoonHours[0];
});

watch(() => form.productVariantId, (newId) => {
	if (!newId) {
		selectedVehicle.value = null;
		return;
	}
	const variant = variants.value.find(v => v.id === newId);
	if (variant) {
		selectedVehicle.value = {
			name: variant.fullName,
			brand: variant.brand || 'Honda',
			price: variant.price || 'Liên hệ',
			image: variant.image,
			specs: [
				{ l: 'Động cơ', v: variant.engine || '150cc' },
				{ l: 'Phanh', v: variant.brake || 'ABS' },
				{ l: 'Công nghệ', v: 'LED' },
				{ l: 'Nhiên liệu', v: variant.fuel || '2L/100km' }
			]
		};
	}
});

const trustElements = [
	{ i: 'ph:clock-fill', t: 'Hỗ trợ 24/7' },
	{ i: 'ph:money-fill', t: 'Giá tốt nhất' },
	{ i: 'ph:shield-check-fill', t: 'Bảo hành hãng' }
];

const processSteps = [
	{ t: 'Đăng ký trực tuyến', d: 'Lựa chọn dòng xe yêu thích, ngày và khung giờ phù hợp ngay trên website.' },
	{ t: 'Xác nhận lịch hẹn', d: 'Tư vấn viên sẽ liên hệ trong vòng 30 phút để xác nhận và chuẩn bị sẵn xe.' },
	{ t: 'Check-in & Thủ tục', d: 'Đến showroom, cung cấp CCCD và Bằng lái để hoàn tất hồ sơ bảo hiểm nhanh.' },
	{ t: 'Hướng dẫn kỹ thuật', d: 'Chuyên viên giới thiệu chi tiết tính năng, công nghệ và lưu ý an toàn trước khi cầm lái.' },
	{ t: 'Trải nghiệm thực tế', d: 'Cầm lái trải nghiệm sức mạnh động cơ và sự linh hoạt trên cung đường thiết kế riêng.' }
];

const faqs = [
	{ 
		q: 'Tôi cần mang theo giấy tờ gì khi đến lái thử?', 
		a: 'Quý khách vui lòng mang theo Căn cước công dân (CCCD) bản gốc và Bằng lái xe (A1 hoặc A2 tùy dòng xe) còn hạn sử dụng để nhân viên đối chiếu và làm thủ tục bảo hiểm trước khi bắt đầu.' 
	},
	{ 
		q: 'Việc lái thử xe có mất phí hay không?', 
		a: 'Hoàn toàn MIỄN PHÍ. AnhEm Motor hỗ trợ toàn bộ chi phí nhiên liệu và trang bị bảo hộ. Quý khách chỉ cần tập trung cảm nhận khả năng vận hành của xe.' 
	},
	{ 
		q: 'Thời gian lái thử cho mỗi lượt là bao lâu?', 
		a: 'Mỗi lượt lái thử thường kéo dài từ 20 - 30 phút, bao gồm thời gian hướng dẫn kỹ thuật và chạy trải nghiệm trên cung đường thực tế dưới sự hỗ trợ của kỹ thuật viên.' 
	},
	{ 
		q: 'Nếu tôi muốn thay đổi thời gian đã đăng ký thì làm thế nào?', 
		a: 'Quý khách có thể phản hồi qua số hotline của showroom hoặc nhắn tin trực tiếp trên Fanpage/Zalo. Chúng tôi sẽ hỗ trợ đổi lịch nhanh chóng dựa trên quỹ thời gian trống của xe.' 
	},
	{ 
		q: 'Tôi có được chở thêm người khi lái thử không?', 
		a: 'Để đảm bảo an toàn tối đa và giúp quý khách tập trung cảm nhận sức mạnh động cơ, chúng tôi khuyến khích khách hàng lái thử đơn độc. Trong một số trường hợp đặc biệt, kỹ thuật viên sẽ là người ngồi sau để hướng dẫn trực tiếp.' 
	}
];

onMounted(async () => {
	try {
		// Attempt to fetch from API
		const res = await productStore.getProducts({ pageSize: 100 });
		
		if (res?.items && res.items.length > 0) {
			variants.value = res.items.flatMap(product => 
				(product.variants || []).map(v => ({
					id: v.id,
					fullName: `${product.name} - ${v.versionName || v.name}`,
					name: product.name,
					brand: product.brand,
					price: productMapper.formatPrice(v.price),
					image: v.photos?.[0] || v.image || product.photos?.[0],
					engine: product.specifications?.find(s => s.key === 'Displacement')?.value,
					brake: product.specifications?.find(s => s.key === 'FrontBrake')?.value,
					fuel: product.specifications?.find(s => s.key === 'FuelConsumption')?.value
				}))
			);
		} else {
			// Fallback to high-quality Mock Data for UI testing
			variants.value = [
				{
					id: 999,
					fullName: "Honda SH350i - Phiên bản Đặc biệt",
					name: "SH350i",
					brand: "Honda",
					price: "150.990.000 VNĐ",
					image: "/assets/image/placeholder-product.webp",
					engine: "329.6cc, eSP+",
					brake: "ABS 2 kênh",
					fuel: "3.54L/100km"
				},
				{
					id: 998,
					fullName: "Honda CBR150R - The Red Spirit",
					name: "CBR150R",
					brand: "Honda",
					price: "72.290.000 VNĐ",
					image: "/assets/image/placeholder-product.webp",
					engine: "149.2cc, DOHC",
					brake: "ABS, Slipper Clutch",
					fuel: "2.91L/100km"
				},
				{
					id: 997,
					fullName: "Honda Vario 160 - Thể thao",
					name: "Vario 160",
					brand: "Honda",
					price: "51.990.000 VNĐ",
					engine: "156.9cc, 4 van",
					brake: "Phanh đĩa đơn",
					fuel: "2.20L/100km"
				}
			];
		}

		if (route.query.variantId) {
			form.productVariantId = parseInt(route.query.variantId);
		}
	} catch (e) {
		console.warn("[TestDrive] API failed, using Mock Data for UI testing.");
		// Fallback data in case of connection error
		variants.value = [
			{
				id: 999,
				fullName: "Honda SH350i - Phiên bản Đặc biệt",
				name: "SH350i",
				brand: "Honda",
				price: "150.990.000 VNĐ",
				image: "/assets/image/placeholder-product.webp",
				engine: "329.6cc, eSP+",
				brake: "ABS 2 kênh",
				fuel: "3.54L/100km"
			},
			{
				id: 998,
				fullName: "Honda CBR150R - The Red Spirit",
				name: "CBR150R",
				brand: "Honda",
				price: "72.290.000 VNĐ",
				image: "/assets/image/placeholder-product.webp",
				engine: "149.2cc, DOHC",
				brake: "ABS, Slipper Clutch",
				fuel: "2.91L/100km"
			}
		];
	}
});

const handleSubmit = async () => {
	if (!form.productVariantId) return;
	
	// Basic Validation
	const phoneRegex = /^[0-9]{10,11}$/;
	if (!phoneRegex.test(form.phone)) {
		alert("Vui lòng nhập số điện thoại hợp lệ (10-11 số).");
		return;
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(form.email)) {
		alert("Vui lòng nhập địa chỉ email hợp lệ.");
		return;
	}

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
			phoneNumber: form.phone,
			email: form.email,
			gender: form.gender,
			productVariantId: form.productVariantId,
			preferredDate: preferredDate.toISOString(),
			bookingType: "TestDrive"
		});

		isSuccess.value = true;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	} catch (error) {
		console.error("[TestDrive] Booking error:", error);
		alert(error.message || "Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại sau.");
	} finally {
		isSubmitting.value = false;
	}
};

useHead({ title: 'Đăng ký Lái thử | AnhEm Motor' });
</script>

<style scoped>
@reference "../assets/main.css";

.test-drive-page, .test-drive-page * {
	font-family: 'Manrope', sans-serif !important;
}

.bg-gradient-premium { background: linear-gradient(135deg, #e31837 0%, #9b1025 100%); }
.shadow-glow { box-shadow: 0 8px 20px -5px rgba(227, 24, 55, 0.4); }

.premium-input {
	@apply w-full px-4 py-2.5 bg-white border border-[#ECECEC] rounded-lg text-[13px] font-bold text-gray-900 transition-all;
	font-family: 'Manrope', sans-serif !important;
}
.premium-input:focus {
	@apply outline-none border-[#ff2b2b];
	box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.05);
}

@keyframes fade-up {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
}
.reveal-up { animation: fade-up 0.6s ease-out forwards; }
</style>
