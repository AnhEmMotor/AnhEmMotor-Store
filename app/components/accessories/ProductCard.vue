<template>
  <div
    class="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer flex flex-col"
    @click="$emit('viewDetails', product)"
  >
    <div class="relative overflow-hidden h-56 flex items-center justify-center">
      <img :src="product.image" :alt="product.name" class="w-full h-full object-contain p-5" />
    </div>

    <div class="p-5 flex flex-col flex-grow">
      <div class="text-sm font-semibold text-gray-800 mb-2 leading-tight line-clamp-3">
        {{ product.name }}
      </div>
      <div class="text-xl font-bold text-[#de0000] mb-4">
        {{ formatCurrency(product.price) }} VNĐ
      </div>

      <div class="flex items-center justify-center gap-2 mb-4">
        <span
          v-for="color in product.colors"
          :key="color"
          :style="{ backgroundColor: color }"
          class="w-4 h-4 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform"
        ></span>
      </div>

      <BaseButton
        class="mt-auto hover:from-[#b30000] hover:to-[#800000] transform hover:-translate-y-0.5 transition-all"
        @click.stop="$emit('addToCart', product)"
      >
        <i class="fas fa-shopping-cart"></i>
        Thêm vào giỏ hàng
      </BaseButton>
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
defineEmits(['addToCart', 'viewDetails'])

import BaseButton from '../ui/button/BaseButton.vue'

const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return amount
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
</script>
