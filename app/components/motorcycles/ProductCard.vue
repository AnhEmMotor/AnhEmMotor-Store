<template>
  <div
    class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all w-full h-full flex flex-col"
  >
    <div class="p-3 sm:p-4 flex-shrink-0">
      <router-link
        :to="`/product-details/${product.id}`"
        class="block text-gray-800 font-semibold truncate"
      >
        <h3 class="text-base sm:text-lg line-clamp-2 min-h-[3rem]">{{ product.name }}</h3>
      </router-link>
    </div>
    <div class="flex items-center justify-center p-2 cursor-pointer flex-grow">
      <router-link :to="`/product-details/${product.id}`">
        <img :src="product.image" :alt="product.name" class="w-full h-32 sm:h-40 md:h-36 object-contain" />
      </router-link>
    </div>
    <div class="p-3 sm:p-4 text-center flex-shrink-0">
      <p class="text-gray-900 font-bold text-base sm:text-lg mb-2">{{ formatPrice(product.price) }}</p>
      <button
        class="w-full bg-red-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-red-700 transition-colors"
        @click="emit('add-to-cart')"
      >
        Thêm vào giỏ
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}
</script>
