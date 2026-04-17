<script setup>
import { TESTIMONIALS } from "@/constants/trust.constant";
import TestimonialCard from "@/components/ui/TestimonialCard.vue";
</script>

<template>
	<section class="py-16 bg-white overflow-hidden relative">
		<div class="container mx-auto px-4 relative z-10">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
				<div class="lg:col-span-1 space-y-4">
					<div class="space-y-2">
						<span class="text-red-600 font-black uppercase tracking-[0.3em] text-[10px]">Cộng đồng Biker</span>
						<h2 class="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 leading-tight">
							Biker nói về <br/><span class="text-red-600 italic">AnhEm Motor</span>
						</h2>
						<div class="flex gap-1">
							<Icon
								v-for="i in 5"
								:key="i"
								name="fa6-solid:star"
								class="text-sm text-yellow-400"
							/>
						</div>
						<p class="text-slate-400 font-medium leading-relaxed">
							Hàng nghìn khách hàng đã tin tưởng và đồng hành cùng chúng tôi trên mọi cung đường.
						</p>
					</div>
				</div>

				<div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
					<!-- Social Proof Elements -->
					<div class="absolute -top-12 -right-12 w-48 h-48 bg-slate-50 rounded-full blur-3xl opacity-50" />
					
					<TestimonialCard
						v-for="(t, idx) in TESTIMONIALS"
						:key="t.name"
						:testimonial="t"
						:index="idx"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
