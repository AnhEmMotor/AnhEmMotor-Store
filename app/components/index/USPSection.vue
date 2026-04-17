<script setup>
import { TRUST_SERVICES } from "@/constants/trust.constant";
import TrustServiceCard from "@/components/ui/TrustServiceCard.vue";
</script>

<template>
	<section class="py-12 bg-white relative">
		<div class="container mx-auto px-4">
			<div
				class="bg-white rounded-[40px] p-8 md:p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-100 -mt-16 relative z-20"
			>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
					<TrustServiceCard
						v-for="service in TRUST_SERVICES"
						:key="service.title"
						:service="service"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
