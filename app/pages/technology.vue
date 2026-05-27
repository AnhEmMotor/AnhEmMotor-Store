<script setup>
import { onMounted, ref } from 'vue'
import { technologyService } from '~/core/application/services/technology.service'

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'Công nghệ tiên phong | AnhEm Motor',
  description: 'Khám phá hệ sinh thái kết nối đa nền tảng, hiệu suất động cơ vượt trội và giải pháp quản lý kinh doanh thông minh tại AnhEm Motor.'
})

// State
const connectivityFeatures = ref([])
const engineTechs = ref([])
const safetyFeatures = ref([])
const interactionCards = ref([])
const managementFeatures = ref([])
const isLoading = ref(true)

// Fetch Data via Service (Clean Architecture)
const fetchData = async () => {
  try {
    isLoading.value = true
    const [connectivity, engines, safety, cards, management] = await Promise.all([
      technologyService.getConnectivityFeatures(),
      technologyService.getEngineTechs(),
      technologyService.getSafetyFeatures(),
      technologyService.getInteractionCards(),
      technologyService.getManagementFeatures()
    ])
    
    connectivityFeatures.value = connectivity
    engineTechs.value = engines
    safetyFeatures.value = safety
    interactionCards.value = cards
    managementFeatures.value = management
  } catch (error) {
    console.error('Error fetching technology data:', error)
  } finally {
    isLoading.value = false
  }
}

// Scroll Reveal Logic
onMounted(async () => {
  await fetchData()
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible')
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <div class="tech-page bg-[#0a0a0a] text-white overflow-hidden relative">
    <!-- Ambient Background Elements -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px] animate-pulse"/>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px] animate-pulse delay-1000"/>
    </div>

    <!-- Components composing the page -->
    <TechnologyTechHero />
    
    <div v-if="!isLoading">
      <TechnologyTechConnectivity :features="connectivityFeatures" />
      <TechnologyTechEngine :techs="engineTechs" />
      <TechnologyTechSafety :features="safetyFeatures" />
      <TechnologyTechInteraction :cards="interactionCards" />
      <TechnologyTechManagement :features="managementFeatures" />
    </div>
    
    <!-- Loading State -->
    <div v-else class="h-[50vh] flex items-center justify-center">
      <div class="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"/>
    </div>

    <!-- Final Call to Action -->
    <section class="py-24 px-4 relative overflow-hidden text-center border-t border-white/5 z-10">
      <div class="absolute inset-0 bg-[#0a0a0a] z-0"/>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] z-10 animate-pulse"/>
      
      <div class="relative z-20 max-w-4xl mx-auto reveal reveal-up">
        <h2 class="text-4xl md:text-5xl font-black mb-8 uppercase italic tracking-tighter leading-tight">GIA NHẬP CỘNG ĐỒNG <br> <span class="text-red-600 underline decoration-white/20 underline-offset-8">ANHEM MOTOR</span></h2>
        <p class="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">Trải nghiệm dịch vụ di chuyển thông minh và các đặc quyền số độc duy nhất chỉ dành cho thành viên của chúng tôi.</p>
        <div class="flex flex-wrap justify-center gap-6">
          <NuxtLink to="/support" class="px-10 py-5 bg-red-600 text-white font-black rounded-xl hover:scale-110 hover:bg-red-700 transition-all flex items-center gap-4 shadow-[0_20px_50px_rgba(220,38,38,0.4)] group active:scale-95">
            <Icon name="lucide:smartphone" class="text-xl group-hover:animate-bounce" /> TẢI APP NGAY
          </NuxtLink>
          <NuxtLink to="/about" class="px-10 py-5 bg-white/5 backdrop-blur-md text-white font-black rounded-xl hover:bg-white/10 transition-all border border-white/10 flex items-center gap-4 hover:border-red-600/50 shadow-xl">
             HỆ THỐNG SHOWROOM <Icon name="lucide:map-pinned" class="group-hover:translate-y-[-4px] transition-transform" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.reveal {
  opacity: 0;
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-up { transform: translateY(60px); }
.reveal-left { transform: translateX(-60px); }
.reveal-right { transform: translateX(60px); }
.reveal-visible {
  opacity: 1;
  transform: translate(0, 0);
}
.tech-page::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.05;
  pointer-events: none;
  z-index: 50;
}
@keyframes ping-slow {
  0% { transform: scale(1); opacity: 1; }
  70%, 100% { transform: scale(2.5); opacity: 0; }
}
.animate-ping-slow {
  animation: ping-slow 3s infinite cubic-bezier(0, 0, 0.2, 1);
}
.perspective-1000 {
  perspective: 1000px;
}
.rotate-y-12 {
  transform: rotateY(-12deg);
}
</style>

<style scoped>
.tech-page {
  font-family: 'Manrope', sans-serif;
}
@keyframes slow-zoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}
.animate-slow-zoom {
  animation: slow-zoom 20s infinite alternate ease-in-out;
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 1s forwards cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
