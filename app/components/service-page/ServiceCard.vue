<template>
  <div
    class="fade-in bg-white p-6 sm:p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
  >
    <span class="block text-4xl sm:text-5xl mb-4">{{ props.service.icon }}</span>
    <h3 class="text-xl sm:text-2xl mb-4 text-gray-800">{{ props.service.title }}</h3>
    <p class="text-sm sm:text-base text-gray-600 mb-4">{{ props.service.description }}</p>
    <div class="text-lg sm:text-[1.2rem] font-bold text-red-600 mb-4">{{ props.service.price }}</div>
    <ul class="list-none pl-0">
      <li
        v-for="(feature, index) in props.service.features"
        :key="index"
        class="py-0.5 sm:py-1 text-sm sm:text-base text-gray-700 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold"
      >
        {{ feature }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
})
</script>
