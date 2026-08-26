<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  selected: { type: Boolean, default: false },
  variant: { type: String, default: 'pill' }, // 'pill' or 'circle'
});

defineEmits(['select']);

const bgStyle = computed(() => ({
  background: getColorBackground(props.label)
}));
</script>

<template>
  <button
    v-if="variant === 'circle'"
    type="button"
    class="relative w-6 h-6 rounded-full border border-gray-200 transition-all flex items-center justify-center shrink-0"
    :class="
      selected
        ? 'ring-1 ring-red-600 ring-offset-2 border-transparent'
        : 'hover:border-gray-400'
    "
    :aria-pressed="selected"
    :aria-label="label"
    :title="label"
    @click.prevent.stop="$emit('select')"
  >
    <span class="w-full h-full rounded-full border border-black/10" :style="bgStyle"></span>
  </button>

  <button
    v-else
    type="button"
    class="h-8 px-3 rounded-full border text-xs font-semibold transition whitespace-nowrap"
    :class="
      selected
        ? 'border-red-600 bg-red-600 text-white shadow-sm'
        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
    "
    :aria-pressed="selected"
    :aria-label="label"
    :title="label"
    @click.prevent.stop="$emit('select')"
  >
    {{ label }}
  </button>
</template>
