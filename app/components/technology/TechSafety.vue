<template>
  <section class="py-16 sm:py-20 px-4 relative overflow-hidden z-10">
    <div class="absolute -right-1/4 top-1/4 w-1/2 h-1/2 bg-red-600/5 rounded-full blur-[100px]"/>
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div class="space-y-6 sm:space-y-8 reveal reveal-left">
          <div>
            <div class="text-red-500 font-black tracking-widest text-[9px] sm:text-[10px] uppercase mb-3 italic underline decoration-1 underline-offset-8">Guardian Technology</div>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight uppercase">An toàn <br> <span class="text-white">Tuyệt đối</span></h2>
          </div>

          <div class="space-y-6">
            <div v-for="item in features" :key="item.title" class="relative pl-9 sm:pl-10 group hover:translate-x-2 transition-transform">
              <div class="absolute left-0 top-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-red-600/30 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:rotate-[360deg] duration-700">
                <Icon :name="item.icon" class="text-xs sm:text-sm" />
              </div>
              <h3 class="text-lg sm:text-xl font-bold mb-2 transition-colors group-hover:text-red-500">{{ item.title }}</h3>
              <p class="text-gray-400 text-xs sm:text-sm leading-relaxed">{{ item.description }}</p>
            </div>
          </div>
        </div>
        
        <div class="relative group reveal reveal-right">
          <div class="absolute -inset-4 bg-white/5 rounded-[2rem] group-hover:bg-red-600/10 transition-all duration-700"/>
          <div class="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl group-hover:shadow-red-600/20 transition-all duration-700">
            <img src="/images/technology/safety_action.png" alt="Safety in Action" class="w-full transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-1000" >
            <!-- Scanner Effect -->
            <div class="absolute top-0 left-0 w-full h-[2px] bg-red-600 shadow-[0_0_15px_rgba(220,38,38,1)] animate-scanner opacity-0 group-hover:opacity-100"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
@keyframes scanner {
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.animate-scanner {
  animation: scanner 3s infinite linear;
}
</style>
