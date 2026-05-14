<template>
	<div class="min-h-screen bg-gray-50 pt-32 pb-20">
		<div class="max-w-4xl mx-auto px-4">
			<div class="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
				<div class="grid grid-cols-1 md:grid-cols-12">
					<!-- Sidebar Info -->
					<div class="md:col-span-4 bg-gradient-to-br from-red-600 to-rose-700 p-10 text-white flex flex-col justify-between">
						<div>
							<div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
								<Icon name="fa6-solid:motorcycle" class="text-3xl" />
							</div>
							<h1 class="text-3xl font-black uppercase italic leading-none tracking-tighter mb-4">
								Đăng ký<br><span class="text-white/80">Lái thử</span>
							</h1>
							<p class="text-sm font-medium text-red-100 leading-relaxed mb-8">
								Trải nghiệm cảm giác lái thực tế và khám phá công nghệ mới nhất từ các dòng xe Honda & Yamaha tại cửa hàng AnhEm Motor.
							</p>

						</div>
						
						<div class="space-y-6">
							<div v-for="info in contactDetails" :key="info.t" class="flex items-center gap-4 group">
								<div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
									<Icon :name="`fa6-solid:${info.i}`" class="text-sm" />
								</div>
								<div>
									<p class="text-[8px] font-black uppercase tracking-widest opacity-60">{{ info.t }}</p>
									<p class="text-xs font-bold">{{ info.v }}</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Registration Form -->
					<div class="md:col-span-8 p-10 lg:p-14">
						<div class="mb-10">
							<h2 class="text-2xl font-black text-gray-900 uppercase italic mb-2">Thông tin đăng ký</h2>
							<div class="h-1 w-12 bg-red-600 rounded-full"></div>
						</div>

						<form v-if="!isSuccess" @submit.prevent="handleSubmit" class="space-y-6">
							<div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
								<div class="space-y-2">
									<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Họ và tên *</label>
									<input v-model="form.fullName" type="text" required placeholder="Nguyễn Văn A" class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-red-500/20 transition-all">
								</div>
								<div class="space-y-2">
									<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">SĐT *</label>
									<input v-model="form.phone" type="tel" required placeholder="09xx..." class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-red-500/20 transition-all">
								</div>
								<div class="space-y-2">
									<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
									<input v-model="form.email" type="email" placeholder="example@..." class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-red-500/20 transition-all">
								</div>
							</div>


							<div class="space-y-2">
								<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Dòng xe muốn lái thử *</label>
								<div class="relative">
									<select 
										v-model="form.productVariantId" 
										required
										class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-red-500/20 transition-all appearance-none"
									>
										<option value="" disabled>-- Chọn dòng xe --</option>
										<option v-for="variant in variants" :key="variant.id" :value="variant.id">
											{{ variant.fullName }}
										</option>
									</select>
									<Icon name="fa6-solid:chevron-down" class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none" />
								</div>
							</div>

							<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div class="space-y-2">
									<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ngày dự kiến *</label>
									<input v-model="form.date" type="date" required :min="minDate" class="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl text-[10px] font-black focus:ring-2 focus:ring-red-500/20 transition-all">
								</div>
								<div class="space-y-2">
									<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Buổi</label>
									<div class="relative">
										<select v-model="form.session" class="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl text-[10px] font-black focus:ring-2 focus:ring-red-500/20 transition-all appearance-none uppercase tracking-wider">
											<option value="Sáng">Sáng</option>
											<option value="Chiều">Chiều</option>
										</select>
										<Icon name="fa6-solid:chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none" />
									</div>
								</div>
								<div class="space-y-2">
									<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Giờ</label>
									<div class="relative">
										<select v-model="form.hour" class="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl text-[10px] font-black focus:ring-2 focus:ring-red-500/20 transition-all appearance-none uppercase tracking-wider">
											<option v-for="h in availableHours" :key="h" :value="h">{{ h }}</option>
										</select>
										<Icon name="fa6-solid:chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none" />
									</div>
								</div>
							</div>


							<div class="pt-2">
								<label class="flex items-center gap-4 p-5 bg-red-50 rounded-2xl border border-red-100 cursor-pointer group hover:bg-red-100/50 transition-all">
									<div class="relative flex items-center justify-center">
										<input v-model="form.isConfirmed" type="checkbox" required class="peer appearance-none w-5 h-5 rounded border-2 border-red-300 checked:bg-red-600 checked:border-red-600 transition-all cursor-pointer">
										<Icon name="fa6-solid:check" class="absolute text-[8px] text-white opacity-0 peer-checked:opacity-100 transition-all pointer-events-none" />
									</div>
									<span class="text-[10px] font-black text-gray-900 uppercase tracking-wider select-none">
										Tôi xác nhận đăng ký lái thử tại cửa hàng AnhEm Motor *
									</span>
								</label>
							</div>



							<div class="space-y-2">
								<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ghi chú thêm</label>
								<textarea 
									v-model="form.note" 
									rows="3"
									placeholder="Yêu cầu đặc biệt nếu có..."
									class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
								></textarea>
							</div>

							<button 
								type="submit" 
								:disabled="isSubmitting || !form.isConfirmed"
								class="w-full py-5 bg-gray-900 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-red-600 transition-all shadow-xl shadow-black/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
							>
								{{ isSubmitting ? 'ĐANG GỬI...' : 'XÁC NHẬN ĐĂNG KÝ' }}
								<Icon v-if="!isSubmitting" name="fa6-solid:paper-plane" class="text-[10px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
							</button>


							<p class="text-[9px] text-gray-400 text-center italic font-bold">
								* Chúng tôi sẽ liên hệ lại qua số điện thoại để xác nhận lịch hẹn trong vòng 30 phút.
							</p>
						</form>

						<!-- Success Message -->
						<div v-else class="text-center py-10 space-y-6 animate-in fade-in zoom-in duration-500">
							<div class="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
								<Icon name="fa6-solid:check" class="text-4xl" />
							</div>
							<h2 class="text-3xl font-black text-gray-900 uppercase italic">Gửi yêu cầu thành công!</h2>
							<p class="text-gray-500 font-medium leading-relaxed max-w-sm mx-auto">
								Yêu cầu của bạn đã được gửi. Trợ lý AnhEm sẽ liên hệ xác nhận trong ít phút qua số điện thoại <span class="text-gray-900 font-black">{{ form.phone }}</span>.
							</p>
							<div class="pt-6">
								<NuxtLink to="/products" class="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-red-600 transition-all">
									Tiếp tục xem xe
								</NuxtLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';



