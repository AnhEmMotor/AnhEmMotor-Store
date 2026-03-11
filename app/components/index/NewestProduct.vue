<template>
  <section id="listings" class="listings-section py-16 md:py-24 max-w-7xl mx-auto">
    <div class="container mx-auto px-4 sm:px-6 md:px-8">
      <div class="section-header text-center mb-8 sm:mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Xe Máy Mới Nhất</h2>
        <p class="text-base text-gray-600 max-w-xl mx-auto">
          Khám phá những mẫu xe máy hot nhất hiện nay với giá cả cạnh tranh và chất lượng đảm bảo
        </p>
      </div>

      <div id="motorcycleListings" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-if="filteredBikes.length === 0 && !isSearching"
          class="col-span-full text-center py-16"
        >
          <div class="inline-block bg-white p-8 rounded-lg shadow-md">
            <i class="fas fa-search text-4xl text-red-400 mb-4"></i>
            <p class="text-xl text-gray-600 italic">Không tìm thấy xe máy nào phù hợp.</p>
          </div>
        </div>

        <div
          v-for="(motorcycle, index) in filteredBikes"
          :key="motorcycle.id"
          class="motorcycle-card bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <img
            :src="motorcycle.image"
            :alt="`${motorcycle.brand} ${motorcycle.model}`"
            loading="lazy"
            class="w-full aspect-[4/3] object-cover"
          />

          <div class="card-content p-6 flex flex-col flex-grow">
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              {{ motorcycle.brand }} {{ motorcycle.model }}
            </h3>
            <p class="price text-2xl font-semibold text-red-600 mb-3">
              {{ formatCurrency(motorcycle.price) }}
            </p>
            <p class="description text-gray-700 text-sm mb-4 flex-grow">
              {{ motorcycle.description }}
            </p>
            <button
              @click="viewDetails(motorcycle)"
              class="view-details mt-auto w-full bg-gradient-to-r from-red-600 to-red-600 text-white font-semibold py-3 px-4 rounded-md hover:from-red-700 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
            >
              <i class="fas fa-eye"></i> Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div
    v-if="selectedMotorcycle"
    @click.self="closeModal"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
  >
    <div
      class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto overflow-y-auto max-h-[90vh] relative animate-fade-in-up"
    >
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10"
      >
        <i class="fas fa-times text-2xl"></i>
      </button>

      <div class="grid md:grid-cols-2 gap-0">
        <div class="modal-image-wrapper rounded-t-lg md:rounded-l-lg md:rounded-t-none">
          <img
            :src="selectedMotorcycle.image"
            :alt="`${selectedMotorcycle.brand} ${selectedMotorcycle.model}`"
            class="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
        <div class="modal-text-content p-6 sm:p-8 flex flex-col">
          <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {{ selectedMotorcycle.brand }}
            {{ selectedMotorcycle.model }} ({{ selectedMotorcycle.year }})
          </h3>
          <p class="modal-price text-2xl sm:text-3xl font-bold text-red-600 mb-4 sm:mb-6">
            {{ formatCurrency(selectedMotorcycle.price) }}
          </p>

          <div class="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
            <div class="modal-details-item">
              <strong>Hãng xe:</strong> {{ selectedMotorcycle.brand }}
            </div>
            <div class="modal-details-item">
              <strong>Mẫu xe:</strong> {{ selectedMotorcycle.model }}
            </div>
            <div class="modal-details-item">
              <strong>Loại xe:</strong> {{ selectedMotorcycle.type }}
            </div>
            <div class="modal-details-item">
              <strong>Màu sắc:</strong> {{ selectedMotorcycle.color }}
            </div>
          </div>

          <p class="modal-description mt-4 sm:mt-6 text-sm sm:text-base text-gray-700 flex-grow">
            <strong>Mô tả:</strong><br />{{ selectedMotorcycle.description }}
          </p>

          <div class="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              class="flex-1 py-2 px-4 sm:py-3 sm:px-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-sm sm:text-base"
            >
              <i class="fas fa-phone mr-2"></i> Liên hệ tư vấn
            </button>
            <button
              class="flex-1 py-2 px-4 sm:py-3 sm:px-5 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition-all transform hover:scale-105 text-sm sm:text-base"
            >
              <i class="fas fa-shopping-cart mr-2"></i> Đặt xe ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const motorcycles = ref([
  {
    id: 1,
    brand: 'Honda',
    model: 'Vision',
    type: 'Xe tay ga',
    color: 'Trắng',
    year: 2023,
    price: 36612000,
    description:
      'Kiểu dáng thời trang và màu sắc cá tính. Thân xe nhỏ gọn kế thừa từ nét thiết kế của dòng xe SH, đường nét rõ ràng, liền mạch, càng nổi bật hơn là tông màu Đen và Xám Đen độc đáo.',
    image: 'assets/image/index/newest-product/vision.webp',
  },
  {
    id: 2,
    brand: 'Yamaha',
    model: 'NVX 155',
    type: 'Xe tay ga',
    color: 'Xanh',
    year: 2025,
    price: 69000000,
    description:
      'Tái định nghĩa lại thị trường xe tay ga thể thao tại Việt Nam, NVX 155 Hoàn Toàn Mới ra mắt với khối động cơ đột phá YECVT và diện mạo thể thao đậm chất R-DNA.',
    image: 'assets/image/index/newest-product/nvx.webp',
  },
  {
    id: 3,
    brand: 'Suzuki',
    model: 'V-STROM 250SX',
    type: 'Xe phân khối lớn',
    color: 'Xám',
    year: 2022,
    price: 132900000,
    description:
      'Khung sườn mới, nhẹ nhưng chắc chắn, gia tăng độ ổn định và khả năng điều khiển vượt trội. Góc lái linh hoạt và hệ thống treo tối ưu giúp V-STROM vượt qua các khúc cua dễ dàng.',
    image: 'assets/image/index/newest-product/vstrom.png',
  },
  {
    id: 4,
    brand: 'Kawasaki',
    model: 'W800',
    type: 'Xe phân khối lớn',
    color: 'Đen',
    year: 2025,
    price: 352400000,
    description:
      'W800 khá thân thiện kể cả với những người mới chơi xe Phân khối lớn, sử dụng động cơ đôi thẳng hàng SOHC 773cc làm mát bằng không khí.',
    image: 'assets/image/index/newest-product/w800.webp',
  },
  {
    id: 5,
    brand: 'Honda',
    model: 'Super Cub C125',
    type: 'Xe số',
    color: 'Đen',
    year: 2024,
    price: 86292000,
    description:
      'Thiết kế hình chữ S kế thừa kiểu dáng huyền thoại của xe Super Cub thập niên 50, mang đến sự hài hòa và mềm mại với lớp sơn nhũ ánh kim.',
    image: 'assets/image/index/newest-product/cub.webp',
  },
  {
    id: 6,
    brand: 'Yamaha',
    model: 'NEOs',
    type: 'Xe điện',
    color: 'Đen',
    year: 2024,
    price: 49091000,
    description:
      'Những tính năng và công nghệ của NEOs giúp mẫu xe này trở thành phương tiện di chuyển xanh và thân thiện với môi trường.',
    image: 'assets/image/index/newest-product/neos.png',
  },
])

const filteredBikes = ref([])
const isSearching = ref(false) // Can be used for loading states
const selectedMotorcycle = ref(null) // Holds the bike object for the modal

const viewDetails = (motorcycle) => {
  selectedMotorcycle.value = motorcycle
  document.body.style.overflow = 'hidden'
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
}

// Function to handle closing the modal
const closeModal = () => {
  selectedMotorcycle.value = null
  document.body.style.overflow = ''
}

onMounted(() => {
  filteredBikes.value = motorcycles.value
})
</script>

<style scoped>
.motorcycle-card {
  animation: fade-in-up 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
