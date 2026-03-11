<template>
  <aside class="space-y-6">
    <div>
      <h2 class="text-xl font-bold mb-4 border-l-4 border-primary-red pl-3">
        {{ title }}
      </h2>
      
      <div class="space-y-4">
        <router-link
          v-for="newsItem in relatedNews"
          :key="newsItem.id"
          :to="`/news/${newsItem.slug}`"
          class="block border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
        >
          <img 
            :src="newsItem.image" 
            :alt="newsItem.title"
            class="w-full h-32 object-cover transform group-hover:scale-105 transition-transform duration-500"
          >
          <div class="p-3">
            <h3 class="font-bold text-sm text-dark-text group-hover:text-primary-red transition-colors duration-300 line-clamp-2">
              {{ newsItem.title }}
            </h3>
          </div>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'NewsSidebar',
  props: {
    relatedNews: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: 'Tin nổi bật'
    }
  }
};
</script>