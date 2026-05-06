<template>
	<div class="test-ride-form-container">
		<div class="mb-10 text-center">
			<h2 class="text-2xl font-black text-gray-900 uppercase italic mb-2">Đăng ký lái thử</h2>
			<div class="h-1 w-12 bg-red-600 rounded-full mx-auto"></div>
		</div>

		<form v-if="!isSuccess" @submit.prevent="handleSubmit" class="space-y-6">
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<div class="space-y-2">
					<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Họ và tên *</label>
					<input 
						v-model="form.fullName" 
						type="text" 
						required
						placeholder="Nguyễn Văn A"
						class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-red-500/20 transition-all"
					>
				</div>
				<div class="space-y-2">
					<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Số điện thoại *</label>
					<input 
						v-model="form.phone" 
						type="tel" 
						required
						placeholder="09xx xxx xxx"
						class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-red-500/20 transition-all"
					>
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

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<div class="space-y-2">
					<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ngày dự kiến *</label>
					<input 
						v-model="form.date" 
						type="date" 
						required
						:min="minDate"
						class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-red-500/20 transition-all"
					>
				</div>
				<div class="space-y-2">
					<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Khung giờ</label>
					<div class="relative">
						<select 
							v-model="form.time" 
							class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-red-500/20 transition-all appearance-none"
						>
							<option value="Sáng (08:00 - 11:30)">Sáng (08:00 - 11:30)</option>
							<option value="Chiều (13:30 - 17:00)">Chiều (13:30 - 17:00)</option>
						</select>
						<Icon name="fa6-solid:chevron-down" class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none" />
					</div>
				</div>
			</div>

			<div class="space-y-2">
				<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Địa điểm *</label>
				<div class="grid grid-cols-2 gap-4">
					<button 
						type="button"
						v-for="loc in ['Tại showroom', 'Tại nhà']"
						:key="loc"
						@click="form.location = loc"
						class="py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border-2"
						:class="form.location === loc ? 'bg-red-50 border-red-500 text-red-600' : 'bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100'"
					>
						{{ loc }}
					</button>
				</div>
			</div>

			<button 
				type="submit" 
				:disabled="isSubmitting"
				class="w-full py-5 bg-gray-900 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-red-600 transition-all shadow-xl shadow-black/10 disabled:opacity-50 flex items-center justify-center gap-3 group"
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
			<button @click="$emit('close')" class="text-xs font-black text-red-600 uppercase tracking-widest hover:underline">Đóng</button>
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
	phone: '',
	productVariantId: '',
	date: '',
	time: 'Sáng (08:00 - 11:30)',
	location: 'Tại showroom',
	note: ''
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
		if (form.time.includes("Chiều")) {
			preferredDate.setHours(14, 0, 0);
		} else {
			preferredDate.setHours(9, 0, 0);
		}

		await bookingStore.createBooking({
			fullName: form.fullName,
			phoneNumber: form.phone,
			productVariantId: form.productVariantId,
			preferredDate: preferredDate.toISOString(),
			location: form.location,
			note: `${form.time}. Ghi chú: ${form.note}`,
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
