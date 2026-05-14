<template>
  <section class="py-32 px-4 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] relative z-10">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-24 items-center">
        <div class="space-y-12 reveal reveal-left">
          <div>
            <div class="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-blue-500/20 animate-pulse">
              Enterprise Solutions
            </div>
            <h2 class="text-5xl md:text-6xl font-bold tracking-tight uppercase leading-tight">Quản lý & <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Giao dịch Thông minh</span></h2>
          </div>
          <p class="text-gray-400 text-lg leading-relaxed italic border-l-4 border-blue-600/50 pl-6">
            "Chúng tôi không chỉ cung cấp xe, chúng tôi cung cấp giải pháp vận hành doanh nghiệp toàn diện. Hệ thống quản trị tập trung giúp tối ưu hóa mọi quy trình kinh doanh."
          </p>
          
          <div class="grid sm:grid-cols-2 gap-8">
            <div v-for="item in features" :key="item.title" class="space-y-2 group cursor-default">
              <div class="text-blue-500 font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                <Icon name="lucide:check-square" class="text-xl" /> {{ item.title }}
              </div>
              <p class="text-gray-500 text-sm leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </div>
        
        <div class="relative reveal reveal-right group">
          <div class="absolute -inset-10 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
          <div class="relative bg-black/40 backdrop-blur-2xl p-4 rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.1)] transform hover:perspective-1000 hover:rotate-y-12 transition-all duration-1000 group-hover:scale-105">
            <img src="/images/technology/erp_dashboard.png" alt="Management Dashboard" class="rounded-2xl w-full" />
            <div class="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent pointer-events-none"></div>
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
