<template>
	<section class="py-20 bg-white relative overflow-hidden">
		
		<div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(#de0000 0.5px, transparent 0.5px); background-size: 24px 24px;"/>
		
		<div class="container mx-auto px-6 relative z-10">
			<div class="flex flex-col lg:flex-row gap-16 items-center">
				<div class="lg:w-1/2 space-y-10">
					<div class="space-y-4">
						<div class="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full">
							<span class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"/>
							<span class="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Văn hóa công ty</span>
						</div>
						<h2 class="text-3xl md:text-4xl font-black text-gray-900 leading-[0.95] italic uppercase tracking-tighter">
							Làm việc tại <br >
							<span class="text-primary underline decoration-black/5 underline-offset-8">Môi trường Chuyên nghiệp</span>
						</h2>
						<p class="text-base text-gray-500 font-medium leading-relaxed max-w-lg">
							Tại AnhEm Motor, chúng tôi tin rằng mỗi thành viên là một mảnh ghép quan trọng. Chúng tôi xây dựng môi trường làm việc nơi sự trung thực, tinh thần đồng đội và khát vọng phát triển luôn được ưu tiên hàng đầu.
						</p>
					</div>


					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div
v-for="(item, index) in culture" :key="index" 
							class="reveal reveal-up p-8 rounded-[2rem] bg-gray-50 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
							:style="{ transitionDelay: `${index * 150}ms` }"
						>
							<div class="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">
								<Icon :name="item.icon" class="text-2xl" />
							</div>
							<h3 class="text-xl font-black text-gray-900 mb-3 italic uppercase tracking-tight">{{ item.title }}</h3>
							<p class="text-sm text-gray-400 font-medium leading-relaxed">{{ item.desc }}</p>
						</div>
					</div>

				</div>

				<div class="lg:w-1/2 relative">
					
					<div class="grid grid-cols-2 gap-6">
						<div class="space-y-6 pt-16">
							<div class="relative group overflow-hidden rounded-[2.5rem] shadow-2xl shadow-black/10">
								<img
									src="/img/recruitment/technical.png"
									alt="Training"
									class="w-full h-72 object-cover transition-transform duration-1000 group-hover:scale-110"
								>
								<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
							</div>
							<div class="p-8 bg-primary rounded-[2.5rem] text-white shadow-2xl shadow-primary/30 transform hover:-translate-y-2 transition-transform duration-500">
								<div class="text-5xl font-black mb-3 italic tracking-tighter">100%</div>
								<div class="text-xs font-black uppercase tracking-widest opacity-80">Kỹ thuật viên chuyên nghiệp</div>
							</div>
						</div>
						<div class="space-y-6">
							<div class="p-8 bg-gray-900 rounded-[2.5rem] text-white shadow-2xl shadow-black/20 transform hover:-translate-y-2 transition-transform duration-500">
								<div class="text-2xl font-black mb-2 italic uppercase tracking-tight">Văn hóa Team</div>
								<p class="text-xs font-medium text-white/50 tracking-wide uppercase">Hỗ trợ nhau như gia đình.</p>
							</div>
							<div class="relative group overflow-hidden rounded-[2.5rem] shadow-2xl shadow-black/10">
								<img
									src="/img/recruitment/hero.png"
									alt="Showroom Team"
									class="w-full h-80 object-cover transition-transform duration-1000 group-hover:scale-110"
								>
								<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
							</div>
						</div>

					</div>
					
					
					<div class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full opacity-50 blur-[120px]"/>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
const culture = [
	{
		title: 'Tôn trọng khách hàng',
		desc: 'Luôn đặt lợi ích và trải nghiệm của khách hàng làm kim chỉ nam cho mọi hành động.',
		icon: 'fa6-solid:users'
	},
	{
		title: 'Làm việc minh bạch',
		desc: 'Rõ ràng trong quy trình, trung thực trong mọi giao dịch và cam kết về chất lượng.',
		icon: 'fa6-solid:shield-halved'
	},
	{
		title: 'Hỗ trợ đồng đội',
		desc: 'Sẵn sàng chia sẻ kiến thức và giúp đỡ nhau hoàn thành mục tiêu chung.',
		icon: 'fa6-solid:handshake-angle'
	},
	{
		title: 'Phát triển bền vững',
		desc: 'Cung cấp lộ trình thăng tiến rõ ràng và các khóa đào tạo kỹ năng chuyên sâu.',
		icon: 'fa6-solid:arrow-trend-up'
	}
];
</script>
