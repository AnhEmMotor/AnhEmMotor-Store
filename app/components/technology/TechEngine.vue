<template>
  <section class="py-32 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#111] z-10 relative">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-24 reveal reveal-up">
        <h2 class="text-5xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase">Sức mạnh <span class="text-red-600">Kỹ Thuật</span></h2>
        <div class="w-24 h-1 bg-red-600 mx-auto transform hover:scale-x-150 transition-transform duration-500"></div>
      </div>

      <div class="grid lg:grid-cols-5 gap-16 items-center">
        <div class="lg:col-span-2 space-y-8 reveal reveal-left">
          <div v-for="tech in techs" :key="tech.name" class="p-8 rounded-3xl bg-black border border-white/5 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] transition-all">
            <div class="absolute top-0 left-0 w-1 h-full bg-red-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500"></div>
            <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 class="text-3xl font-black text-red-600 mb-4">{{ tech.name }}</h3>
            <p class="text-gray-400 leading-relaxed">{{ tech.detail }}</p>
          </div>
        </div>

        <div class="lg:col-span-3 relative group reveal reveal-right">
          <div class="absolute inset-0 bg-red-600/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img src="/images/technology/engine_xray.png" alt="Engine Specs" class="w-full rounded-3xl shadow-[0_0_80px_rgba(220,38,38,0.15)] transition-all duration-1000 group-hover:scale-105" />
          
          <!-- Dynamic Hotspots -->
          <div class="absolute top-[20%] left-[30%] group/hotspot">
            <div class="w-6 h-6 bg-red-600 rounded-full border-4 border-white/20 animate-ping-slow"></div>
            <div class="absolute top-8 left-0 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 text-xs uppercase font-bold whitespace-nowrap opacity-0 group-hover/hotspot:opacity-100 transform translate-y-2 group-hover/hotspot:translate-y-0 transition-all shadow-2xl">
              <span class="text-red-500">Core Feature:</span> <br/> High-Pressure Injector
            </div>
          </div>
          <div class="absolute bottom-[30%] right-[20%] group/hotspot delay-500">
            <div class="w-6 h-6 bg-blue-600 rounded-full border-4 border-white/20 animate-ping-slow"></div>
            <div class="absolute top-8 left-0 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 text-xs uppercase font-bold whitespace-nowrap opacity-0 group-hover/hotspot:opacity-100 transform translate-y-2 group-hover/hotspot:translate-y-0 transition-all shadow-2xl">
              <span class="text-blue-500">Core Feature:</span> <br/> Precision Piston
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  techs: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
@keyframes ping-slow {
  0% { transform: scale(1); opacity: 1; }
  70%, 100% { transform: scale(2.5); opacity: 0; }
}

.animate-ping-slow {
  animation: ping-slow 3s infinite cubic-bezier(0, 0, 0.2, 1);
}

.delay-500 { animation-delay: 0.5s; }
</style>
