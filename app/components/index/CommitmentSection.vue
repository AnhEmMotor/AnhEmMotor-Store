<template>
	<section class="py-16 bg-slate-900 text-white relative overflow-hidden">
		<!-- Background elements -->
		<div class="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
		
		<div class="container mx-auto px-4 relative z-10">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div class="space-y-6">
					<div class="space-y-2">
						<span class="text-red-500 font-black uppercase tracking-[0.3em] text-[10px]">Tại sao chọn chúng tôi?</span>
						<h2 class="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
							Cam Kết <br/> <span class="text-red-600 italic">Giá Trị Vững Bền</span>
						</h2>
					</div>
					
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div v-for="item in commitments" :key="item.title" class="p-6 bg-white/5 backdrop-blur-sm rounded-[32px] border border-white/10 hover:border-red-600/50 transition-all group">
							<div class="w-12 h-12 bg-red-600/20 text-red-500 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-red-600 group-hover:text-white transition-all">
								<Icon :name="item.icon" />
							</div>
							<h3 class="font-black uppercase tracking-tight mb-2">{{ item.title }}</h3>
							<p class="text-white/50 text-xs leading-relaxed">{{ item.desc }}</p>
						</div>
					</div>
				</div>

				<div class="relative group">
					<div class="absolute -inset-4 bg-red-600/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
					<div class="relative aspect-video rounded-[40px] overflow-hidden border-4 border-white/10 shadow-2xl">
						<img src="/assets/image/index/index-banner-bg.webp" alt="AnhEm Motor Commitment" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
						<div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
						<div class="absolute bottom-8 left-8 right-8">
							<div class="flex items-center gap-4">
								<div class="flex -space-x-3">
									<div v-for="i in 3" :key="i" class="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800" />
								</div>
								<p class="text-xs font-bold text-white/80">Hơn <span class="text-red-500">20,000+</span> Biker đã tin tưởng lựa chọn</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
const commitments = [
	{
		title: "Đại lý chính hãng",
		desc: "Hệ thống phân phối ủy quyền từ Honda, Yamaha, Piaggio với chứng nhận uy tín.",
		icon: "fa6-solid:certificate"
	},
	{
		title: "Kỹ thuật chuyên sâu",
		desc: "Đội ngũ kỹ thuật viên được đào tạo bài bản, máy móc hiện đại nhất khu vực.",
		icon: "fa6-solid:user-gear"
	},
	{
		title: "Bảo trì định kỳ",
		desc: "Nhắc hẹn bảo trì tự động qua Zalo, đảm bảo xe luôn trong trạng thái tốt nhất.",
		icon: "fa6-solid:calendar-check"
	},
	{
		title: "Hỗ trợ cứu hộ",
		desc: "Dịch vụ cứu hộ xe máy tận nơi 24/7 bất kể thời tiết tại Biên Hòa.",
		icon: "fa6-solid:truck-medical"
	}
]
</script>
