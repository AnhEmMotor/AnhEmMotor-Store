<template>
  <transition name="fade-slide">
    <button
      v-show="visible"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 bg-primary-red text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 hover:-translate-y-1 transition-all duration-300 z-50"
      aria-label="Scroll to top"
    >
      <i class="fas fa-chevron-up text-xl"></i>
    </button>
  </transition>
</template>

<script>
export default {
  name: 'ScrollToTop',
  data() {
    return {
      visible: false,
      scrollThreshold: 300
    };
  },
  methods: {
    handleScroll() {
      this.visible = window.scrollY > this.scrollThreshold;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.bg-primary-red {
  background-color: #E65151;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>