<script setup>
import { ref, reactive, computed, watch } from 'vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
    product: {
        type: Object,
        default: () => ({}),
    },
    variant: {
        type: Object,
        default: () => ({}),
    },
    type: {
        type: String,
        default: 'Maintenance' // 'Maintenance' or 'TestDrive'
    }
});

const emit = defineEmits(['close']);

const bookingStore = useBookingStore();
const isSubmitting = ref(false);
const isSuccess = ref(false);

const form = reactive({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    session: 'Sáng',
    hour: '08:00 AM',
    location: 'Tại cửa hàng',
    motorcycleModel: '',
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

watch(() => props.isOpen, (val) => {
    if (val) {
        isSuccess.value = false;
        form.isConfirmed = false;
    }
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
            productVariantId: props.variant?.id || null,
            preferredDate: preferredDate.toISOString(),
            location: form.location,
            note: `Mẫu xe: ${form.motorcycleModel}. Tình trạng: ${form.condition}. Buổi: ${form.session}. Giờ: ${form.hour}. Ghi chú: ${form.note}`,
            bookingType: props.type
        });


        isSuccess.value = true;
    } catch (error) {
        alert("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng kiểm tra lại thông tin.");
        console.error(error);
    } finally {
        isSubmitting.value = false;
    }
};

const close = () => {
    emit('close');
};
</script>

