<template>
  <!-- Mobile sidebar (fixed overlay) -->
  <aside
    v-if="isOpen"
    class="fixed inset-y-0 left-0 w-80 bg-white z-50 transform transition-transform duration-300 overflow-y-auto"
  >
    <div class="p-4 sm:p-5">
      <div class="flex items-center justify-between mb-4 border-b pb-4">
        <h3 class="text-base sm:text-lg font-bold text-red-600 flex items-center gap-2">
          <i class="fas fa-filter"></i>
          <span>Bộ Lọc Sản Phẩm</span>
        </h3>
        <button
          @click="handleClose"
          class="text-gray-600 hover:text-gray-900 text-xl p-2"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <FilterSidebarContent @update-filters="handleUpdateFilters" @close="handleClose" />
    </div>
  </aside>
</template>

<script setup>
import FilterSidebarContent from './FilterSidebarContent.vue'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update-filters', 'close'])

const handleUpdateFilters = (filters) => {
  emit('update-filters', filters)
}

const handleClose = () => {
  emit('close')
}
</script>
