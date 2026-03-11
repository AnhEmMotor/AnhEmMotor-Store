<template>
  <!-- Overlay -->
  <div 
    v-show="isOpen"
    @click="$emit('close')"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
    :class="{ 'opacity-0': !isOpen, 'opacity-100': isOpen }"
  ></div>

  <!-- Sidebar Menu -->
  <nav 
    class="fixed top-0 left-0 w-85 max-w-xs h-full bg-white z-60 overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out flex flex-col p-6"
    :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }"
  >
    <div class="flex justify-end mb-8">
      <button 
        @click="$emit('close')"
        class="text-gray-600 text-3xl hover:text-primary-red transition-colors"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>

    <ul class="space-y-4 text-gray-800 font-semibold text-xl">
      <li v-for="item in menuItems" :key="item.path">
        <router-link 
          :to="item.path"
          @click="$emit('close')"
          class="block py-2 hover:text-primary-red transition-colors border-b border-gray-100"
          :class="{ 'text-primary-red font-bold': isActive(item.path) }"
        >
          {{ item.name }}
        </router-link>
      </li>
    </ul>

    <button
      @click="handleSearch"
      class="mt-8 w-full bg-primary-red text-white py-3 rounded-xl font-bold hover:bg-red-700 transition duration-300 shadow-lg"
    >
      Tìm Kiếm
    </button>
  </nav>
</template>

<script>
export default {
  name: 'MobileMenu',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    menuItems: {
      type: Array,
      required: true
    }
  },
  methods: {
    isActive(path) {
      return this.$route.path === path || this.$route.path.startsWith(path + '/');
    },
    handleSearch() {
      this.$emit('close');
      this.$emit('search');
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  beforeUnmount() {
    document.body.style.overflow = '';
  }
};
</script>

<style scoped>
.z-60 {
  z-index: 60;
}

.w-85 {
  width: 85%;
}
</style>