const route = useRoute();
const bookingStore = useBookingStore();
const productStore = useProductStore();

const isSubmitting = ref(false);
const isSuccess = ref(false);
const variants = ref([]);

const minDate = computed(() => {
	const today = new Date();
	return today.toISOString().split('T')[0];
});

const form = reactive({
	fullName: '',
	email: '',
	phone: '',

	productVariantId: '',
	date: '',
	session: 'Sáng',
	hour: '08:00 AM',
	location: 'Tại cửa hàng',
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




const contactDetails = [
	{ i: 'phone', t: 'Hotline tư vấn', v: '0909 xxx xxx' },
	{ i: 'location-dot', t: 'Địa điểm lái thử', v: 'Cửa hàng Biên Hòa, Đồng Nai' },
	{ i: 'clock', t: 'Giờ làm việc', v: '08:00 - 17:30 Hằng ngày' }
];


onMounted(async () => {
	// Fetch some popular variants for selection if not from product page
	try {
		const res = await productStore.getProducts({ pageSize: 50 });
		const allVariants = [];
		res.items.forEach(product => {
			if (product.variants) {
				product.variants.forEach(v => {
					allVariants.push({
						id: v.id,
						fullName: `${product.name} - ${v.versionName || v.name}`,
						slug: v.slug
					});
				});
			}
		});
		variants.value = allVariants;

		// If variantId is passed in query
		if (route.query.variantId) {
			form.productVariantId = parseInt(route.query.variantId);
		}
	} catch (e) {
		console.error("Failed to fetch variants", e);
	}
});

const handleSubmit = async () => {
	if (!form.productVariantId) {
		alert("Vui lòng chọn dòng xe bạn muốn lái thử.");
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
			email: form.email,
			phoneNumber: form.phone,
			productVariantId: form.productVariantId,
			preferredDate: preferredDate.toISOString(),
			location: form.location,
			note: `Buổi: ${form.session}. Giờ: ${form.hour}. Ghi chú: ${form.note}`,
			bookingType: "TestDrive"
		});



		isSuccess.value = true;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	} catch (error) {
		alert("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.");
		console.error(error);
	} finally {
		isSubmitting.value = false;
	}
};

useHead({
	title: 'Đăng ký Lái thử | AnhEm Motor',
	meta: [
		{ name: 'description', content: 'Đăng ký lái thử các dòng xe mới nhất tại AnhEm Motor.' }
	]
});
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
	filter: invert(0.5);
	cursor: pointer;
}

@keyframes fade-in {
	from { opacity: 0; }
	to { opacity: 1; }
}

@keyframes zoom-in {
	from { transform: scale(0.95); }
	to { transform: scale(1); }
}

.animate-in {
	animation: fade-in 0.5s ease-out, zoom-in 0.5s ease-out;
}
</style>
