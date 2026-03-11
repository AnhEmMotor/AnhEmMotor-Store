<template>
  <div class="flex items-center gap-2">
    <button
      class="w-8 h-8 rounded-full bg-gradient-to-r from-[#de0000] to-[#b30000] text-white"
      :disabled="disabled || value <= min"
      @click="decrement"
    >
      -
    </button>
    <span class="font-semibold">{{ value }}</span>
    <button
      class="w-8 h-8 rounded-full bg-gradient-to-r from-[#de0000] to-[#b30000] text-white"
      :disabled="disabled || value >= max"
      @click="increment"
    >
      +
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 1 },
  min: { type: Number, default: 1 },
  max: { type: Number, default: 999 },
  disabled: { type: Boolean, default: false },
})

const emits = defineEmits(['update:modelValue', 'increment', 'decrement'])

// reactive view of the incoming value so template updates when parent changes it
const value = computed(() => props.modelValue)

function increment() {
  if (props.disabled || props.modelValue >= props.max) return
  const next = props.modelValue + 1
  emits('update:modelValue', next)
  emits('increment')
}

function decrement() {
  if (props.disabled || props.modelValue <= props.min) return
  const next = props.modelValue - 1
  emits('update:modelValue', next)
  emits('decrement')
}
</script>
