<template>
	<section class="py-16 bg-slate-50 relative overflow-hidden">
		<div class="container mx-auto px-4">
			<div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
				<div class="space-y-2">
					<h2 class="text-3xl md:text-4xl font-black uppercase tracking-tighter">
						Ưu Đãi <span class="text-red-600 italic">Cực Khủng</span>
					</h2>
					<p class="text-slate-500 font-medium">Số lượng quà tặng có hạn, nhanh chân đến ngay AnhEm Motor!</p>
				</div>
				<div class="flex items-center gap-4 bg-red-100 px-6 py-3 rounded-2xl border border-red-200 w-fit">
					<Icon name="fa6-solid:clock" class="text-red-600 animate-pulse" />
					<span class="text-red-600 font-black uppercase tracking-widest text-[10px] sm:text-xs">Kết thúc sau: 12 ngày 05:42:10</span>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<div v-for="promo in promotions" :key="promo.title" class="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col gap-6 relative overflow-hidden">
					<div class="absolute -top-10 -right-10 w-32 h-32 bg-red-50 rounded-full group-hover:scale-150 transition-transform duration-700" />
					
					<div class="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg relative z-10">
						<Icon :name="promo.icon" />
					</div>
					
					<div class="space-y-2 relative z-10">
						<h3 class="text-xl font-black uppercase tracking-tight">{{ promo.title }}</h3>
						<p class="text-slate-500 text-sm leading-relaxed">{{ promo.desc }}</p>
					</div>

					<div class="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between relative z-10">
						<span class="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">{{ promo.tag }}</span>
						<Icon name="fa6-solid:chevron-right" class="text-xs text-slate-300 group-hover:translate-x-1 transition-transform" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
const promotions = [
	{
		title: "Giảm tiền mặt 2 Triệu",
		desc: "Áp dụng trực tiếp vào giá lăn bánh cho các dòng xe Winner X, Exciter 155 khi mua trong tháng này.",
		icon: "fa6-solid:money-bill-wave",
		tag: "Giới hạn 20 suất"
	},
	{
		title: "Tặng Combo Phụ Kiện",
		desc: "Bao gồm mũ bảo hiểm fullface, áo mưa cao cấp và gói thay nhớt miễn phí 1 năm.",
		icon: "fa6-solid:gift",
		tag: "Quà tặng 1.5 Triệu"
	},
	{
		title: "Tặng Bảo Hiểm Xe",
		desc: "Miễn phí bảo hiểm trách nhiệm dân sự 1 năm và bảo hiểm thân vỏ cho các dòng xe tay ga.",
		icon: "fa6-solid:shield-halved",
		tag: "Đặc quyền Biker"
	}
]
</script>
