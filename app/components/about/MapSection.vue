<template>
  <section class="bg-white py-10 sm:py-16 px-4 sm:px-6 md:px-8 mb-6 sm:mb-10">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl md:text-4xl text-center mb-4 font-bold text-red-500">Bản Đồ Các Cơ Sở</h2>
      <p class="text-center text-lg text-gray-500 mb-8 sm:mb-10">Tìm cơ sở AnhEm Moto gần bạn nhất</p>

      <div class="rounded-2xl overflow-hidden shadow-xl h-[300px] sm:h-[400px] md:h-[500px] relative mb-8">
        <iframe
          id="mapFrame"
          class="w-full h-full border-none"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251637.95196238213!2d106.36556092593408!3d10.755292865496954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1709123456789!5m2!1svi!2s"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-dowrade"
        >
        </iframe>
      </div>

      <div class="mt-8 bg-white p-4 sm:p-5 rounded-xl shadow-lg">
        <h3 class="text-red-500 mb-5 text-center font-bold text-xl sm:text-2xl">🗺️ Các Cơ Sở Trên Bản Đồ</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            class="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 border-l-4 border-red-500 bg-gray-50 rounded-lg transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg text-center sm:text-left gap-2 sm:gap-2.5"
            v-for="(loc, idx) in locations"
            :key="idx"
          >
            <div class="flex items-center">
              <span class="text-red-500 text-xl mr-2.5">📍</span>
              <div class="location-details">
                <strong class="block mb-1 text-base sm:text-lg">{{ loc.title }}</strong>
                <small class="text-gray-600 text-sm sm:text-base">{{ loc.address }}</small>
              </div>
            </div>
            <button
              class="bg-red-500 text-white border-none py-2 px-3 sm:px-4 rounded-md cursor-pointer text-xs sm:text-sm font-bold transition-all duration-300 ease-in-out hover:bg-red-600 hover:scale-105"
              @click="searchLocation(loc.address)"
            >
              🔍 Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const locations = ref([
  { title: 'Cơ Sở 1 - TP.HCM', address: '123 Nguyễn Văn Cừ, Quận 5, TP.HCM' },
  { title: 'Cơ Sở 2 - Hà Nội', address: '456 Giải Phóng, Hai Bà Trưng, Hà Nội' },
  { title: 'Cơ Sở 3 - Đà Nẵng', address: '789 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng' },
  { title: 'Cơ Sở 4 - Cần Thơ', address: '321 3 Tháng 2, Ninh Kiều, Cần Thơ' },
  { title: 'Cơ Sở 5 - Nha Trang', address: '654 Trần Phú, Nha Trang, Khánh Hòa' },
  { title: 'Cơ Sở 6 - Hải Phòng', address: '147 Lê Hồng Phong, Ngô Quyền, Hải Phòng' },
])

const searchLocation = (address) => {
  const encodedAddress = encodeURIComponent(address)
  const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
  window.open(searchUrl, '_blank')
}
</script>
