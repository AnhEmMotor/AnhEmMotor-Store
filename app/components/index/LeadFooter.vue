<script setup>
import { ref, reactive } from "vue";
import { toast } from "vue3-toastify";
import { BIKE_MODELS } from "@/constants/bike.constant";
import { validatePhone } from "@/utils/validator";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import LeadFeatureItem from "@/components/ui/LeadFeatureItem.vue";
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
	<section id="lead-footer" class="py-20 bg-gray-900 text-white relative overflow-hidden">
		<div
			class="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none"
		/>

		<div class="container mx-auto px-4 relative z-10">
			<div
				class="max-w-4xl mx-auto p-8 md:p-16 border-2 border-red-600/30 rounded-[40px] bg-black/30 backdrop-blur-3xl shadow-2xl shadow-red-600/10 transition-all hover:border-red-600/50"
			>
				<div class="text-center space-y-4 mb-12">
					<h2
						class="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none"
					>
						TƯ VẤN <span class="text-red-600">LĂN BÁNH</span>
					</h2>
					<div class="flex flex-col items-center gap-2">
						<p
							class="text-gray-400 text-sm uppercase tracking-widest font-black opacity-50"
						>
							Để lại thông tin, nhận giá tốt nhất sau 5 phút
						</p>
						<a href="tel:0901234567" class="flex items-center gap-2 text-red-500 font-black text-xl hover:scale-105 transition-transform">
							<Icon name="fa6-solid:phone-volume" />
							Hotline: 0901.234.567
						</a>
					</div>

				</div>

				<form
					class="flex flex-col md:flex-row gap-6 items-stretch md:items-end justify-center w-full"
					@submit.prevent="handleSubmit"
				>
					<div class="w-full md:w-1/2">
						<BaseInput
							v-model="leadForm.phone"
							label="Số điện thoại"
							type="tel"
							placeholder="VD: 0912 345 678"
							required
						/>
					</div>

					<div class="w-full md:w-1/2">
						<BaseInput
							v-model="leadForm.bike"
							label="Dòng xe quan tâm"
							placeholder="VD: Honda SH 160i"
							required
							list="models"
						/>
						<datalist id="models">
							<option v-for="m in BIKE_MODELS" :key="m" :value="m" />
						</datalist>
					</div>

					<BaseButton type="submit" :loading="isSubmitting" class="w-full md:w-auto h-[52px]">
						Gửi Ngay
					</BaseButton>
				</form>


				<div
					class="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-white/40 uppercase font-black text-[10px] tracking-widest border-t border-white/5 pt-8"
				>
					<LeadFeatureItem
						icon="fa6-solid:lock"
						text="Bảo mật thông tin 100%"
					/>
					<div class="hidden md:block w-px h-4 bg-white/10" />
					<LeadFeatureItem icon="fa6-solid:clock" text="Tư vấn siêu tốc 24/7" />
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
