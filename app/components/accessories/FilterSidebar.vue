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
        <h4 class="font-semibold mb-3 text-gray-700">Danh mục</h4>
        <div class="space-y-2">
          <label
            class="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-1 rounded transition"
            v-for="cat in productTypes"
            :key="cat.value"
          >
            <input
              type="radio"
              name="product_type"
              :value="cat.value"
              :checked="modelValue.productType === cat.value"
              @change="updateFilter('productType', cat.value)"
              class="w-4 h-4 text-[#de0000] border-gray-300 focus:ring-[#de0000]"
            />
            <span class="ml-2 text-gray-600">{{ cat.label }}</span>
          </label>
        </div>
      </div>

      <div class="mb-6">
        <h4 class="font-semibold mb-3 text-gray-700">Phạm vi giá (VNĐ)</h4>
        <div class="space-y-2">
          <label
            class="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-1 rounded transition"
            v-for="range in priceRanges"
            :key="range.value"
          >
            <input
              type="radio"
              name="price"
              :value="range.value"
              :checked="modelValue.priceRange === range.value"
              @change="updateFilter('priceRange', range.value)"
              class="w-4 h-4 text-[#de0000] border-gray-300 focus:ring-[#de0000]"
            />
            <span class="ml-2 text-gray-600">{{ range.label }}</span>
          </label>
        </div>
      </div>

      <div class="mb-6">
        <h4 class="font-semibold mb-3 text-gray-700">Màu sắc</h4>
        <div class="flex flex-wrap gap-2">
          <button
            class="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110"
            :class="modelValue.color === 'all' ? 'border-[#de0000] shadow-[0_0_0_2px_rgba(222,0,0,0.1)]' : 'border-gray-300'"
            @click="updateFilter('color', 'all')"
            title="Tất cả màu"
          >
            <i v-if="modelValue.color === 'all'" class="fas fa-check text-xs text-[#de0000]"></i>
            <span v-else class="text-[10px] text-gray-500">All</span>
          </button>

          <button
            v-for="color in availableColors"
            :key="color"
            :style="{ backgroundColor: color }"
            class="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
            :class="modelValue.color === color ? 'border-[#de0000] shadow-[0_0_0_2px_rgba(222,0,0,0.1)]' : 'border-gray-300'"
            @click="updateFilter('color', color)"
          ></button>
        </div>
      </div>

      <button
        @click="$emit('clearFilters')"
        class="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition duration-200 mt-auto"
      >
        <i class="fas fa-sync-alt mr-2"></i> Xóa Bộ Lọc
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  products: Array,
  modelValue: Object,
})

const emit = defineEmits(['update:modelValue', 'clearFilters', 'close'])

const updateFilter = (key, value) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

const productTypes = [
  { value: 'all', label: 'Tất cả Phụ kiện' },
  { value: 'trang-phuc', label: 'Trang Phục' },
  { value: 'mu-bao-hiem', label: 'Mũ bảo hiểm' },
]

const priceRanges = [
  { value: 'all', label: 'Tất cả' },
  { value: '0-300000', label: 'Dưới 300.000' },
  { value: '300000-500000', label: '300.000 - 500.000' },
  { value: '500000-1000000', label: '500.000 - 1.000.000' },
  { value: '1000000-max', label: 'Trên 1.000.000' },
]

const availableColors = computed(() => {
  const colors = new Set()
  props.products.forEach((p) => {
    if (p.colors) {
      p.colors.forEach((c) => colors.add(c))
    }
  })
  return Array.from(colors)
})
</script>