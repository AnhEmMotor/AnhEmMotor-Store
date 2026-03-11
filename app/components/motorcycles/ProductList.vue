<template>
  <div class="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <p v-if="products.length === 0" class="col-span-full text-center text-gray-500 text-sm sm:text-base">
      Không tìm thấy sản phẩm phù hợp.
    </p>
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="emit('add-to-cart', product)"
    />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])
</script>
