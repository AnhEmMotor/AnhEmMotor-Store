<template>
  <section class="relative h-[70vh] flex items-center justify-center overflow-hidden z-10">
    <div class="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-[#0a0a0a] z-10"></div>
    <div class="absolute inset-0 opacity-70 bg-[url('/images/technology/hero_v3.png')] bg-cover bg-center animate-slow-zoom"></div>
    
    <div class="relative z-20 text-center px-4 max-w-6xl mx-auto">
      <div class="inline-block px-5 py-1.5 rounded-full border border-red-600/30 bg-red-600/10 text-red-500 font-bold tracking-[0.4em] uppercase mb-6 animate-fade-in-up text-xs">
        Digital Evolution
      </div>
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter uppercase animate-text-glow leading-tight">
        Hệ sinh thái <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Thông minh</span>
      </h1>
      <p class="text-base md:text-lg text-gray-400 max-w-xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
        Vượt xa một chiếc xe máy, chúng tôi xây dựng một nền tảng công nghệ toàn diện kết nối con người, cỗ máy và dịch vụ.
      </p>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
      <span class="text-[10px] uppercase tracking-[0.3em] font-bold">Discover</span>
      <div class="w-px h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
@keyframes slow-zoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.15); }
}

.animate-slow-zoom {
  animation: slow-zoom 30s infinite alternate ease-in-out;
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fade-in-up 1.5s forwards cubic-bezier(0.19, 1, 0.22, 1);
}

@keyframes text-glow {
  0%, 100% { text-shadow: 0 0 20px rgba(220,38,38,0); }
  50% { text-shadow: 0 0 30px rgba(220,38,38,0.3); }
}

.animate-text-glow {
  animation: text-glow 4s infinite ease-in-out;
}

.delay-200 { animation-delay: 0.2s; }
</style>
