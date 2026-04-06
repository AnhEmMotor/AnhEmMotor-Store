<script setup>
import { ref } from "vue";
import {
	TRUST_SERVICES,
	TESTIMONIALS,
	SHOWROOMS,
} from "@/constants/trust.constant";
import TrustServiceCard from "@/components/ui/TrustServiceCard.vue";
import TestimonialCard from "@/components/ui/TestimonialCard.vue";
import ShowroomItem from "@/components/ui/ShowroomItem.vue";
import ShowroomMap from "@/components/ui/ShowroomMap.vue";

const selectedShowroom = ref(SHOWROOMS[0]);
</script>

<template>
	<section class="py-24 bg-white overflow-hidden relative">
		<div class="container mx-auto px-4 relative z-10">
			<div
				class="bg-white rounded-[60px] p-10 md:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] mb-24 border border-slate-100"
			>
				<div class="flex flex-col gap-6 mb-16">
					<h2
						class="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none"
					>
						Đặc quyền <span class="text-red-600 italic">chỉ có</span> tại AnhEm
						Motor
					</h2>
					<p class="text-slate-400 font-medium leading-relaxed">
						Chúng tôi không chỉ bán xe, chúng tôi kiến tạo phong cách sống và sự
						an tâm trên từng cây số.
					</p>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
					<TrustServiceCard
						v-for="service in TRUST_SERVICES"
						:key="service.title"
						:service="service"
					/>
				</div>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
				<div class="space-y-12">
					<div class="space-y-4">
						<h2
							class="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900"
						>
							Biker nói về <span class="text-red-600">AnhEm Motor</span>
						</h2>
						<div class="flex gap-1">
							<Icon
								v-for="i in 5"
								:key="i"
								name="fa6-solid:star"
								class="text-sm text-yellow-400"
							/>
						</div>
					</div>

					<div class="space-y-6 relative">
						<div
							class="absolute left-6 top-8 bottom-8 w-px bg-slate-100 hidden md:block"
						/>

						<TestimonialCard
							v-for="(t, idx) in TESTIMONIALS"
							:key="t.name"
							:testimonial="t"
							:index="idx"
						/>
					</div>
				</div>

				<div class="space-y-12">
					<div class="space-y-8">
						<h2
							class="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900"
						>
							Hệ thống <span class="text-red-600">Showroom</span>
						</h2>
						<div
							class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"
						>
							<ShowroomItem
								v-for="s in SHOWROOMS"
								:key="s.city"
								:showroom="s"
								:is-selected="selectedShowroom.city === s.city"
								@select="selectedShowroom = $event"
							/>
						</div>
					</div>

					<ShowroomMap :showroom="selectedShowroom" />
				</div>
			</div>
		</div>
	</section>
</template>
