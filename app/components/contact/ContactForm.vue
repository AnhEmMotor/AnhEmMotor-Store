<template>
	<div class="contact-form p-6 sm:p-10">
		<div class="mb-10">
			<div class="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4">
				<Icon name="ph:envelope-simple-open-fill" class="text-primary text-sm" />
				<span class="text-[10px] font-bold uppercase tracking-wider text-primary">Liên hệ trực tuyến</span>
			</div>
			<h3 class="text-2xl sm:text-3xl font-black mb-3 text-gray-900">Gửi yêu cầu hỗ trợ</h3>
			<p class="text-gray-500 text-sm font-medium leading-relaxed max-w-md">
				Vui lòng để lại thông tin, đội ngũ chăm sóc khách hàng của chúng tôi sẽ liên hệ với bạn trong vòng 24h làm việc.
			</p>
		</div>

		<form class="space-y-6" @submit.prevent="handleSubmit">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				
				<div class="space-y-2">
					<label class="text-xs font-extrabold text-gray-400 uppercase tracking-widest ml-1">Họ và tên</label>
					<div class="relative group">
						<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<Icon name="ph:user-bold" class="text-gray-400 group-focus-within:text-primary transition-colors" />
						</div>
						<input
							v-model="form.fullName"
							type="text"
							required
							placeholder="Nguyễn Văn A"
							class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all font-medium text-sm"
						>
					</div>
				</div>

				
				<div class="space-y-2">
					<label class="text-xs font-extrabold text-gray-400 uppercase tracking-widest ml-1">Số điện thoại</label>
					<div class="relative group">
						<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<Icon name="ph:phone-bold" class="text-gray-400 group-focus-within:text-primary transition-colors" />
						</div>
						<input
							v-model="form.phone"
							type="tel"
							required
							placeholder="09xxx"
							class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all font-medium text-sm"
						>
					</div>
				</div>
			</div>

			
			<div class="space-y-2">
				<label class="text-xs font-extrabold text-gray-400 uppercase tracking-widest ml-1">Email</label>
				<div class="relative group">
					<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
						<Icon name="ph:envelope-bold" class="text-gray-400 group-focus-within:text-primary transition-colors" />
					</div>
					<input
						v-model="form.email"
						type="email"
						required
						placeholder="example@gmail.com"
						class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all font-medium text-sm"
					>
				</div>
			</div>

			
			<div class="space-y-2">
				<label class="text-xs font-extrabold text-gray-400 uppercase tracking-widest ml-1">Chủ đề cần hỗ trợ</label>
				<div class="relative group">
					<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
						<Icon name="ph:info-bold" class="text-gray-400 group-focus-within:text-primary transition-colors" />
					</div>
					<select
						v-model="form.subject"
						class="w-full pl-11 pr-10 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all font-medium text-sm appearance-none cursor-pointer"
					>
						<option value="Tư vấn mua xe">Tư vấn mua xe</option>
						<option value="Dịch vụ bảo dưỡng">Dịch vụ bảo dưỡng</option>
						<option value="Phụ tùng phụ kiện">Phụ tùng phụ kiện</option>
						<option value="Phản ánh dịch vụ">Phản ánh dịch vụ</option>
						<option value="Khác">Khác</option>
					</select>
					<div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
						<Icon name="ph:caret-down-bold" class="text-gray-400 text-xs" />
					</div>
				</div>
			</div>

			
			<div class="space-y-2">
				<label class="text-xs font-extrabold text-gray-400 uppercase tracking-widest ml-1">Nội dung chi tiết</label>
				<textarea
					v-model="form.message"
					rows="4"
					required
					placeholder="Hãy cho chúng tôi biết bạn cần hỗ trợ điều gì..."
					class="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all font-medium text-sm resize-none"
				/>
			</div>

			
			<Transition name="fade">
				<div
v-if="statusMessage" 
					:class="['p-4 rounded-2xl text-xs font-bold flex items-center gap-3', 
					statusType === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100']">
					<Icon :name="statusType === 'success' ? 'ph:check-circle-fill' : 'ph:warning-circle-fill'" class="text-lg" />
					{{ statusMessage }}
				</div>
			</Transition>

			
			<button
				type="submit"
				:disabled="isSubmitting"
				class="w-full py-4.5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-primary/20 hover:bg-primary-dark hover:-translate-y-0.5 transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
			>
				<Icon v-if="isSubmitting" name="ph:spinner-bold" class="animate-spin text-lg" />
				<Icon v-else name="ph:paper-plane-tilt-bold" class="text-lg group-hover:rotate-12 transition-transform" />
				{{ isSubmitting ? 'Đang xử lý...' : 'Gửi yêu cầu ngay' }}
			</button>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
	isSubmitting: { type: Boolean, default: false },
	statusMessage: { type: String, default: '' },
	statusType: { type: String, default: '' }
});

const emit = defineEmits(['submit']);

const form = ref({
	fullName: '',
	email: '',
	phone: '',
	subject: 'Tư vấn mua xe',
	message: ''
});

const handleSubmit = () => {
	emit('submit', { ...form.value });
	if (props.statusType === 'success') {
		form.value = {
			fullName: '',
			email: '',
			phone: '',
			subject: 'Tư vấn mua xe',
			message: ''
		};
	}
};
</script>

<style scoped>
.contact-form {
	max-width: 100%;
}
.fade-enter-active, .fade-leave-active {
	transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
	opacity: 0;
}
</style>
