<template>
  <router-link
    :to="`/promotion/${promotion.slug}`"
    class="block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
  >
    <div class="relative">
      <img 
        :src="promotion.image" 
        :alt="promotion.title"
        class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
      >
      <div 
        v-if="promotion.isHot"
        class="absolute top-4 left-4 bg-primary-red text-white text-xs font-bold px-3 py-1 rounded-full"
      >
        HOT
      </div>
    </div>
    <div class="p-6">
      <p class="text-sm text-gray-500 mb-2">{{ promotion.date }}</p>
      <h3 class="text-xl font-bold text-gray-800 mb-4 h-20 line-clamp-3">
        {{ promotion.title }}
      </h3>
      <span class="font-semibold text-primary-red group-hover:underline inline-flex items-center">
        Xem chi tiết
        <i class="fas fa-arrow-right ml-1 transition-transform duration-300 group-hover:translate-x-1"></i>
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'PromotionCard',
  props: {
    promotion: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bg-primary-red {
  background-color: #E65151;
}

.text-primary-red {
  color: #E65151;
}
</style>