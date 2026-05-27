<template>
	<div class="test-ride-form-container">
		<div class="mb-10 text-center">
			<h2 class="text-2xl font-black text-gray-900 uppercase italic mb-2">Đăng ký lái thử</h2>
			<div class="h-1 w-12 bg-red-600 rounded-full mx-auto"/>
		</div>

		<form v-if="!isSuccess" class="space-y-6" @submit.prevent="handleSubmit">
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
				<div class="space-y-2">
					<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Họ tên *</label>
					<input v-model="form.fullName" type="text" required placeholder="Nguyễn Văn A" class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-red-500/20 transition-all">
				</div>
				<div class="space-y-2">
					<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">SĐT *</label>
					<input v-model="form.phone" type="tel" required placeholder="09xx..." class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-red-500/20 transition-all">
				</div>
				<div class="space-y-2">
					<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
					<input v-model="form.email" type="email" placeholder="mail@..." class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-red-500/20 transition-all">
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
						Xác nhận lái thử tại cửa hàng AnhEm Motor *
					</span>
				</label>
			</div>



			<button 
				type="submit" 
				:disabled="isSubmitting || !form.isConfirmed"
				class="w-full py-5 bg-gray-900 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-red-600 transition-all shadow-xl shadow-black/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
			>
				{{ isSubmitting ? 'ĐANG GỬI...' : 'XÁC NHẬN ĐĂNG KÝ' }}
				<Icon v-if="!isSubmitting" name="fa6-solid:paper-plane" class="text-[10px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
			</button>

		</form>

		<div v-else class="text-center py-10 space-y-6">
			<div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
				<Icon name="fa6-solid:check" class="text-3xl" />
			</div>
			<h2 class="text-2xl font-black text-gray-900 uppercase italic">Thành công!</h2>
			<p class="text-gray-500 text-xs font-medium leading-relaxed max-w-xs mx-auto">
				Chúng tôi đã nhận được yêu cầu và sẽ liên hệ xác nhận trong vòng 30 phút.
			</p>
			<button class="text-xs font-black text-red-600 uppercase tracking-widest hover:underline" @click="$emit('close')">Đóng</button>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';



const emit = defineEmits(['close', 'success']);
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




onMounted(async () => {
	try {
		const res = await productStore.getProducts({ pageSize: 50 });
		const allVariants = [];
		res.items.forEach(product => {
			if (product.variants) {
				product.variants.forEach(v => {
					allVariants.push({
						id: v.id,
						fullName: `${product.name} - ${v.versionName || v.name}`
					});
				});
			}
		});
		variants.value = allVariants;
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
		emit('success');
	} catch (error) {
		alert("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.");
	} finally {
		isSubmitting.value = false;
	}
};
</script>
