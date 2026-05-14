<template>
	<section class="py-20 bg-gray-50/30">
		<div class="container mx-auto px-6">
			<div class="text-center max-w-3xl mx-auto mb-16">
				<div class="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-4">
					<span class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
					<span class="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Cơ hội nghề nghiệp</span>
				</div>
				<h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-4 italic uppercase tracking-tighter">Vị trí <span class="text-primary">Tuyển dụng</span></h2>
				<p class="text-gray-500 font-medium text-base">Tìm thấy công việc phù hợp với đam mê của bạn và gia nhập đại gia đình AnhEm Motor ngay hôm nay.</p>
			</div>


			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<div v-for="(job, index) in jobs" :key="job.id" 
					class="reveal reveal-up bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full relative overflow-hidden"
					:style="{ transitionDelay: `${index * 150}ms` }"
				>
					<!-- Top Accent -->

					<div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>

					<div class="flex justify-between items-start mb-8">
						<div class="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
							<Icon :name="job.icon.replace('i-lucide-', 'fa6-solid:')" class="text-2xl" />
						</div>
						<div class="px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest">
							{{ job.type }}
						</div>
					</div>

					<h3 class="text-2xl font-black text-gray-900 mb-3 group-hover:text-primary transition-colors italic uppercase tracking-tight leading-tight">{{ job.title }}</h3>
					
					<div class="flex items-center gap-2 text-primary font-black text-xl mb-8 italic">
						{{ job.salary }}
					</div>

					<div class="space-y-4 mb-10 flex-grow">
						<div class="flex items-center gap-3 text-gray-400 text-sm font-bold uppercase tracking-wider">
							<Icon name="fa6-solid:location-dot" class="text-primary text-xs" />
							{{ job.location }}
						</div>
						<div class="flex items-center gap-3 text-gray-400 text-sm font-bold uppercase tracking-wider">
							<Icon name="fa6-solid:briefcase" class="text-primary text-xs" />
							{{ job.experience }}
						</div>
					</div>

					<div class="flex gap-4">
						<button @click="selectedJob = job" class="flex-1 px-6 py-4 bg-gray-50 text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
							Chi tiết
						</button>
						<button @click="applyForJob(job)" class="flex-1 px-6 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95">
							Ứng tuyển
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Job Detail Modal -->
		<Teleport to="body">
			<Transition
				enter-active-class="transition duration-500 ease-out"
				enter-from-class="opacity-0"
				enter-to-class="opacity-100"
				leave-active-class="transition duration-300 ease-in"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<div v-if="isModalOpen" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-[#0a0a0a]/80 backdrop-blur-md">
					<div 
						class="bg-white w-full max-w-3xl rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-slide-up relative"
						@click.stop
					>
						<!-- Modal Header Image/Pattern -->
						<div class="h-32 bg-gray-900 relative overflow-hidden">
							<div class="absolute inset-0 opacity-20" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E');"></div>
							<div class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-white via-white/50 to-transparent"></div>
						</div>

						<div v-if="selectedJob" class="px-10 pb-10 relative mt-[-60px]">
							<div class="flex justify-between items-start mb-10">
								<div class="flex items-center gap-6">
									<div class="w-20 h-20 rounded-3xl bg-white shadow-2xl flex items-center justify-center text-primary border border-gray-100">
										<Icon :name="selectedJob.icon.replace('i-lucide-', 'fa6-solid:')" class="text-4xl" />
									</div>
									<div class="pt-10">
										<h2 class="text-3xl font-black text-gray-900 italic uppercase tracking-tighter leading-tight">{{ selectedJob.title }}</h2>
										<div class="flex items-center gap-4 mt-2">
											<span class="text-primary font-black italic">{{ selectedJob.salary }}</span>
											<span class="text-gray-200">|</span>
											<span class="text-gray-400 font-black text-[10px] uppercase tracking-widest">{{ selectedJob.type }}</span>
										</div>
									</div>
								</div>
								<button @click="selectedJob = null" class="mt-12 p-3 bg-gray-50 hover:bg-primary hover:text-white rounded-2xl transition-all text-gray-400">
									<Icon name="fa6-solid:xmark" class="text-lg" />
								</button>
							</div>

							<div class="space-y-10 max-h-[50vh] overflow-y-auto pr-6 custom-scrollbar scroll-smooth">
								<div v-for="(section, sIndex) in selectedJob.details" :key="sIndex" class="space-y-6">
									<h3 class="text-xl font-black text-gray-900 italic uppercase tracking-tight flex items-center gap-4">
										<span class="w-10 h-[2px] bg-primary rounded-full"></span>
										{{ section.title }}
									</h3>
									<ul class="grid grid-cols-1 gap-4 pl-14">
										<li v-for="(point, pIndex) in section.points" :key="pIndex" class="flex items-start gap-4 text-gray-500 font-medium leading-relaxed group/item">
											<div class="mt-1.5 w-2 h-2 rounded-full bg-primary/20 group-hover/item:bg-primary transition-colors flex-shrink-0"></div>
											{{ point }}
										</li>
									</ul>
								</div>
							</div>

							<div class="mt-12 pt-8 border-t border-gray-100 flex gap-6">
								<button @click="selectedJob = null" class="flex-1 py-5 bg-gray-50 text-gray-900 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-all">
									Quay lại
								</button>
								<button @click="applyFromModal" class="flex-1 py-5 bg-primary text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(227,24,55,0.25)] transition-all flex items-center justify-center gap-3">
									Nộp hồ sơ ngay
									<Icon name="fa6-solid:paper-plane" class="text-xs" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</Transition>
		</Teleport>
	</section>
</template>

<script setup>
const { jobs, fetchJobs } = useRecruitment();
const selectedJob = ref(null);
const emit = defineEmits(['apply-job']);

onMounted(() => {
	fetchJobs();
});

const isModalOpen = computed({
	get: () => !!selectedJob.value,
	set: (val) => {
		if (!val) selectedJob.value = null;
	}
});

const applyForJob = (job) => {
	emit('apply-job', job.title);
};

const applyFromModal = () => {
	const jobTitle = selectedJob.value.title;
	selectedJob.value = null;
	emit('apply-job', jobTitle);
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
	width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
	background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
	background: #eee;
	border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: #e31837;
}

@keyframes slide-up {
	from { opacity: 0; transform: translateY(40px); }
	to { opacity: 1; transform: translateY(0); }
}
.animate-slide-up {
	animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
