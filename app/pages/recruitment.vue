<template>
	<div class="recruitment-page bg-white overflow-hidden relative">

		
		<div class="fixed top-0 left-0 h-1 bg-primary z-[100] transition-all duration-150" :style="{ width: `${scrollProgress}%` }"/>

		
		<div class="fixed inset-0 pointer-events-none z-0">
			<div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px] animate-pulse"/>
			<div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px] animate-pulse delay-1000"/>
			
			
			<div
v-for="i in 6" :key="i" 
				class="absolute bg-primary/10 rounded-full blur-xl animate-float-slow"
				:style="{
					width: `${Math.random() * 100 + 50}px`,
					height: `${Math.random() * 100 + 50}px`,
					top: `${Math.random() * 100}%`,
					left: `${Math.random() * 100}%`,
					animationDelay: `${Math.random() * 5}s`,
					animationDuration: `${Math.random() * 10 + 10}s`
				}"
			/>
		</div>


		<main class="relative z-10">
			
			<RecruitmentHero
				@scroll-to-jobs="scrollTo('jobs')"
				@scroll-to-form="scrollTo('apply-form')"
			/>

			
			<div class="reveal reveal-up">
				<RecruitmentEnvironmentSection />
			</div>

			
			<div id="jobs" class="reveal reveal-up">
				<RecruitmentJobsList
					@apply-job="handleApplyJob"
				/>
			</div>

			
			<div id="apply-form" class="reveal reveal-up">
				<RecruitmentApplicationForm
					:pre-selected-position="selectedPosition"
				/>
			</div>

			
			<section class="py-20 bg-gray-50/50 relative overflow-hidden">
				<div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"/>
				
				<div class="container mx-auto px-4 max-w-4xl relative z-10">
					<div class="text-center mb-16 reveal reveal-up">
						<div class="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-4">
							<span class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"/>
							<span class="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Hỗ trợ ứng viên</span>
						</div>
						<h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-4 italic uppercase tracking-tighter">Câu hỏi <span class="text-primary">Thường gặp</span></h2>
						<p class="text-gray-500 font-medium text-sm max-w-xl mx-auto">Giải đáp nhanh những thắc mắc của ứng viên về quá trình tuyển dụng tại AnhEm Motor.</p>
					</div>


					<div class="space-y-6">
						<div 
							v-for="(item, index) in faqs" 
							:key="index"
							class="reveal reveal-up"
							:style="{ transitionDelay: `${index * 100}ms` }"
						>
							<div class="bg-white rounded-3xl border border-gray-100 transition-all hover:border-primary/20 hover:shadow-xl shadow-sm overflow-hidden group">
								<button 
									class="w-full px-8 py-6 text-left flex justify-between items-center"
									@click="activeFaq = activeFaq === index ? -1 : index"
								>
									<span class="text-lg font-black text-gray-900 group-hover:text-primary transition-colors italic uppercase tracking-tight">{{ item.label }}</span>
									<div class="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
										<Icon 
											name="fa6-solid:chevron-down" 
											class="text-xs transition-transform duration-500"
											:class="{ 'rotate-180': activeFaq === index }"
										/>
									</div>
								</button>
								<div 
									v-if="activeFaq === index"
									class="px-8 pb-8 text-gray-500 font-medium leading-relaxed animate-fade-in-up"
								>
									<div class="pt-6 border-t border-gray-50">
										{{ item.content }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			
			<section class="py-24 bg-[#0a0a0a] relative overflow-hidden text-center">
				
				<div class="absolute inset-0 z-0">
					<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] animate-pulse"/>
				</div>
				
				<div class="container mx-auto px-4 relative z-10 reveal reveal-up">
					<h2 class="text-4xl md:text-5xl font-black text-white mb-8 italic uppercase tracking-tighter leading-tight">
						SẴN SÀNG GIA NHẬP <br>
						<span class="text-primary underline decoration-white/10 underline-offset-8">ANHEM MOTOR?</span>
					</h2>
					<p class="text-white/60 text-lg mb-12 max-w-2xl mx-auto font-medium">
						Chúng tôi không chỉ tìm kiếm nhân viên, chúng tôi tìm kiếm những cộng sự cùng chung lý tưởng và đam mê.
					</p>
					<button
						class="group px-12 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:scale-105 hover:bg-white hover:text-primary transition-all shadow-[0_20px_50px_rgba(227,24,55,0.3)] active:scale-95 flex items-center gap-4 mx-auto"
						@click="scrollTo('apply-form')"
					>
						ỨNG TUYỂN NGAY
						<Icon name="fa6-solid:paper-plane" class="text-lg group-hover:translate-x-2 transition-transform" />
					</button>
				</div>
			</section>

		</main>
	</div>
</template>

<script setup>
const { faqs, fetchFaqs } = useRecruitment();
const selectedPosition = ref('');
const activeFaq = ref(-1);
const scrollProgress = ref(0);

useHead({
	title: 'Tuyển dụng - Gia nhập đội ngũ AnhEm Motor',
	meta: [
		{ name: 'description', content: 'Tìm kiếm cơ hội nghề nghiệp trong môi trường xe máy chuyên nghiệp, thân thiện tại AnhEm Motor. Tuyển dụng nhân viên bán hàng, kỹ thuật viên.' }
	]
});


const updateScrollProgress = () => {
	const winScroll = document.documentElement.scrollTop;
	const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	scrollProgress.value = (winScroll / height) * 100;
};


onMounted(async () => {
	await fetchFaqs();
	window.addEventListener('scroll', updateScrollProgress);
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('reveal-visible');
			}
		});
	}, { threshold: 0.1 });

	document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

onUnmounted(() => {
	window.removeEventListener('scroll', updateScrollProgress);
});


const scrollTo = (id) => {
	const el = document.getElementById(id);
	if (el) {
		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
};

const handleApplyJob = (position) => {
	selectedPosition.value = position;
	scrollTo('apply-form');
};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap');

.recruitment-page, .recruitment-page * {
	font-family: 'Manrope', sans-serif;
}

@keyframes float-slow {
	0%, 100% { transform: translate(0, 0) rotate(0deg); }
	33% { transform: translate(30px, -50px) rotate(10deg); }
	66% { transform: translate(-20px, 20px) rotate(-10deg); }
}
.animate-float-slow {
	animation: float-slow 15s ease-in-out infinite;
}

.reveal {
	opacity: 0;
	transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-up { transform: translateY(40px); }
.reveal-visible {
	opacity: 1;
	transform: translate(0, 0);
}

@keyframes fade-in-up {
	from { opacity: 0; transform: translateY(20px); }
	to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
	animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>

