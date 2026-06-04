<template>
  <section class="py-12 sm:py-16 px-3 sm:px-4 bg-black relative z-10">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-10 sm:mb-16 reveal reveal-up">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4 uppercase tracking-tight">Trải nghiệm tương tác <span class="text-red-600 font-black">SỐ</span></h2>
        <p class="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">"Khám phá thế giới xe máy qua lăng kính công nghệ hiện đại nhất."</p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 sm:p-6">
        <div
v-for="(card, index) in cards" :key="card.title" 
             class="group bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-red-600/40 transition-all duration-500 hover:-translate-y-2 shadow-xl reveal reveal-up"
             :style="`transition-delay: ${index * 150}ms`"
        >
          <div class="h-36 sm:h-40 overflow-hidden relative">
            <img :src="card.image" :alt="card.title" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-125 group-hover:scale-100" >
            <div class="absolute inset-0 bg-black/60 group-hover:bg-black/10 transition-all duration-700"/>
            <div class="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-8 rounded-full bg-red-600 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 shadow-lg">
              <Icon :name="card.icon" class="text-base" />
            </div>
          </div>
          <div class="p-4 sm:p-6 relative">
            <div class="absolute top-0 right-0 p-3 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Icon :name="card.icon" class="text-3xl sm:text-5xl" />
            </div>
            <h3 class="text-base sm:text-base font-bold mb-2 sm:mb-3 group-hover:text-red-500 transition-colors uppercase tracking-tight">{{ card.title }}</h3>
            <p class="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 h-16 overflow-hidden">{{ card.description }}</p>
            <button class="text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all opacity-40 group-hover:opacity-100 group-hover:text-red-500">
              Tìm hiểu thêm <Icon name="lucide:arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  cards: {
    type: Array,
    required: true
  }
})
</script>
