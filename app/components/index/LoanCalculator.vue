<script setup>
import BaseRangeInput from "../ui/BaseRangeInput.vue";
import { formatCurrency } from "#imports";

const {
	bikePrice,
	downPaymentPercent,
	loanTermMonths,
	downPaymentValue,
	rawMonthlyPayment,
	animatedPayment,
} = useMortgage();

const sendToZalo = () => {
	const message = `Chào AnhEm Motor, tôi cần tư vấn trả góp:\n- Giá xe: ${formatCurrency(bikePrice.value)}\n- Trả trước: ${downPaymentPercent.value}%\n- Thời gian: ${loanTermMonths.value} tháng\n- Trả mỗi tháng: ~${formatCurrency(rawMonthlyPayment.value)}`;
	window.open(
		`https://zalo.me/0123456789?text=${encodeURIComponent(message)}`,
		"_blank",
	);
};
</script>

<template>
	<div
		class="w-full bg-white rounded-24 p-5 sm:p-8 border border-slate-100 shadow-soft relative z-10"
	>
		<h3 class="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 tracking-tight">
			Công cụ tính <span class="text-primary">trả góp</span>
		</h3>

		<div class="space-y-6 sm:space-y-8">
			<BaseRangeInput
				v-model="bikePrice"
				label="Giá xe dự kiến"
				:min="20000000"
				:max="200000000"
				:step="1000000"
				:display-value="formatCurrency(bikePrice)"
			/>

			<BaseRangeInput
				v-model="downPaymentPercent"
				label="Trả trước (%)"
				:min="0"
				:max="70"
				:step="10"
				:display-value="`${downPaymentPercent}%`"
				:sub-label="`Số tiền trả trước: ${formatCurrency(downPaymentValue)}`"
			/>

			<div class="space-y-4">
				<label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
					>Thời gian vay (tháng)</label
				>
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
					<button
						v-for="month in [6, 12, 18, 24]"
						:key="month"
						class="py-2.5 sm:py-3 rounded-xl font-bold transition-all border-2 text-[13px] sm:text-sm whitespace-nowrap"
						:class="
							loanTermMonths === month
								? 'border-primary bg-primary/5 text-primary'
								: 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200 hover:bg-slate-100'
						"
						@click="loanTermMonths = month"
					>
						{{ month }} tháng
					</button>
				</div>
			</div>

			<div
				class="bg-slate-900 rounded-24 p-8 text-center space-y-6 relative overflow-hidden group/result shadow-xl shadow-black/10"
			>
				<div class="space-y-2 relative z-10">
					<span
						class="text-[10px] text-white/50 uppercase font-bold tracking-widest"
						>Góp mỗi tháng dự kiến</span
					>
					<div
						class="text-4xl md:text-5xl font-bold text-primary overflow-hidden my-2"
					>
						{{ formatCurrency(animatedPayment) }}
					</div>
					<div
						class="flex items-center justify-center gap-2 text-xs font-bold text-primary bg-primary/10 py-1.5 px-4 rounded-full w-fit mx-auto mt-3"
					>
						<Icon name="ph:percent-bold" class="text-[12px]" />
						Lãi suất từ 0.79%/tháng
					</div>
				</div>

				<button
					class="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group active:scale-95 relative z-10"
					@click="sendToZalo"
				>
					<Icon
						name="ph:whatsapp-logo-fill"
						class="text-xl"
					/>
					Tư vấn qua Zalo
				</button>

				<p
					class="text-[10px] text-white/30 font-medium leading-relaxed relative z-10"
				>
					* Giá trị mang tính chất tham khảo, lãi suất thực tế có thể thay đổi tùy ngân hàng và hồ sơ khách hàng.
				</p>
			</div>
		</div>
	</div>
</template>

