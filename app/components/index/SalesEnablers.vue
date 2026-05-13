<script setup>
import { BENEFITS } from "@/constants/benefit.constant";
import BenefitCard from "@/components/ui/BenefitCard.vue";
import LoanCalculator from "@/components/index/LoanCalculator.vue";
</script>

<template>
	<section class="py-20 container mx-auto px-4">
		<div
			class="relative bg-red-50 rounded-[40px] overflow-hidden p-8 md:p-16 flex flex-col lg:flex-row gap-16 items-center shadow-xl border border-red-100/50"
		>
			<LoanCalculator />

			<div
				class="w-full lg:w-1/2 text-slate-900 space-y-10 text-center lg:text-left relative z-10"
			>
				<div class="space-y-4">
					<h2 class="text-4xl md:text-6xl font-black leading-tight uppercase">
						Ưu Đãi <span class="text-red-700 italic">Đặc Quyền</span>
					</h2>
					<p class="text-slate-600 text-lg">
						Chỉ có tại <b>AnhEm Motor</b>, hỗ trợ thủ tục trả góp siêu tốc trong
						15 phút. Nhận xe ngay chỉ với CCCD.
					</p>
				</div>

				<div class="grid grid-cols-2 gap-6">
					<BenefitCard
						v-for="benefit in BENEFITS"
						:key="benefit.title"
						:benefit="benefit"
					/>
				</div>

				<button
					class="w-full lg:w-auto px-12 py-5 bg-slate-950 text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-900/20"
				>
					Tư Vấn Ngay
				</button>
			</div>
		</div>
	</section>
</template>
