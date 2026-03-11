<template>
  <aside class="flex-shrink-0 mb-8 z-[41] h-full flex flex-col bg-white">
    <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-full overflow-y-auto">
      
      <div class="flex justify-between items-center border-b pb-2 mb-4">
        <h3 class="text-xl font-bold text-[#de0000]">
          <i class="fas fa-filter mr-2"></i>Bộ Lọc
        </h3>
        <button 
          @click="$emit('close')" 
          class="md:hidden text-gray-500 hover:text-[#de0000] p-2 transition-colors"
        >
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <div class="mb-6">
        <h4 class="font-semibold mb-3 text-gray-700">Loại sản phẩm</h4>
        <div class="space-y-2">
          <label class="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-1 rounded transition">
            <input
              type="radio"
              name="product_type"
              value="all"
              :checked="selectedType === 'all'"
              @change="updateType('all')"
              class="w-4 h-4 text-[#de0000] border-gray-300 focus:ring-[#de0000]"
            />
            <span class="ml-2 text-gray-600">Tất cả</span>
          </label>

          <label class="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-1 rounded transition">
            <input
              type="radio"
              name="product_type"
              value="phu-tung"
              :checked="selectedType === 'phu-tung'"
              @change="updateType('phu-tung')"
              class="w-4 h-4 text-[#de0000] border-gray-300 focus:ring-[#de0000]"
            />
            <span class="ml-2 text-gray-600">Phụ tùng</span>
          </label>

          <label class="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-1 rounded transition">
            <input
              type="radio"
              name="product_type"
              value="hoa-chat"
              :checked="selectedType === 'hoa-chat'"
              @change="updateType('hoa-chat')"
              class="w-4 h-4 text-[#de0000] border-gray-300 focus:ring-[#de0000]"
            />
            <span class="ml-2 text-gray-600">Hóa chất</span>
          </label>
        </div>
      </div>

      <div class="mb-6">
        <h4 class="font-semibold mb-3 text-gray-700">Phạm vi giá (VNĐ)</h4>
        <div class="space-y-2">
          <label class="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-1 rounded transition">
            <input
              type="radio"
              name="price"
              value="all"
              :checked="selectedPrice === 'all'"
              @change="updatePrice('all')"
              class="w-4 h-4 text-[#de0000] border-gray-300 focus:ring-[#de0000]"
            />
            <span class="ml-2 text-gray-600">Tất cả</span>
          </label>
          <label class="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-1 rounded transition">
            <input
              type="radio"
              name="price"
              value="0-300000"
              :checked="selectedPrice === '0-300000'"
              @change="updatePrice('0-300000')"
              class="w-4 h-4 text-[#de0000] border-gray-300 focus:ring-[#de0000]"
            />
            <span class="ml-2 text-gray-600">Dưới 300.000</span>
          </label>
          <label class="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-1 rounded transition">
            <input
              type="radio"
              name="price"
              value="300000-500000"
              :checked="selectedPrice === '300000-500000'"
              @change="updatePrice('300000-500000')"
              class="w-4 h-4 text-[#de0000] border-gray-300 focus:ring-[#de0000]"
            />
            <span class="ml-2 text-gray-600">300.000 - 500.000</span>
          </label>
          <label class="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-1 rounded transition">
            <input
              type="radio"
              name="price"
              value="500000-1000000"
              :checked="selectedPrice === '500000-1000000'"
              @change="updatePrice('500000-1000000')"
              class="w-4 h-4 text-[#de0000] border-gray-300 focus:ring-[#de0000]"
            />
            <span class="ml-2 text-gray-600">500.000 - 1.000.000</span>
          </label>
          <label class="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-1 rounded transition">
            <input
              type="radio"
              name="price"
              value="1000000-max"
              :checked="selectedPrice === '1000000-max'"
              @change="updatePrice('1000000-max')"
              class="w-4 h-4 text-[#de0000] border-gray-300 focus:ring-[#de0000]"
            />
            <span class="ml-2 text-gray-600">Trên 1.000.000</span>
          </label>
        </div>
      </div>

      <button
        @click="$emit('clear-filters')"
        class="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition duration-200 mt-auto"
      >
        <i class="fas fa-sync-alt mr-2"></i> Xóa Bộ Lọc
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

// Định nghĩa emit 'close' để đóng modal trên mobile
const emit = defineEmits(['filter-change', 'clear-filters', 'close'])

const selectedType = ref('all')
const selectedPrice = ref('all')

const updateType = (val) => {
  selectedType.value = val
  emitFilters()
}

const updatePrice = (val) => {
  selectedPrice.value = val
  emitFilters()
}

const emitFilters = () => {
  emit('filter-change', {
    productType: selectedType.value,
    priceRange: selectedPrice.value,
  })
}

const resetFilters = () => {
  selectedType.value = 'all'
  selectedPrice.value = 'all'
}

defineExpose({ resetFilters })
</script>