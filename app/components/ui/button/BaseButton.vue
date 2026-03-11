<template>
  <RouterLink
    v-if="to"
    :to="to"
    v-bind="attrs"
    :class="classes"
    :aria-disabled="disabled ? 'true' : 'false'"
    @click="onClick"
  >
    <slot />
  </RouterLink>

  <button v-else v-bind="attrs" :class="classes" :disabled="disabled" @click="onClick">
    <slot />
  </button>
</template>

<script setup>
import { useAttrs } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: { type: [String, Object], default: null },
  disabled: { type: Boolean, default: false },
})

const emits = defineEmits(['click'])

const attrs = useAttrs()

const classes =
  'w-full bg-gradient-to-r from-[#de0000] to-[#b30000] text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition duration-300'

function onClick(e) {
  if (props.disabled) {
    e && e.preventDefault()
    return
  }
  emits('click', e)
}
</script>
