<template>
  <section
    class="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center flex items-center justify-center relative"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div class="absolute inset-0 bg-dark-text opacity-40"></div>
    <div 
      class="text-center z-10 p-4 transition-all duration-1000"
      :class="{ 'opacity-0 translate-y-5': !isVisible, 'opacity-100 translate-y-0': isVisible }"
    >
      <h1 class="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 drop-shadow-lg">
        {{ title }}
      </h1>
      <p class="text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-md">
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NewsBanner',
  props: {
    title: {
      type: String,
      default: 'CÁC TIN TỨC & SỰ KIỆN NỔI BẬT'
    },
    subtitle: {
      type: String,
      default: 'Cập nhật tất cả các tin tức, sự kiện mới nhất về xe và các hoạt động của chúng tôi.'
    },
    backgroundImage: {
      type: String,
      default: 'https://images7.alphacoders.com/106/thumb-1920-1062408.jpg'
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