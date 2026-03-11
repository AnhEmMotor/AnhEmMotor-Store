<template>
  <div
    v-if="loading || totalPages > 0"
    class="mt-8 mb-8 flex justify-center items-center space-x-2"
  >
    <div v-if="loading" class="flex items-center justify-center space-x-2">
      <div
        class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"
      ></div>
      <span class="text-sm text-gray-500">Đang tải...</span>
    </div>

    <div v-else-if="totalPages > 0" class="flex items-center space-x-2">
      <button
        @click="prevPage"
        :disabled="isPrevDisabled"
        :class="[
          'min-w-[40px] h-10 px-2 rounded-lg border bg-white text-gray-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          !isPrevDisabled ? 'hover:border-red-600 hover:text-red-600' : '',
        ]"
      >
        Trước
      </button>

      <div class="text-sm text-gray-700 px-3 min-w-[120px] text-center">
        <span v-if="!isEditing" @dblclick="startEditing" class="cursor-pointer"
          >Trang {{ currentPage }} / {{ totalPages }}</span
        >
        <div v-else class="flex items-center justify-center gap-2">
          <input
            ref="pageInputEl"
            type="number"
            v-model.number="inputPage"
            @keydown.enter="goToPage"
            @blur="goToPage"
            :max="totalPages"
            step="1"
            min="1"
            class="w-20 text-center border border-gray-300 rounded-md shadow-sm focus:border-[#de0000] focus:ring-[#de0000]"
          />
        </div>
      </div>

      <button
        @click="nextPage"
        :disabled="isNextDisabled"
        :class="[
          'min-w-[40px] h-10 px-2 rounded-lg border bg-white text-gray-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          !isNextDisabled ? 'hover:border-red-600 hover:text-red-600' : '',
        ]"
      >
        Sau
      </button>
    </div>
  </div>
  <span v-else />
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:currentPage'])
const isEditing = ref(false)
const inputPage = ref(props.currentPage)
const pageInputEl = ref(null)
const startEditing = async () => {
  if (props.loading) return
  isEditing.value = true
  inputPage.value = props.currentPage
  await nextTick()
  pageInputEl.value?.focus()
  pageInputEl.value?.select()
}
const goToPage = () => {
  const newPage = parseInt(inputPage.value, 10)
  if (!isNaN(newPage) && newPage > 0 && newPage <= props.totalPages) {
    if (newPage !== props.currentPage) {
      emit('update:currentPage', newPage)
    }
  }
  isEditing.value = false
}
const prevPage = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1)
  }
}
const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1)
  }
}
const isPrevDisabled = computed(() => {
  return props.loading || props.currentPage <= 1
})
const isNextDisabled = computed(() => {
  return props.loading || props.currentPage >= props.totalPages
})
</script>

<style scoped>
.loader {
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
  appearance: inherit;
}
</style>
