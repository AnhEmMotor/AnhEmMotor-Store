<script setup>
import { ref } from "vue";
import { SHOWROOMS } from "@/constants/trust.constant";
import ShowroomItem from "@/components/ui/ShowroomItem.vue";
import ShowroomMap from "@/components/ui/ShowroomMap.vue";

const selectedShowroom = ref(SHOWROOMS[0]);
</script>

<template>
	<section class="py-16 bg-white">
		<div class="container mx-auto px-4">
			<div class="flex flex-col gap-8">
				<div class="space-y-2 text-center">
					<h2 class="text-3xl md:text-4xl font-black uppercase tracking-tighter">
						Hệ thống <span class="text-red-600">Showroom</span>
					</h2>
					<p class="text-slate-500 font-medium">Đến ngay cửa hàng gần nhất để trải nghiệm và nhận tư vấn trực tiếp.</p>
				</div>

				<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-slate-50 rounded-[50px] p-8 md:p-12 border border-slate-100">
					<div class="space-y-8">
						<div class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
							<ShowroomItem
								v-for="s in SHOWROOMS"
								:key="s.city"
								:showroom="s"
								:is-selected="selectedShowroom.city === s.city"
								@select="selectedShowroom = $event"
							/>
						</div>
						
						<div class="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-center gap-6">
							<div class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl">
								<Icon name="fa6-solid:phone" />
							</div>
							<div>
								<p class="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Hotline tư vấn</p>
								<a href="tel:0901234567" class="text-2xl font-black text-slate-900 hover:text-red-600 transition-colors">0901.234.567</a>
							</div>
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div class="p-5 bg-white rounded-3xl border border-slate-100 space-y-3">
								<Icon name="fa6-solid:truck-ramp-box" class="text-xl text-red-600" />
								<p class="text-[10px] font-black uppercase tracking-widest">Giao xe trong ngày</p>
								<p class="text-[8px] text-slate-400 leading-tight">Thủ tục nhanh chóng, nhận xe ngay chỉ sau 30 phút làm hồ sơ.</p>
							</div>
							<div class="p-5 bg-white rounded-3xl border border-slate-100 space-y-3">
								<Icon name="fa6-solid:motorcycle" class="text-xl text-red-600" />
								<p class="text-[10px] font-black uppercase tracking-widest">Lái thử miễn phí</p>
								<p class="text-[8px] text-slate-400 leading-tight">Trải nghiệm thực tế tất cả các dòng xe mới nhất hoàn toàn miễn phí.</p>
							</div>
							<div class="p-5 bg-white rounded-3xl border border-slate-100 space-y-3">
								<Icon name="fa6-solid:hand-holding-dollar" class="text-xl text-red-600" />
								<p class="text-[10px] font-black uppercase tracking-widest">Thu cũ đổi mới</p>
								<p class="text-[8px] text-slate-400 leading-tight">Định giá xe cũ cao hơn thị trường 5-10% khi lên đời xe mới.</p>
							</div>
							<div class="p-5 bg-white rounded-3xl border border-slate-100 space-y-3">
								<Icon name="fa6-solid:screwdriver-wrench" class="text-xl text-red-600" />
								<p class="text-[10px] font-black uppercase tracking-widest">Bảo trì trọn đời</p>
								<p class="text-[8px] text-slate-400 leading-tight">Tặng gói bảo dưỡng miễn phí công thợ trọn đời cho mọi dòng xe.</p>
							</div>
						</div>

					</div>

					<div class="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-full min-h-[400px]">
						<ShowroomMap :showroom="selectedShowroom" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
