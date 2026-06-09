<script setup>
import TrustServiceCard from "../ui/TrustServiceCard.vue";
import TestimonialCard from "../ui/TestimonialCard.vue";
import ShowroomMap from "../ui/ShowroomMap.vue";
import { SHOWROOMS, TESTIMONIALS, TRUST_SERVICES } from "~/core/domain/constants/trust.constant";

const isInfoOpen = ref(false);

// Testimonial Pagination Logic (Local client-side pagination)
const feedbackPage = ref(1);
const itemsPerPage = 6;
const totalFeedbackPages = computed(() => Math.ceil(TESTIMONIALS.length / itemsPerPage));
const paginatedTestimonials = computed(() => {
	const start = (feedbackPage.value - 1) * itemsPerPage;
	return TESTIMONIALS.slice(start, start + itemsPerPage);
});
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
						Vì sao khách hàng chọn <br >
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

			<div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-24">
				<div class="space-y-10 lg:col-span-5">
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

                    <!-- Showroom Info Card - Static on Desktop -->
                    <div class="hidden lg:flex flex-col bg-slate-50 p-10 rounded-[40px] border border-slate-100 shadow-soft space-y-8">
                        <div class="flex items-center gap-6">
                            <div class="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                                <Icon name="ph:map-pin-bold" class="text-3xl" />
                            </div>
                            <div>
                                <div class="text-[11px] text-gray-400 font-black uppercase tracking-widest mb-1">Địa chỉ Showroom</div>
                                <div class="text-gray-900 font-black text-lg leading-tight">{{ SHOWROOMS[0].address }}</div>
                            </div>
                        </div>

                        <div class="flex items-center gap-6 border-y border-gray-200/50 py-8">
                            <div class="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                                <Icon name="ph:phone-bold" class="text-3xl" />
                            </div>
                            <div>
                                <div class="text-[11px] text-gray-400 font-black uppercase tracking-widest mb-1">Hotline hỗ trợ 24/7</div>
                                <div class="text-gray-900 font-black text-xl leading-none">{{ SHOWROOMS[0].phone }}</div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-6">
                                <div class="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                                    <Icon name="ph:clock-bold" class="text-3xl" />
                                </div>
                                <div>
                                    <div class="text-[11px] text-gray-400 font-black uppercase tracking-widest mb-1">Giờ mở cửa</div>
                                    <div class="text-gray-900 font-black text-base leading-none">08:00 - 20:00 (Hàng ngày)</div>
                                </div>
                            </div>
                            <div class="flex flex-col items-end">
                                <span class="text-[9px] font-black text-green-500 uppercase tracking-widest mb-1 animate-pulse">● Đang mở cửa</span>
                            </div>
                        </div>
                    </div>
				</div>

				<div class="lg:col-span-7">
					<div class="relative w-full h-[450px] lg:h-[600px] rounded-[32px] lg:rounded-[50px] overflow-hidden shadow-elevated group bg-white">
                        <ShowroomMap :showroom="SHOWROOMS[0]" class="w-full h-full" />
                        
                        <!-- Toggle Showroom Info Button (Mobile only) -->
                        <button 
                            v-if="!isInfoOpen"
                            class="lg:hidden absolute bottom-4 right-4 z-20 bg-primary text-white font-black text-xs flex items-center gap-2 px-5 py-3.5 rounded-full shadow-lg shadow-primary/30 active:scale-95 transition-all duration-300 animate-bounce"
                            style="animation-duration: 3s;"
                            @click="isInfoOpen = true"
                        >
                            <Icon name="ph:map-pin-bold" class="text-base animate-pulse" />
                            <span>Thông tin Cửa hàng</span>
                        </button>

                        <div 
                            class="absolute lg:hidden bottom-4 left-4 right-4 bg-white/95 p-6 rounded-[28px] shadow-2xl border border-white/50 space-y-5 z-30 transition-all duration-500"
                            :class="[
                                isInfoOpen 
                                    ? 'flex flex-col translate-y-0 opacity-100' 
                                    : 'hidden'
                            ]"
                        >
                            <!-- Close Button (Mobile only) -->
                            <button 
                                class="absolute top-4 right-4 w-8 h-8 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-500 rounded-full flex items-center justify-center transition-colors duration-200"
                                @click="isInfoOpen = false"
                            >
                                <Icon name="ph:x-bold" class="text-sm" />
                            </button>

                            <div class="flex items-center gap-5">
                                <div class="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                                    <Icon name="ph:map-pin-bold" class="text-2xl" />
                                </div>
                                <div>
                                    <div class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Địa chỉ Showroom</div>
                                    <div class="text-gray-900 font-black text-sm leading-tight">{{ SHOWROOMS[0].address }}</div>
                                </div>
                            </div>

                            <div class="flex items-center gap-5 border-y border-gray-100 py-6">
                                <div class="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                                    <Icon name="ph:phone-bold" class="text-2xl" />
                                </div>
                                <div>
                                    <div class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Hotline hỗ trợ 24/7</div>
                                    <div class="text-gray-900 font-black text-lg leading-none">{{ SHOWROOMS[0].phone }}</div>
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-5">
                                    <div class="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                                        <Icon name="ph:clock-bold" class="text-2xl" />
                                    </div>
                                    <div>
                                        <div class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Giờ mở cửa</div>
                                        <div class="text-gray-900 font-black text-sm leading-none">08:00 - 20:00 (Hàng ngày)</div>
                                    </div>
                                </div>
                                <div class="flex flex-col items-end">
                                    <span class="text-[9px] font-black text-green-500 uppercase tracking-widest mb-1 animate-pulse">● Đang mở cửa</span>
                                </div>
                            </div>
                        </div>
                    </div>
				</div>
			</div>

            <!-- Testimonials Grid Row - Full Width Below Map/Showroom on PC -->
            <div class="mt-24 pt-20 border-t border-slate-100/80">
                <div class="space-y-4 text-center max-w-3xl mx-auto mb-16">
                    <div class="text-primary font-bold uppercase tracking-widest text-sm">Đánh giá thực tế</div>
                    <h2 class="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        Biker nói về <span class="text-primary">AnhEm Motor</span>
                    </h2>
                    <div class="flex justify-center gap-1">
                        <Icon
                            v-for="i in 5"
                            :key="i"
                            name="ph:star-fill"
                            class="text-xl text-yellow-400"
                        />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TestimonialCard
                        v-for="(t, idx) in paginatedTestimonials"
                        :key="t.name"
                        :testimonial="t"
                        :index="idx"
                    />
                </div>

                <!-- Testimonial Local Pagination Component -->
                <div v-if="totalFeedbackPages > 1" class="flex justify-center pt-16">
                    <UiBasePagination
                        :current-page="feedbackPage"
                        :total-pages="totalFeedbackPages"
                        @update:current-page="feedbackPage = $event"
                    />
                </div>
            </div>
		</div>
	</section>
</template>

