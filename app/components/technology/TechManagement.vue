<template>
  <section class="py-16 sm:py-20 px-4 bg-[#0a0a0a] relative z-10 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-black via-[#120708] to-[#0a0a0a] pointer-events-none"/>
    <div class="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_20%_30%,rgba(220,38,38,0.16),transparent_45%)] pointer-events-none"/>
    <div class="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_80%_50%,rgba(185,18,42,0.18),transparent_42%)] pointer-events-none"/>
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div class="space-y-8 reveal reveal-left">
          <div>
            <div class="inline-block px-3 py-1 rounded-full bg-red-600/10 text-red-500 text-[9px] font-black uppercase tracking-[0.3em] mb-4 border border-red-600/30 shadow-[0_0_30px_rgba(220,38,38,0.12)] animate-pulse">
              Enterprise Solutions
            </div>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase leading-tight text-white">Quản lý & <br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-white to-red-100">Giao dịch Thông minh</span></h2>
          </div>
          <p class="text-gray-400 text-base leading-relaxed italic border-l-4 border-red-600 pl-4">
            "Chúng tôi không chỉ cung cấp xe, chúng tôi cung cấp giải pháp vận hành doanh nghiệp toàn diện. Hệ thống quản trị tập trung giúp tối ưu hóa mọi quy trình kinh doanh."
          </p>
          
          <div class="grid sm:grid-cols-2 gap-3 sm:p-6">
            <div v-for="item in features" :key="item.title" class="space-y-1 group cursor-default">
              <div class="text-white font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform text-sm group-hover:text-red-500">
                <Icon :name="item.icon" class="text-lg text-red-500 group-hover:text-red-400 transition-colors" /> {{ item.title }}
              </div>
              <p class="text-gray-400 text-[10px] sm:text-xs leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </div>
        
        <div class="relative reveal reveal-right group">
          <div class="absolute -inset-10 bg-red-600/15 rounded-full blur-[80px] animate-pulse"/>
          <div class="relative bg-black/60 backdrop-blur-2xl p-3 sm:p-4 rounded-xl sm:rounded-[1.5rem] border border-red-600/20 shadow-[0_0_60px_rgba(220,38,38,0.22)] transform hover:perspective-1000 hover:rotate-y-12 transition-all duration-1000 group-hover:scale-105">
            <img src="/images/technology/erp_dashboard.png" alt="Management Dashboard" class="rounded-xl w-full" >
            <div class="absolute inset-0 bg-gradient-to-tr from-red-600/20 via-transparent to-black/10 pointer-events-none"/>
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
.perspective-1000 { perspective: 1000px; }
.rotate-y-12 { transform: rotateY(-12deg); }
</style>
