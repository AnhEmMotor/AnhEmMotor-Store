<template>
  <!-- Desktop sidebar (sticky) - chỉ hiển thị trên desktop -->
  <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-y-auto sticky top-20 p-4 sm:p-5">
    <FilterSidebarContent @update-filters="handleUpdateFilters" @close="handleClose" />
  </div>
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
