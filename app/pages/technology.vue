<script setup>
definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'Công nghệ | AnhEm Motor',
  description: 'Khám phá các công nghệ tiên tiến trên các dòng xe máy tại AnhEm Motor.'
})
</script>

<template>
  <div class="min-h-screen bg-white py-20 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-8 text-red-600">
        <Icon name="lucide:cpu" class="text-4xl" />
      </div>
      <h1 class="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight">Trang Công nghệ</h1>
      <p class="text-xl text-gray-500 mb-10">Trang này đang được phát triển để mang đến cho bạn thông tin chi tiết về các công nghệ động cơ, an toàn và tiện ích trên các dòng xe.</p>
      <NuxtLink to="/" class="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-red-600 transition-all uppercase tracking-widest text-sm">
        Quay lại trang chủ
      </NuxtLink>
    </div>
  </div>
</template>
