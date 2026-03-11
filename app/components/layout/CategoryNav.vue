<template>
  <div class="sticky top-20 z-40 bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 py-2 text-center overflow-x-auto whitespace-nowrap sm:px-6 md:px-8">
      <RouterLink to="/spare-parts" v-slot="{ href, isActive, navigate }">
        <a
          :href="href"
          @click="navigate"
          :class="[
            'inline-block px-4 py-2 mr-2 sm:mr-4 rounded-full font-medium transition',
            isActive
              ? 'text-white bg-gradient-to-r from-[#de0000] to-[#b30000] border border-[#de0000]'
              : 'text-gray-600 border border-transparent hover:text-[#de0000] hover:border-[#de0000] hover:bg-white',
          ]"
        >
          Phụ tùng
        </a>
      </RouterLink>

      <RouterLink to="/accessories" v-slot="{ href, isActive, navigate }">
        <a
          :href="href"
          @click="navigate"
          :class="[
            'inline-block px-4 py-2 mr-2 sm:mr-4 rounded-full font-medium transition',
            isActive
              ? 'text-white bg-gradient-to-r from-[#de0000] to-[#b30000] border border-[#de0000] hover:text-white hover:from-[#de0000] hover:to-[#b30000]'
              : 'text-gray-600 border border-transparent hover:text-[#de0000] hover:border-[#de0000] hover:bg-white',
          ]"
        >
          Phụ kiện
        </a>
      </RouterLink>
    </div>
  </div>
</template>
