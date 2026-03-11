<template>
  <teleport to="body">
    <!-- Overlay covers only the area below the header (header uses h-20). This prevents covering the header. -->
    <div
      :class="[
        'fixed left-0 right-0 top-[100px] bottom-0 bg-black/40 transition-opacity duration-300',
        isOpen
          ? 'opacity-100 pointer-events-auto z-50'
          : shouldRender
            ? 'opacity-0 pointer-events-none z-50'
            : 'opacity-0 pointer-events-none -z-10',
      ]"
      @click="$emit('close')"
    ></div>

    <!-- Panel starts below header (top-20) so header remains visible above it -->
    <div
      :class="[
        'fixed top-24 right-0 bottom-0 w-screen md:w-96 bg-white transform transition-transform flex flex-col overflow-hidden',
        isOpen ? 'translate-x-0' : 'translate-x-full',
        isOpen || shouldRender ? 'z-50' : '-z-10',
      ]"
    >
      <div
        class="flex justify-between items-center p-4 border-b bg-gradient-to-r from-gray-50 to-white"
      >
        <h3 class="text-xl font-bold flex items-center gap-2">
          <i class="fas fa-shopping-cart text-honda-red"></i>
          Giỏ hàng của bạn
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-700 text-2xl hover:text-honda-red transition-colors"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Product list area: ensure white background for clarity -->
      <div class="flex-grow overflow-auto p-4 bg-white" style="-webkit-overflow-scrolling: touch">
        <div v-if="cartItems.length === 0" class="text-center py-8 text-gray-500">
          <i class="fas fa-shopping-cart text-4xl mb-4 opacity-30"></i>
          <p>Giỏ hàng của bạn đang trống.</p>
        </div>
        <div v-else>
          <div
            v-for="(item, index) in cartItems"
            :key="item.id"
            class="flex items-center gap-3 mb-4 pb-4 border-b last:border-b-0"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-16 h-16 object-contain rounded-lg border p-1 bg-gray-50"
            />
            <div class="flex-1">
              <div class="font-semibold text-sm text-gray-800">{{ item.name }}</div>
              <div class="text-[#de0000] font-semibold text-sm">
                {{ formatCurrency(item.price) }} VNĐ
              </div>
              <div class="flex items-center gap-2 mt-2">
                <NumberStepper
                  :model-value="item.quantity"
                  :min="1"
                  :max="999"
                  @increment="$emit('updateQuantity', { index, change: 1 })"
                  @decrement="$emit('updateQuantity', { index, change: -1 })"
                />
              </div>
            </div>
            <button
              class="text-red-500 hover:bg-red-100 rounded p-2"
              @click="$emit('removeItem', index)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="p-4 border-t bg-gradient-to-r from-gray-50 to-white">
        <div class="flex justify-between items-center mb-4">
          <span class="font-semibold text-lg">Tổng cộng:</span>
          <span class="font-bold text-honda-red text-xl">{{ formatCurrency(cartTotal) }} VNĐ</span>
        </div>
        <BaseButton
          id="checkout-button"
          :to="{ path: '/process-order' }"
          :disabled="cartItems.length === 0"
          @click="onCheckout"
        >
          <i class="fas fa-credit-card mr-2"></i>
          Xem giỏ hàng
        </BaseButton>
      </div>
    </div>
  </teleport>
</template>

<script setup>
const { isOpen, cartItems, cartTotal } = defineProps({
  isOpen: Boolean,
  cartItems: {
    type: Array,
    default: () => [],
  },
  cartTotal: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['close', 'updateQuantity', 'removeItem'])

import { ref, watch } from 'vue'
import BaseButton from '../ui/button/BaseButton.vue'
import NumberStepper from '../ui/input/NumberStepper.vue'

// Keep overlay/panel rendered for the duration of the close animation so
// underlying elements can't jump above while opacity/translate transitions run.
const shouldRender = ref(isOpen)
let closeTimer = null
watch(
  () => isOpen,
  (val) => {
    if (val) {
      // opening: ensure it's rendered immediately
      if (closeTimer) {
        clearTimeout(closeTimer)
        closeTimer = null
      }
      shouldRender.value = true
    } else {
      // closing: keep rendered for transition duration (match CSS 300ms)
      if (closeTimer) clearTimeout(closeTimer)
      closeTimer = setTimeout(() => {
        shouldRender.value = false
        closeTimer = null
      }, 320)
    }
  },
  { immediate: true },
)

function onCheckout() {
  // close the cart panel first, then allow RouterLink to navigate
  emit('close')
}

const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return amount
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
</script>