<template>
    <Transition
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
    >
        <div v-if="isOpen" class="fixed inset-0 z-[2000] flex items-center justify-center p-4 lg:p-10">

            <!-- Backdrop -->
            <div class="absolute inset-0 bg-gray-900/80 backdrop-blur-md" @click="close"/>

            <!-- Modal Content -->
            <div class="relative w-full max-w-4xl bg-white rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-white/20 max-h-[95vh]">

                
                <!-- Left: Info -->
                <div class="lg:w-1/3 bg-gray-900 p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-y-auto lg:overflow-hidden no-scrollbar">


                    <div class="relative z-10">
                        <div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                            <Icon :name="type === 'TestDrive' ? 'fa6-solid:motorcycle' : 'fa6-solid:calendar-check'" class="text-xl text-red-600" />
                        </div>
                        <h2 class="text-3xl font-black uppercase leading-[1.1] tracking-tighter mb-4">
                            {{ type === 'TestDrive' ? 'Đăng Ký' : 'Đặt Lịch' }}<br><span class="text-red-600">{{ type === 'TestDrive' ? 'Lái Thử' : 'Dịch Vụ' }}</span>
                        </h2>

                        <div class="mt-8 space-y-4">
                            <div v-if="variant?.name || product?.name" class="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                <p class="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">
                                    {{ type === 'TestDrive' ? 'Mẫu xe' : 'Dịch vụ đã chọn' }}
                                </p>
                                <p class="text-lg font-black uppercase tracking-tight text-white">{{ variant?.name || product?.name }}</p>

                            </div>
                            <div class="space-y-4 pt-4">
                                <div class="flex items-center gap-3">
                                    <Icon name="fa6-solid:circle-check" class="text-red-600" />
                                    <span class="text-xs font-bold text-gray-400">Xác nhận trong 5 phút</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <Icon name="fa6-solid:circle-check" class="text-red-600" />
                                    <span class="text-xs font-bold text-gray-400">Phục vụ chuyên nghiệp</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Form -->
                <div class="lg:w-2/3 p-8 lg:p-14 bg-white relative overflow-y-auto max-h-[90vh] lg:max-h-none no-scrollbar">

                    <button class="absolute top-8 right-8 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all shadow-sm" @click="close">
                        <Icon name="fa6-solid:xmark" />
                    </button>

                    <div v-if="!isSuccess">
                        <div class="mb-10">
                            <h3 class="text-2xl font-black text-gray-900 uppercase mb-2">Thông tin khách hàng</h3>

                            <div class="h-1 w-12 bg-red-600 rounded-full"/>
                        </div>

                        <form class="space-y-6" @submit.prevent="handleSubmit">
                            <!-- User Info -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2 md:col-span-2">
                                    <label class="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Họ tên khách hàng *</label>
                                    <input v-model="form.fullName" type="text" required placeholder="Nguyễn Văn A" class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-xs font-black focus:ring-2 focus:ring-red-600/20 transition-all uppercase tracking-wider">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Số điện thoại *</label>
                                    <input v-model="form.phone" type="tel" required placeholder="09xx xxx xxx" class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-xs font-black focus:ring-2 focus:ring-red-600/20 transition-all">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email (Tùy chọn)</label>
                                    <input v-model="form.email" type="email" placeholder="khachhang@gmail.com" class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-xs font-black focus:ring-2 focus:ring-red-600/20 transition-all">
                                </div>
                            </div>

                            <!-- Motorcycle Info (Only for Maintenance) -->
                            <div v-if="type === 'Maintenance'" class="space-y-6 pt-4 border-t border-gray-50">
                                <div class="mb-4">
                                    <h3 class="text-xl font-black text-gray-900 uppercase mb-2">Thông tin phương tiện</h3>
                                    <div class="h-1 w-8 bg-red-600 rounded-full"/>
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Dòng xe đang sử dụng *</label>
                                    <input v-model="form.motorcycleModel" type="text" required placeholder="Ví dụ: Honda SH 150i, Yamaha Exciter 155..." class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-xs font-black focus:ring-2 focus:ring-red-600/20 transition-all uppercase tracking-wider">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Tình trạng xe / Yêu cầu chi tiết *</label>
                                    <textarea v-model="form.condition" required rows="3" placeholder="Mô tả tình trạng xe hoặc yêu cầu của bạn..." class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-xs font-medium focus:ring-2 focus:ring-red-600/20 transition-all"/>
                                    
                                    <!-- Suggestions -->
                                    <div class="flex flex-wrap gap-2 mt-2">
                                        <button 
                                            v-for="sug in ['Bảo dưỡng định kỳ', 'Xe khó nổ máy', 'Phanh không ăn', 'Có tiếng động lạ', 'Thay lốp mới']" 
                                            :key="sug"
                                            type="button"
                                            class="text-[9px] font-bold px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg hover:bg-red-600 hover:text-white transition-all whitespace-nowrap"
                                            @click="form.condition = sug"
                                        >
                                            + {{ sug }}
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <!-- Schedule -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="space-y-2">
                                    <label class="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Ngày hẹn *</label>
                                    <input v-model="form.date" type="date" required :min="minDate" class="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl text-[10px] font-black focus:ring-2 focus:ring-red-600/20 transition-all">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Buổi</label>
                                    <select v-model="form.session" class="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl text-[10px] font-black focus:ring-2 focus:ring-red-600/20 transition-all uppercase tracking-wider">
                                        <option value="Sáng">Sáng</option>
                                        <option value="Chiều">Chiều</option>
                                    </select>
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Giờ dự kiến</label>
                                    <select v-model="form.hour" class="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl text-[10px] font-black focus:ring-2 focus:ring-red-600/20 transition-all uppercase tracking-wider">
                                        <option v-for="h in availableHours" :key="h" :value="h">{{ h }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="pt-2">
                                <label class="flex items-start gap-4 p-5 bg-red-600/5 rounded-3xl border border-red-600/10 cursor-pointer group hover:bg-red-600/10 transition-all">
                                    <div class="relative flex items-center justify-center mt-1">
                                        <input v-model="form.isConfirmed" type="checkbox" required class="peer appearance-none w-5 h-5 rounded-md border-2 border-red-600/30 checked:bg-red-600 checked:border-red-600 transition-all cursor-pointer">
                                        <Icon name="fa6-solid:check" class="absolute text-[8px] text-white opacity-0 peer-checked:opacity-100 transition-all pointer-events-none" />
                                    </div>
                                    <span class="text-[10px] font-bold text-gray-700 uppercase tracking-wider select-none leading-relaxed">
                                        Tôi xác nhận thông tin trên là chính xác và đồng ý {{ type === 'TestDrive' ? 'đăng ký lái thử' : 'đặt lịch dịch vụ' }} tại AnhEm Motor *
                                    </span>
                                </label>
                            </div>

                            <button type="submit" :disabled="isSubmitting || !form.isConfirmed" class="w-full py-5 bg-gray-900 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-red-600 transition-all shadow-xl disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                                {{ isSubmitting ? 'Đang xử lý...' : 'Xác nhận ngay' }}
                                <Icon v-if="!isSubmitting" name="fa6-solid:paper-plane" class="text-[10px]" />
                            </button>
                        </form>
                    </div>

                    <div v-else class="h-full flex flex-col items-center justify-center text-center space-y-6 py-10">
                        <div class="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center shadow-lg mb-4">
                            <Icon name="fa6-solid:check" class="text-3xl" />
                        </div>
                        <h3 class="text-2xl font-black text-gray-900 uppercase">Thành công!</h3>

                        <p class="text-gray-500 font-bold max-w-sm text-xs leading-relaxed">
                            Cảm ơn bạn đã tin tưởng AnhEm Motor. Chúng tôi sẽ liên hệ sớm nhất để xác nhận yêu cầu của bạn.
                        </p>
                        <button class="px-10 py-4 bg-gray-900 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-red-600 transition-all shadow-lg" @click="close">
                            Đóng cửa sổ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>

