<template>
  <section class="py-32 px-4 relative border-t border-white/5 z-10">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-24 items-center">
        <div class="order-2 lg:order-1 relative group reveal reveal-left">
          <div class="absolute -inset-10 bg-red-600/10 rounded-full blur-[120px] group-hover:bg-red-600/20 transition-all duration-700"></div>
          <div class="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl z-10">
            <img src="/images/technology/connectivity_hub_v2.png" alt="Multi-device Connection" class="w-full transform group-hover:scale-110 transition-transform duration-1000" />
            <div class="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
          
          <!-- Tech Badges -->
          <div class="absolute top-10 -left-10 z-20 bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl hidden xl:block hover:-translate-y-2 transition-transform cursor-default">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                <Icon name="lucide:watch" />
              </div>
              <div>
                <p class="text-xs text-gray-400 uppercase tracking-widest">Smartwatch Link</p>
                <p class="text-sm font-bold text-blue-400">Connected</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="order-1 lg:order-2 space-y-12 reveal reveal-right">
          <div>
            <h2 class="text-5xl md:text-6xl font-bold mb-8 tracking-tight uppercase">KẾT NỐI <br/> <span class="text-red-600 relative inline-block">ĐA NỀN TẢNG<span class="absolute bottom-0 left-0 w-full h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span></span></h2>
            <p class="text-gray-400 text-lg leading-relaxed italic">
              "Chiếc xe của bạn giờ đây hiện diện trên mọi thiết bị. Từ Smartphone, Smartwatch đến Dashboard tích hợp - tất cả đều đồng bộ dữ liệu theo thời gian thực."
            </p>
          </div>
          
          <div class="space-y-8">
            <div v-for="(item, index) in features" :key="item.title" 
                 class="group flex gap-8 p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-red-600/20 hover:bg-white/10 transition-all duration-500 hover:translate-x-4"
                 :style="`transition-delay: ${index * 100}ms`"
            >
              <div class="flex-shrink-0 w-16 h-16 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                <Icon :name="item.icon" class="text-3xl" />
              </div>
              <div>
                <h3 class="text-2xl font-bold mb-3 group-hover:text-red-500 transition-colors">{{ item.title }}</h3>
                <p class="text-gray-400 text-base leading-relaxed">{{ item.description }}</p>
              </div>
            </div>
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
