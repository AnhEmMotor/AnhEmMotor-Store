<template>
  <section class="py-16 sm:py-20 px-4 relative border-t border-white/5 z-10">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div class="order-2 lg:order-1 relative group reveal reveal-left">
          <div class="absolute -inset-4 lg:-inset-10 bg-red-600/10 rounded-full blur-[80px] group-hover:bg-red-600/20 transition-all duration-700"></div>
          <div class="relative overflow-hidden rounded-2xl lg:rounded-[2rem] border border-white/10 shadow-2xl z-10">
            <img src="/images/technology/connectivity_hub_v2.png" alt="Multi-device Connection" class="w-full transform group-hover:scale-110 transition-transform duration-1000" />
            <div class="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
          
          <!-- Tech Badges -->
          <div class="absolute top-8 -left-8 z-20 bg-black/60 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-2xl hidden xl:block hover:-translate-y-2 transition-transform cursor-default">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                <Icon name="lucide:watch" />
              </div>
              <div>
                <p class="text-[10px] text-gray-400 uppercase tracking-widest">Smartwatch Link</p>
                <p class="text-xs font-bold text-blue-400">Connected</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="order-1 lg:order-2 space-y-8 reveal reveal-right">
          <div>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight uppercase">KẾT NỐI <br/> <span class="text-red-600 relative inline-block">ĐA NỀN TẢNG<span class="absolute bottom-0 left-0 w-full h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span></span></h2>
            <p class="text-gray-400 text-sm sm:text-base leading-relaxed italic">
              "Chiếc xe của bạn giờ đây hiện diện trên mọi thiết bị. Từ Smartphone, Smartwatch đến Dashboard tích hợp - tất cả đều đồng bộ dữ liệu theo thời gian thực."
            </p>
          </div>
          
          <div class="space-y-6">
            <div v-for="(item, index) in features" :key="item.title" 
                 class="group flex gap-4 sm:gap-6 p-4 sm:p-6 sm:rounded-xl lg:rounded-2xl bg-white/5 border border-white/5 hover:border-red-600/20 hover:bg-white/10 transition-all duration-500 hover:translate-x-4"
                 :style="`transition-delay: ${index * 100}ms`"
            >
              <div class="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-red-600/10 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                <Icon :name="item.icon" class="text-xl sm:text-2xl" />
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-bold mb-1 sm:mb-2 group-hover:text-red-500 transition-colors">{{ item.title }}</h3>
                <p class="text-gray-400 text-xs sm:text-sm leading-relaxed">{{ item.description }}</p>
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
