<script setup>
import TrustServiceCard from "@/components/ui/TrustServiceCard.vue";
import TestimonialCard from "@/components/ui/TestimonialCard.vue";
import ShowroomItem from "@/components/ui/ShowroomItem.vue";
import ShowroomMap from "@/components/ui/ShowroomMap.vue";

const selectedShowroom = ref(SHOWROOMS[0]);
</script>

<template>
	<section class="py-24 bg-white overflow-hidden relative">
		<div class="container mx-auto px-6 relative z-10">
			<div
				class="bg-slate-50 rounded-24 p-10 md:p-16 mb-24 border border-slate-100"
			>
				<div class="flex flex-col gap-4 mb-16 text-center max-w-3xl mx-auto">
                    <div class="text-primary font-bold uppercase tracking-widest text-sm">Giá trị cốt lõi</div>
					<h2
						class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
					>
						Vì sao khách hàng chọn <br />
                        <span class="text-primary">AnhEm Motor</span>
					</h2>
					<p class="text-slate-500 font-medium text-lg leading-relaxed">
						Chúng tôi không chỉ cung cấp xe máy, chúng tôi mang đến sự an tâm tuyệt đối và dịch vụ tận tâm trên từng chặng đường.
					</p>
				</div>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
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
                        <div class="text-primary font-bold uppercase tracking-widest text-sm">Đánh giá thực tế</div>
						<h2
							class="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
						>
							Biker nói về <span class="text-primary">AnhEm Motor</span>
						</h2>
						<div class="flex gap-1">
							<Icon
								v-for="i in 5"
								:key="i"
								name="ph:star-fill"
								class="text-lg text-yellow-400"
							/>
						</div>
					</div>

					<div class="space-y-6 relative">
						<TestimonialCard
							v-for="(t, idx) in TESTIMONIALS"
							:key="t.name"
							:testimonial="t"
							:index="idx"
						/>
					</div>
				</div>

				<div class="space-y-10 lg:sticky lg:top-24">
					<div class="space-y-6">
                        <div class="text-primary font-bold uppercase tracking-widest text-sm">Ghé thăm chúng tôi</div>
						<h2
							class="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
						>
							Thông tin <span class="text-primary">Cửa hàng</span>
						</h2>
                        <p class="text-slate-500 font-medium text-lg">
                            Mời bạn ghé thăm showroom của chúng tôi để trải nghiệm trực tiếp các mẫu xe mới nhất.
                        </p>
					</div>

					<div class="relative rounded-24 overflow-hidden shadow-elevated group">
                        <ShowroomMap :showroom="SHOWROOMS[0]" class="w-full h-[500px] md:h-[600px]" />
                        
                        <div class="absolute bottom-6 left-6 right-6 md:right-auto md:w-[400px] bg-white/95 backdrop-blur-md p-8 rounded-24 shadow-2xl border border-slate-100 space-y-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <div class="flex items-center gap-5">
                                <div class="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                                    <Icon name="ph:map-pin-bold" class="text-2xl" />
                                </div>
                                <div>
                                    <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Địa chỉ</div>
                                    <div class="text-slate-900 font-bold text-base leading-tight">{{ SHOWROOMS[0].address }}</div>
                                </div>
                            </div>

                            <div class="flex items-center gap-5 border-y border-slate-100 py-6">
                                <div class="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                                    <Icon name="ph:phone-bold" class="text-2xl" />
                                </div>
                                <div>
                                    <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Hotline hỗ trợ</div>
                                    <div class="text-slate-900 font-bold text-lg leading-none">{{ SHOWROOMS[0].phone }}</div>
                                </div>
                            </div>

                            <div class="flex items-center gap-5">
                                <div class="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                                    <Icon name="ph:clock-bold" class="text-2xl" />
                                </div>
                                <div>
                                    <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Giờ mở cửa</div>
                                    <div class="text-slate-900 font-bold text-base leading-none">08:00 - 20:00 (Hàng ngày)</div>
                                </div>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</section>
</template>

