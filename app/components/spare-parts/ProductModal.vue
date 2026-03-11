<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
    <div
      id="product-detail-panel"
      :class="{
        'scale-100 opacity-100 visible pointer-events-auto': isOpen,
        'scale-90 opacity-0 invisible': !isOpen,
      }"
      class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto transform transition-all duration-300 pointer-events-auto"
    >
      <div v-if="product">
        <div
          class="flex items-center justify-between p-6 border-b bg-gradient-to-r from-[#de0000] to-[#b30000] rounded-t-2xl"
        >
          <h3 class="text-xl font-bold text-white">{{ product.name }}</h3>
          <button
            @click="$emit('close')"
            class="text-white text-2xl rounded-full p-2 hover:bg-white/20 transition"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="p-6">
          <div class="text-center mb-6">
            <img
              :src="product.image"
              alt="Hình ảnh sản phẩm"
              class="w-full h-80 object-contain mb-4 bg-gray-100 rounded-xl"
            />
          </div>

          <div class="text-center mb-6">
            <p class="text-red-600 font-bold text-3xl mb-4">
              Giá: {{ formatCurrency(product.price) }} VNĐ
            </p>
            <p class="text-gray-700 mb-6 leading-relaxed">{{ product.description }}</p>
          </div>

          <div class="flex items-center justify-center mb-6">
            <label class="mr-3 font-semibold">Số lượng:</label>
            <div class="flex items-center border-2 border-gray-300 rounded-lg">
              <button class="px-3 py-1 hover:bg-gray-100" @click="decreaseQuantity">-</button>
              <input
                type="number"
                v-model.number="quantity"
                min="1"
                class="w-16 text-center border-none outline-none"
              />
              <button class="px-3 py-1 hover:bg-gray-100" @click="increaseQuantity">+</button>
            </div>
          </div>

          <button
            @click="addToCart"
            class="bg-gradient-to-r from-[#de0000] to-[#b30000] text-white w-full py-4 rounded-xl text-lg font-semibold hover:from-red-700 hover:to-red-800 transition duration-300 transform hover:scale-105"
          >
            <i class="fas fa-shopping-cart mr-2"></i> Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  product: Object,
})

const emit = defineEmits(['close', 'addToCart'])

const quantity = ref(1)

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      quantity.value = 1 // Reset quantity when modal opens
    }
  },
)

const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return '0'
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const increaseQuantity = () => {
  quantity.value++
}

const addToCart = () => {
  emit('addToCart', { product: props.product, quantity: quantity.value })
}
</script>
