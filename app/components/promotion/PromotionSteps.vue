<script setup>
const steps = [
	{
		title: "Chọn ưu đãi",
		desc: "Duyệt danh sách và chọn chương trình khuyến mãi phù hợp với nhu cầu của bạn.",
		icon: "/promotion_step_1_selection_3d_premium_1778927829571.png"
	},
	{
		title: "Nhận tư vấn",
		desc: "Để lại thông tin hoặc gọi Hotline để nhân viên xác nhận và tư vấn chi tiết về hồ sơ.",
		icon: "/promotion_step_2_consultation_3d_premium_1778927846616.png"
	},
	{
		title: "Làm thủ tục",
		desc: "Ghé Showroom gần nhất để ký hợp đồng và hoàn thiện các thủ tục nhận ưu đãi.",
		icon: "/promotion_step_3_procedure_3d_premium_1778927862992.png"
	},
	{
		title: "Nhận xế yêu",
		desc: "Sẵn sàng lên đường cùng chiếc xe mới và bộ quà tặng độc quyền từ AnhEm Motor.",
		icon: "/promotion_step_4_delivery_3d_premium_1778927900499.png"
	}
];
</script>

<template>
	<section class="py-12 md:py-20 bg-white relative overflow-hidden font-['Manrope']">
		
		<div class="absolute inset-0 opacity-[0.03] pointer-events-none">
			<img src="https://images.unsplash.com/photo-1558981403-c5f97dbbe480?q=80&w=1200" class="w-full h-full object-cover" alt="Background">
		</div>

		<div class="container mx-auto px-4 relative z-10">
			<div class="text-center mb-24 space-y-4">
				<h2 class="text-4xl md:text-5xl font-black text-gray-950 uppercase tracking-tighter">Quy trình nhận <span class="text-red-600 italic">ưu đãi</span></h2>
				<p class="text-gray-400 text-xs font-black uppercase tracking-[0.3em]">Sở hữu chiếc xe mơ ước chỉ với 4 bước đơn giản</p>
			</div>

			<div class="grid grid-cols-4 gap-2 md:gap-4 relative">
				
				<div class="absolute top-[35px] md:top-[60px] left-[12%] right-[12%] h-[1.5px] bg-gray-100 z-0">
					
					<div class="absolute inset-0 bg-red-600/30 scale-x-100 origin-left"/>
				</div>

				<div 
					v-for="(step, index) in steps" 
					:key="index"
					class="relative group z-10"
				>
					<div class="flex flex-col items-center text-center space-y-4 md:space-y-8">
						
						<div class="relative">
							<div class="w-14 h-14 md:w-32 md:h-32 rounded-xl md:rounded-[2.5rem] bg-white flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-all duration-700 shadow-lg group-hover:shadow-red-600/10">
								<img :src="step.icon" class="w-10 h-10 md:w-20 md:h-20 object-contain" :alt="step.title">
							</div>
							
							
							<div class="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-6 h-6 md:w-12 md:h-12 rounded-full bg-gray-950 text-white flex items-center justify-center font-black text-[8px] md:text-xs shadow-xl border-2 md:border-4 border-white">
								{{ index + 1 }}
							</div>
						</div>
						
						<div class="space-y-1 md:space-y-4">
							<h3 class="text-[9px] md:text-xl font-[1000] text-gray-950 uppercase tracking-tight group-hover:text-red-600 transition-colors leading-tight">
								{{ step.title }}
							</h3>
							<p class="hidden md:block text-gray-500 text-sm font-medium leading-relaxed">
								{{ step.desc }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
