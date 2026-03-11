<template>
  <router-link
    :to="`/news/${news.slug}`"
    class="block bg-white rounded-xl overflow-hidden shadow-2xl border-t-4 border-primary-red transform hover:-translate-y-1 hover:shadow-3xl transition-all duration-300 group"
  >
    <div class="overflow-hidden">
      <img 
        :src="news.image" 
        :alt="news.title"
        class="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
      >
    </div>
    <div class="p-6">
      <span class="text-sm text-gray-500 font-medium">{{ news.date }}</span>
      <h3 class="text-xl font-bold text-dark-text mt-2 mb-3 leading-snug group-hover:text-primary-red transition-colors duration-300">
        {{ news.title }}
      </h3>
      <p class="text-gray-600 text-base line-clamp-3">
        {{ news.excerpt }}
      </p>
      <span class="text-primary-red font-bold mt-4 inline-block text-sm hover:underline">
        Đọc thêm <i class="fas fa-arrow-right ml-1 text-xs"></i>
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'NewsCard',
  props: {
    news: {
      type: Object,
      required: true
    }
  }
};
</script>