<script setup>

import BenefitCard from "@/components/ui/BenefitCard.vue";
import LoanCalculator from "@/components/index/LoanCalculator.vue";
</script>

<template>
	<section class="py-24 container mx-auto px-6">
		<div
			class="relative bg-white rounded-24 overflow-hidden p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch border border-slate-100 shadow-soft"
		>
			<div class="w-full lg:w-[42%] shrink-0">
				<LoanCalculator />
			</div>

			<div
				class="w-full lg:flex-1 text-slate-900 flex flex-col justify-center space-y-10 lg:pl-10 relative z-10"
			>
				<div class="space-y-6 text-left">
                    <div class="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                        Chương trình đặc biệt
                    </div>
					<h2 class="text-4xl md:text-5xl lg:text-[42px] font-bold leading-tight tracking-tight">
						Trả góp <span class="text-primary">0% lãi suất</span> <br class="hidden lg:block" /> Nhận xe ngay chỉ với CCCD
					</h2>
					<p class="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
						Hỗ trợ thủ tục trả góp siêu tốc trong 15 phút. Duyệt hồ sơ nhanh chóng, cam kết không phát sinh chi phí ẩn.
					</p>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
					<BenefitCard
						v-for="benefit in BENEFITS"
						:key="benefit.title"
						:benefit="benefit"
					/>
				</div>

				<div class="pt-4">
					<button
						class="px-10 py-5 bg-slate-900 text-white rounded-xl font-bold transition-all hover:bg-primary shadow-xl shadow-black/5 hover:-translate-y-1"
					>
						Liên hệ tư vấn trả góp
					</button>
				</div>
			</div>
		</div>
	</section>
</template>
