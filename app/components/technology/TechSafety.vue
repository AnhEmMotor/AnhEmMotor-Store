<template>
  <section class="py-32 px-4 relative overflow-hidden z-10">
    <div class="absolute -right-1/4 top-1/4 w-1/2 h-1/2 bg-red-600/5 rounded-full blur-[150px]"></div>
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-24 items-center">
        <div class="space-y-12 reveal reveal-left">
          <div>
            <div class="text-red-500 font-black tracking-widest text-sm uppercase mb-4 italic underline decoration-2 underline-offset-8">Guardian Technology</div>
            <h2 class="text-5xl md:text-6xl font-bold tracking-tight leading-tight uppercase">An toàn <br/> <span class="text-white">Tuyệt đối</span></h2>
          </div>
          
          <div class="space-y-10">
            <div v-for="item in features" :key="item.title" class="relative pl-12 group hover:translate-x-2 transition-transform">
              <div class="absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-red-600/30 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:rotate-[360deg] duration-700">
                <Icon :name="item.icon" />
              </div>
              <h3 class="text-2xl font-bold mb-3 transition-colors group-hover:text-red-500">{{ item.title }}</h3>
              <p class="text-gray-400 text-base leading-relaxed">{{ item.description }}</p>
            </div>
          </div>
        </div>
        
        <div class="relative group reveal reveal-right">
          <div class="absolute -inset-4 bg-white/5 rounded-[3rem] group-hover:bg-red-600/10 transition-all duration-700"></div>
          <div class="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl group-hover:shadow-red-600/20 transition-all duration-700">
            <img src="/images/technology/safety_action.png" alt="Safety in Action" class="w-full transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-1000" />
            <!-- Scanner Effect -->
            <div class="absolute top-0 left-0 w-full h-[2px] bg-red-600 shadow-[0_0_15px_rgba(220,38,38,1)] animate-scanner opacity-0 group-hover:opacity-100"></div>
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
