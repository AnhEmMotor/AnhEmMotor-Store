<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const blocks = computed(() => {
  if (!props.content) return []
  const raw = props.content.trim()
  
  // Kiểm tra xem có phải là JSON Array không
  if (raw.startsWith('[') && raw.endsWith(']')) {
    try {
      return JSON.parse(raw)
    } catch (e) {
      console.error("Failed to parse blocks JSON", e)
      return [{ type: 'text', data: { text: raw } }]
    }
  }
  
  // Nếu là văn bản thuần túy (legacy)
  return [{ type: 'text', data: { text: raw } }]
})
</script>

<template>
  <div class="news-content-wrapper">
    <div v-for="(block, index) in blocks" :key="index" class="mb-8 last:mb-0">
      <!-- HEADING -->
      <template v-if="block.type === 'heading'">
        <h2 v-if="block.data.level === 2" class="text-2xl md:text-3xl font-black text-gray-900 mt-12 mb-6 uppercase tracking-tight leading-tight">
          {{ block.data.text }}
        </h2>
        <h3 v-else class="text-xl md:text-2xl font-bold text-gray-800 mt-8 mb-4 leading-snug">
          {{ block.data.text }}
        </h3>
      </template>

      <!-- TEXT -->
      <template v-else-if="block.type === 'text'">
        <div class="text-[#393939] leading-[1.8] text-[17px] md:text-[18px] whitespace-pre-wrap text-justify">
          {{ block.data.text }}
        </div>
      </template>

      <!-- IMAGE -->
      <template v-else-if="block.type === 'image'">
        <figure class="my-10">
          <div class="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <img :src="block.data.url" :alt="block.data.alt || block.data.caption" class="w-full h-auto object-cover" />
          </div>
          <figcaption v-if="block.data.caption" class="text-center mt-4 text-sm font-medium text-gray-500 italic">
            — {{ block.data.caption }}
          </figcaption>
        </figure>
      </template>

      <!-- VIDEO -->
      <template v-else-if="block.type === 'video'">
        <div class="my-10 aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-black">
          <iframe 
            v-if="block.data.url && (block.data.url.includes('youtube.com') || block.data.url.includes('youtu.be'))"
            :src="block.data.url.replace('watch?v=', 'embed/')" 
            class="w-full h-full"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
          <div v-else class="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center">
             <Icon name="fa6-solid:video" class="text-4xl mb-4 opacity-20" />
             <p class="text-sm font-bold opacity-60">Liên kết video: {{ block.data.url }}</p>
          </div>
        </div>
      </template>

      <!-- PRODUCT CARD -->
      <template v-else-if="block.type === 'product'">
        <div class="my-12 p-8 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-black text-white shadow-xl relative overflow-hidden group border border-white/5">
          <div class="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
             <Icon name="fa6-solid:motorcycle" class="text-[12rem]" />
          </div>
          <div class="relative z-10">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-1 h-4 bg-red-600"></div>
              <span class="text-[11px] font-black uppercase tracking-widest text-red-500">Sản phẩm nổi bật</span>
            </div>
            <h4 class="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-3">{{ block.data.name }}</h4>
            <p class="text-gray-400 text-sm md:text-base mb-8 max-w-xl leading-relaxed">{{ block.data.description || 'Sở hữu ngay dòng xe mơ ước với chính sách trả góp ưu đãi và quà tặng hấp dẫn từ AnhEmMotor.' }}</p>
            <div class="flex flex-wrap items-center gap-8">
              <div v-if="block.data.price" class="flex flex-col">
                <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Giá từ</span>
                <div class="text-2xl font-black text-red-500 italic">{{ block.data.price }}</div>
              </div>
              <button class="px-8 py-3.5 bg-red-600 text-white font-black text-[11px] uppercase tracking-[0.15em] rounded-full hover:bg-white hover:text-black transition-all shadow-xl active:scale-95">
                 Khám phá chi tiết
              </button>
            </div>
          </div>
        </div>
      </template>

      <!-- AI ASSISTANT -->
      <template v-else-if="block.type === 'ai'">
        <div class="my-8 p-6 rounded-2xl bg-slate-50 border-l-4 border-blue-500 flex gap-5 shadow-sm">
          <div class="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-100">
             <Icon name="fa6-solid:bolt-lightning" class="text-white text-lg" />
          </div>
          <div class="flex-1 pt-1">
            <span class="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2">Gợi ý thông minh từ AI</span>
            <p class="text-[15px] font-bold text-slate-800 leading-relaxed italic">"{{ block.data.text }}"</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.news-content-wrapper {
  font-family: "Be Vietnam Pro", sans-serif;
  color: #393939;
}
</style>
