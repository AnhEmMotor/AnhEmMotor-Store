<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
    <div v-if="product" class="bg-white rounded-lg shadow-lg max-w-sm sm:max-w-lg md:max-w-3xl w-full overflow-auto">
      <div class="flex justify-end p-2 sm:p-3">
        <button class="text-xl sm:text-2xl text-gray-600 hover:text-gray-900" @click="emit('close')">
          &times;
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6">
        <div class="flex items-center justify-center">
          <img :src="product.image" :alt="product.name" class="max-h-60 sm:max-h-80 object-contain" />
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-semibold mb-2">{{ product.name }}</h2>
          <h4 class="text-lg sm:text-xl text-red-600 font-bold mb-4">{{ formatPrice(product.price) }}</h4>
          <p class="text-gray-700 text-sm sm:text-base mb-4">{{ product.desc }}</p>
          <button
            @click="addToCartAndClose"
            class="bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-red-700 text-sm sm:text-base"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  product: Object,
})

const emit = defineEmits(['close', 'add-to-cart'])

function formatPrice(price) {
  if (typeof price !== 'number') return ''
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

function addToCartAndClose() {
  if (props.product) {
    emit('add-to-cart', props.product)
  }
  emit('close')
}
</script>
