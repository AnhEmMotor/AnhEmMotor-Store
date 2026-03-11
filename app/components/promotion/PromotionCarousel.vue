<template>
  <section class="text-center py-16 md:py-20 bg-gradient-to-br from-red-50 to-orange-50">
    <div 
      class="container mx-auto px-4 transition-all duration-1000"
      :class="{ 'opacity-0 translate-y-5': !isVisible, 'opacity-100 translate-y-0': isVisible }"
    >
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
        {{ title }}
      </h1>
      <p class="text-lg text-gray-500 max-w-2xl mx-auto">
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PromotionBanner',
  props: {
    title: {
      type: String,
      default: 'Ưu Đãi Hấp Dẫn'
    },
    subtitle: {
      type: String,
      default: 'Đừng bỏ lỡ các chương trình khuyến mãi đặc biệt từ AnhEm Motor. Cập nhật ngay để nhận nhiều quà tặng giá trị!'
    }
  },
  data() {
    return {
      isVisible: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }
};
</script>