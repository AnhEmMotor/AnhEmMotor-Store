<template>
  <section class="py-32 px-4 bg-black relative z-10">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-24 reveal reveal-up">
        <h2 class="text-5xl font-bold mb-6 uppercase tracking-tight">Trải nghiệm tương tác <span class="text-red-600 font-black">SỐ</span></h2>
        <p class="text-gray-500 text-lg max-w-2xl mx-auto">"Khám phá thế giới xe máy qua lăng kính công nghệ hiện đại nhất."</p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(card, index) in cards" :key="card.title" 
             class="group bg-[#111] rounded-[2rem] overflow-hidden border border-white/5 hover:border-red-600/40 transition-all duration-500 hover:-translate-y-4 shadow-xl reveal reveal-up"
             :style="`transition-delay: ${index * 150}ms`"
        >
          <div class="h-48 overflow-hidden relative">
            <img :src="card.image" :alt="card.title" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-125 group-hover:scale-100" />
            <div class="absolute inset-0 bg-black/60 group-hover:bg-black/10 transition-all duration-700"></div>
            <div class="absolute top-6 right-6 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 shadow-lg">
              <Icon :name="card.icon" class="text-xl" />
            </div>
          </div>
          <div class="p-8 relative">
            <div class="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Icon :name="card.icon" class="text-6xl" />
            </div>
            <h3 class="text-xl font-bold mb-4 group-hover:text-red-500 transition-colors uppercase tracking-tight">{{ card.title }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed mb-6 h-20 overflow-hidden">{{ card.description }}</p>
            <button class="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all opacity-40 group-hover:opacity-100 group-hover:text-red-500">
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
