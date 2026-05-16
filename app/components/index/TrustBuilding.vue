<script setup>
import TrustServiceCard from "../ui/TrustServiceCard.vue";
import TestimonialCard from "../ui/TestimonialCard.vue";
import ShowroomItem from "../ui/ShowroomItem.vue";
import ShowroomMap from "../ui/ShowroomMap.vue";

const selectedShowroom = ref(SHOWROOMS[0]);
</script>

<template>
	<section class="py-24 bg-white overflow-hidden relative">
		<div class="container mx-auto px-6 relative z-10">
			<div
				class="bg-slate-50 rounded-24 p-6 sm:p-10 md:p-16 mb-24 border border-slate-100"
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

					<div class="relative rounded-[32px] md:rounded-[50px] overflow-hidden shadow-elevated group border-[6px] md:border-[10px] border-white">
                        <ShowroomMap :showroom="SHOWROOMS[0]" class="w-full h-[550px] md:h-[650px]" />
                        
                        <div class="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:w-[420px] bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-[28px] md:rounded-[40px] shadow-2xl border border-white/50 space-y-5 md:space-y-8 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                            <div class="flex items-center gap-5 md:gap-6">
                                <div class="w-12 h-12 md:w-14 md:h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                                    <Icon name="ph:map-pin-bold" class="text-2xl md:text-3xl" />
                                </div>
                                <div>
                                    <div class="text-[10px] md:text-[11px] text-gray-400 font-black uppercase tracking-widest mb-1">Địa chỉ Showroom</div>
                                    <div class="text-gray-900 font-black text-sm md:text-lg leading-tight">{{ SHOWROOMS[0].address }}</div>
                                </div>
                            </div>

                            <div class="flex items-center gap-5 md:gap-6 border-y border-gray-50 py-6 md:py-8">
                                <div class="w-12 h-12 md:w-14 md:h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                                    <Icon name="ph:phone-bold" class="text-2xl md:text-3xl" />
                                </div>
                                <div>
                                    <div class="text-[10px] md:text-[11px] text-gray-400 font-black uppercase tracking-widest mb-1">Hotline hỗ trợ 24/7</div>
                                    <div class="text-gray-900 font-black text-lg md:text-xl leading-none">{{ SHOWROOMS[0].phone }}</div>
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-5 md:gap-6">
                                    <div class="w-12 h-12 md:w-14 md:h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                                        <Icon name="ph:clock-bold" class="text-2xl md:text-3xl" />
                                    </div>
                                    <div>
                                        <div class="text-[10px] md:text-[11px] text-gray-400 font-black uppercase tracking-widest mb-1">Giờ mở cửa</div>
                                        <div class="text-gray-900 font-black text-sm md:text-base leading-none">08:00 - 20:00 (Hàng ngày)</div>
                                    </div>
                                </div>
                                <div class="hidden md:flex flex-col items-end">
                                    <span class="text-[9px] font-black text-green-500 uppercase tracking-widest mb-1 animate-pulse">● Đang mở cửa</span>
                                </div>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</section>
</template>

