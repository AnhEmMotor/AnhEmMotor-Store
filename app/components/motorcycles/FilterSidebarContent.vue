<template>
  <div>
    <div class="mb-6">
      <h4 class="font-semibold mb-3 text-gray-700 text-base sm:text-lg">Loại xe</h4>
      <div class="space-y-3">
        <label
          class="flex items-center text-xs sm:text-sm cursor-pointer"
          v-for="type in vehicleTypes"
          :key="type.value"
        >
          <input
            type="checkbox"
            class="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-600"
            :value="type.value"
            v-model="selectedTypes"
          />
          <span class="ml-3 text-gray-600 text-xs sm:text-sm">{{ type.label }}</span>
        </label>
      </div>
    </div>

    <div class="mb-6">
      <h4 class="font-semibold mb-3 text-gray-700 text-base sm:text-lg">Giá</h4>
      <div class="flex items-center gap-2 mb-4 text-xs sm:text-sm pr-2">
        <input
          type="text"
          :value="formatPrice(currentMinPrice)"
          placeholder="Tối thiểu"
          class="w-1/2 p-1.5 sm:p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 text-xs sm:text-sm"
          readonly
        />
        <span class="text-xs sm:text-sm text-gray-600">-</span>
        <input
          type="text"
          :value="formatPrice(currentMaxPrice)"
          placeholder="Tối đa"
          class="w-1/2 p-1.5 sm:p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 text-xs sm:text-sm"
          readonly
        />
      </div>

      <div class="mb-4">
        <label for="minPriceRange" class="sr-only">Minimum Price Range</label>
        <input
          type="range"
          id="minPriceRange"
          :min="0"
          :max="MAX_PRICE"
          step="100000"
          v-model.number="currentMinPrice"
          @input="onRangeInput('min')"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
        />
        <label for="maxPriceRange" class="sr-only">Maximum Price Range</label>
        <input
          type="range"
          id="maxPriceRange"
          :min="0"
          :max="MAX_PRICE"
          step="100000"
          v-model.number="currentMaxPrice"
          @input="onRangeInput('max')"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 mt-2"
        />
      </div>

      <button
        @click="applyFilters"
        class="w-full bg-gray-800 text-white font-semibold py-1.5 sm:py-2 rounded-md hover:bg-gray-900 transition-colors duration-200 text-sm sm:text-base"
      >
        Lọc
      </button>
    </div>

    <div class="mb-6">
      <h4 class="font-semibold mb-3 text-gray-700 text-base sm:text-lg">Dung tích động cơ</h4>
      <div class="space-y-3">
        <label
          class="flex items-center text-xs sm:text-sm cursor-pointer"
          v-for="cc in ccRanges"
          :key="cc.value"
        >
          <input
            type="checkbox"
            class="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-600"
            :value="cc.value"
            v-model="selectedCCs"
          />
          <span class="ml-3 text-gray-600 text-xs sm:text-sm">{{ cc.label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update-filters', 'close'])

const vehicleTypes = [
  { value: 'xe-ga', label: 'Xe ga' },
  { value: 'xe-so', label: 'Xe số' },
  { value: 'xe-con-tay', label: 'Xe côn tay' },
  { value: 'xe-the-thao', label: 'Xe phân khối lớn' },
  { value: 'xe-dien', label: 'Xe điện' },
]

const ccRanges = [
  { value: '<125', label: 'Dưới 125 cc' },
  { value: '125-150', label: '125 - 150 cc' },
  { value: '150-250', label: '150 - 250 cc' },
  { value: '>250', label: 'Trên 250 cc' },
]

const selectedTypes = ref([])
const selectedCCs = ref([])

const MAX_PRICE = 1300000000
const currentMinPrice = ref(0)
const currentMaxPrice = ref(MAX_PRICE)

function onRangeInput(which) {
  // Ensure min is not greater than max
  if (currentMinPrice.value > currentMaxPrice.value) {
    if (which === 'min') {
      currentMaxPrice.value = currentMinPrice.value
    } else {
      currentMinPrice.value = currentMaxPrice.value
    }
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ'
}

function applyFilters() {
  emit('update-filters', {
    types: selectedTypes.value,
    ccs: selectedCCs.value,
    minPrice: currentMinPrice.value,
    maxPrice: currentMaxPrice.value,
  })
  emit('close') // Close sidebar on mobile after applying
}
</script>

<style scoped>
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
}

input[type='range']::-webkit-slider-track {
  background: #e5e7eb;
  height: 8px;
  border-radius: 4px;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: #dc2626;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -6px;
}

input[type='range']::-moz-range-track {
  background: #e5e7eb;
  height: 8px;
  border-radius: 4px;
}

input[type='range']::-moz-range-thumb {
  background: #dc2626;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
