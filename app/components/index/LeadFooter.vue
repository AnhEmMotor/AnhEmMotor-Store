<script setup>
import { ref, reactive } from "vue";
import { toast } from "vue3-toastify";

import { BIKE_MODELS } from "../../constants/bike.constant";

import BaseInput from "../ui/BaseInput.vue";
import LeadFeatureItem from "../ui/LeadFeatureItem.vue";
import "vue3-toastify/dist/index.css";

const leadForm = reactive({
	phone: "",
	bike: "",
});

const isSubmitting = ref(false);

const handleSubmit = () => {
	if (!validatePhone(leadForm.phone)) {
		toast.error("Số điện thoại không đúng định dạng Việt Nam!", {
			position: "bottom-center",
			theme: "dark",
		});
		return;
	}

	isSubmitting.value = true;
	setTimeout(() => {
		toast.success(
			"Cảm ơn bạn! AnhEm Motor sẽ liên hệ tư vấn trong 5 phút nữa.",
			{
				position: "bottom-center",
				theme: "dark",
			},
		);
		leadForm.phone = "";
		leadForm.bike = "";
		isSubmitting.value = false;
	}, 1200);
};
</script>

<template>
	<section class="py-20 bg-gray-900 text-white relative overflow-hidden">
		<div
			class="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none"
		/>

		<div class="container mx-auto px-4 relative z-10">
			<div
				class="max-w-5xl mx-auto p-6 sm:p-12 md:p-20 border border-white/10 rounded-24 bg-white/5 backdrop-blur-xl shadow-2xl transition-all hover:border-primary/30"
			>
				<div class="text-center space-y-6 mb-12">
					<h2
						class="text-3xl md:text-5xl lg:text-[42px] font-bold leading-tight tracking-tight"
					>
						Bạn chưa biết chọn <span class="text-primary">dòng xe phù hợp?</span>
					</h2>
					<p
						class="text-slate-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed"
					>
						Ghé cửa hàng để được tư vấn & trải nghiệm thực tế, hoặc để lại thông tin để nhận báo giá lăn bánh tốt nhất sau 5 phút.
					</p>
				</div>

				<form
					class="flex flex-col md:flex-row gap-6 items-end justify-center w-full"
					@submit.prevent="handleSubmit"
				>
					<div class="w-full md:w-1/2">
						<BaseInput
							v-model="leadForm.phone"
							label="Số điện thoại"
							type="tel"
							placeholder="VD: 0912 345 678"
							required
                            class="bg-white/5 border-white/10 text-white"
						/>
					</div>

					<div class="w-full md:w-1/2">
						<BaseInput
							v-model="leadForm.bike"
							label="Dòng xe quan tâm"
							placeholder="VD: Honda SH 160i"
							required
							list="models"
                            class="bg-white/5 border-white/10 text-white"
						/>
						<datalist id="models">
							<option v-for="m in BIKE_MODELS" :key="m" :value="m" />
						</datalist>
					</div>

					<button 
                        type="submit" 
                        class="px-10 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all shadow-xl shadow-primary/20 flex items-center gap-2 whitespace-nowrap"
                        :disabled="isSubmitting"
                    >
						{{ isSubmitting ? 'Đang gửi...' : 'Gửi thông tin' }}
                        <Icon v-if="!isSubmitting" name="ph:paper-plane-right-bold" />
					</button>
				</form>

				<div
					class="mt-12 flex flex-col md:flex-row items-center justify-center gap-10 text-white/40 font-bold text-xs tracking-wider border-t border-white/5 pt-8"
				>
					<LeadFeatureItem
						icon="ph:lock-key-bold"
						text="Bảo mật thông tin 100%"
					/>
					<div class="hidden md:block w-px h-4 bg-white/10" />
					<LeadFeatureItem icon="ph:headset-bold" text="Tư vấn siêu tốc 24/7" />
				</div>
			</div>
		</div>

		<div
			class="absolute bottom-[-100px] left-1/2 -translate-x-1/2 opacity-10 pointer-events-none select-none"
		>
			<h1 class="text-[30vw] font-black uppercase text-white whitespace-nowrap">
				ANH EM MOTOR
			</h1>
		</div>
	</section>
</template>

<style scoped>
@reference "../../assets/main.css";

.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateY(20px) scale(0.5);
	opacity: 0;
}
</style>
