<script setup>
import BaseRangeInput from "@/components/ui/BaseRangeInput.vue";
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
		class="w-full lg:w-1/2 bg-white rounded-3xl p-8 shadow-2xl relative z-10"
	>
		<h3 class="text-2xl font-black text-gray-900 mb-8 uppercase text-center">
			Công cụ <span class="text-red-600">Trả Góp</span> 0%
		</h3>

		<div class="space-y-8">
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
				<label class="text-xs font-bold text-gray-400 uppercase"
					>Số tháng vay</label
				>
				<div class="grid grid-cols-4 gap-2">
					<button
						v-for="month in [6, 12, 18, 24]"
						:key="month"
						class="py-3 rounded-xl font-bold transition-all border-2"
						:class="
							loanTermMonths === month
								? 'border-red-600 bg-red-50 text-red-600'
								: 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-300'
						"
						@click="loanTermMonths = month"
					>
						{{ month }}T
					</button>
				</div>
			</div>

			<div
				class="bg-slate-900 rounded-[32px] p-8 text-center space-y-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border border-slate-800 relative overflow-hidden group/result"
			>
				<div
					class="absolute -inset-x-full inset-y-0 skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover/result:translate-x-[200%] transition-all duration-1000"
				/>

				<div class="space-y-1 relative z-10">
					<span
						class="text-[10px] text-white/50 uppercase font-black tracking-[0.2em]"
						>Số tiền trả mỗi tháng (dự kiến)</span
					>
					<div
						class="text-4xl md:text-5xl font-black text-red-600 overflow-hidden drop-shadow-[0_0_20px_rgba(220,38,38,0.3)] my-2 italic"
					>
						{{ formatCurrency(animatedPayment) }}
					</div>
					<div
						class="flex items-center justify-center gap-2 text-xs font-bold text-red-500 bg-red-500/10 py-1.5 px-4 rounded-full w-fit mx-auto mt-2"
					>
						<Icon name="fa6-solid:percent" class="text-[10px]" />
						Lãi suất tham khảo từ 0.79%/tháng
					</div>
				</div>

				<button
					class="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-[20px] font-black uppercase text-[11px] tracking-widest transition-all shadow-xl shadow-red-600/20 flex items-center justify-center gap-3 group active:scale-95 relative z-10"
					@click="sendToZalo"
				>
					<Icon
						name="fa6-solid:share-from-square"
						class="text-xs group-hover:rotate-12 transition-transform"
					/>
					Gửi lịch chi tiết qua Zalo
				</button>

				<p
					class="text-[9px] text-white/30 italic uppercase tracking-tighter relative z-10"
				>
					*Giá trị mang tính chất tham khảo, lãi suất thực tế có thể thay đổi
					tùy ngân hàng
				</p>
			</div>
		</div>
	</div>
</template>

