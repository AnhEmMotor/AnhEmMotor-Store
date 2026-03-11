<template>
  <router-link
    :to="`/news/${news.slug}`"
    class="block flex flex-col md:flex-row bg-white rounded-xl shadow-lg border border-gray-100 transform hover:scale-[1.01] hover:shadow-xl transition-all duration-300 group"
  >
    <img 
      :src="news.image" 
      :alt="news.title"
      class="w-full md:w-1/3 lg:w-1/4 h-48 md:h-56 object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none transform group-hover:scale-105 transition-transform duration-500"
    >
    <div class="p-4 md:p-6 flex-1">
      <div class="flex items-center space-x-3 text-sm mb-3">
        <span class="text-primary-red font-bold uppercase">{{ news.category }}</span>
        <span class="text-gray-400">|</span>
        <span class="text-gray-500">
          <i class="far fa-clock mr-1"></i> {{ news.date }}
        </span>
      </div>
      <h3 class="text-xl md:text-2xl font-extrabold text-dark-text group-hover:text-primary-red transition-colors duration-300 mb-2">
        {{ news.title }}
      </h3>
      <p class="text-gray-700 text-sm md:text-base line-clamp-3">
        {{ news.excerpt }}
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'NewsCardHorizontal',
  props: {
    news: {
      type: Object,
      required: true
    }
  }
};
</script>