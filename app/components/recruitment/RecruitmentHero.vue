<template>
	<section class="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a] pt-20">
		
		<div class="absolute inset-0 z-0">
			<img
				src="/img/recruitment/hero.png"
				alt="Gia nhập AnhEm Motor"
				class="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
			>
			<div class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent"/>
			<div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent"/>
		</div>


		
		<div class="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"/>
		<div class="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse delay-700"/>
		
		
		<div class="absolute top-1/3 left-1/4 w-12 h-12 border border-white/10 rounded-lg rotate-12 animate-float-slow opacity-20"/>
		<div class="absolute bottom-1/3 right-1/3 w-16 h-16 border border-primary/20 rounded-full animate-float-slow delay-1000 opacity-30"/>

		<div class="container mx-auto px-6 relative z-10">
			<div class="max-w-4xl">
				<div
					class="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 animate-fade-in-up"
				>
					<span class="relative flex h-3 w-3">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"/>
						<span class="relative inline-flex rounded-full h-3 w-3 bg-primary"/>
					</span>
					We are hiring talent
				</div>

				<h1 class="text-4xl md:text-6xl font-black text-white leading-[0.9] mb-6 animate-fade-in-up delay-100 italic uppercase tracking-tighter">
					Gia nhập <br> 
					<span class="text-primary drop-shadow-[0_0_30px_rgba(227,24,55,0.3)] animate-text-shine bg-[linear-gradient(110deg,#e31837,45%,#ff4d6d,55%,#e31837)] bg-[length:200%_100%] bg-clip-text text-transparent">ANHEM MOTOR</span>
				</h1>


				<p class="text-lg text-white/60 mb-10 leading-relaxed max-w-xl animate-fade-in-up delay-200 font-medium">
					Chúng tôi không chỉ bán xe, chúng tôi xây dựng những hành trình đầy cảm hứng. Hãy cùng bứt phá trong môi trường chuyên nghiệp và đầy cơ hội.
				</p>

				<div class="flex flex-wrap gap-4 animate-fade-in-up delay-300">
					<button
						class="group px-8 py-4 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 active:scale-95 shadow-2xl flex items-center gap-3"
						@click="scrollToJobs"
					>
						Vị trí tuyển dụng
						<Icon name="fa6-solid:chevron-right" class="text-[10px] group-hover:translate-x-1 transition-transform" />
					</button>
					<button
						class="px-8 py-4 bg-white/5 backdrop-blur-md text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all transform hover:-translate-y-1 active:scale-95 border border-white/10 flex items-center gap-3"
						@click="scrollToForm"
					>
						Ứng tuyển nhanh
						<Icon name="fa6-solid:bolt" class="text-primary" />
					</button>
				</div>

				
				<div class="grid grid-cols-2 md:grid-cols-3 gap-10 mt-16 pt-10 border-t border-white/5 animate-fade-in-up delay-400">
					<div v-for="stat in [{v:'10+',l:'Năm kinh nghiệm'}, {v:'50+',l:'Cộng sự tài năng'}, {v:'98%',l:'Mức độ hài lòng'}]" :key="stat.l">
						<div class="text-3xl font-black text-white mb-1 italic tracking-tighter">{{ stat.v }}</div>
						<div class="text-white/40 text-[9px] font-black uppercase tracking-widest">{{ stat.l }}</div>
					</div>
				</div>

			</div>
		</div>

		
		<div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20"/>
	</section>
</template>

<script setup>
const emit = defineEmits(['scroll-to-jobs', 'scroll-to-form']);

const scrollToJobs = () => emit('scroll-to-jobs');
const scrollToForm = () => emit('scroll-to-form');
</script>

<style scoped>
@keyframes text-shine {
	to {
		background-position: 200% center;
	}
}
.animate-text-shine {
	animation: text-shine 3s linear infinite;
}

@keyframes float-slow {
	0%, 100% { transform: translate(0, 0) rotate(0deg); }
	33% { transform: translate(20px, -30px) rotate(5deg); }
	66% { transform: translate(-10px, 10px) rotate(-5deg); }
}
.animate-float-slow {
	animation: float-slow 10s ease-in-out infinite;
}

@keyframes slow-zoom {
	from { transform: scale(1.05); }
	to { transform: scale(1.15); }
}

.animate-slow-zoom {
	animation: slow-zoom 20s linear infinite alternate;
}

@keyframes fade-in-up {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-in-up {
	animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
</style>

