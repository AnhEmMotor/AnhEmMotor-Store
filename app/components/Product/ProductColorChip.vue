<script setup>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(["select"]);

defineProps({
  label: { type: String, required: true },
  selected: { type: Boolean, default: false },
});
</script>

<template>
  <button
    type="button"
    class="h-8 px-3 rounded-full border text-xs font-semibold transition whitespace-nowrap"
    :class="selected
      ? 'border-red-600 bg-red-600 text-white shadow-sm'
      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'"
    :aria-pressed="selected"
    :aria-label="label"
    :title="label"
    @click.prevent.stop="$emit('select')"
  >
    {{ label }}
  </button>
</template>
