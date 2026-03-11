<template>
  <section class="container mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16">
    <h2
      class="text-3xl sm:text-4xl font-extrabold text-center text-primary-red mb-8 sm:mb-12 border-b-2 border-primary-light pb-4 fade-in-up"
    >
      TẤT CẢ TIN TỨC
    </h2>

    <div class="space-y-6">
      <a
        v-for="(news, index) in allNews"
        :key="news.id"
        :href="news.link"
        :style="{ 'transition-delay': `${index * 100}ms` }"
        class="flex flex-col md:flex-row bg-white rounded-xl shadow-lg border border-gray-100 transform hover:scale-[1.01] hover:shadow-xl transition-all duration-300 ease-in-out news-card-hover fade-in-up"
      >
        <img
          :src="news.image"
          :alt="news.title"
          class="w-full md:w-1/3 lg:w-1/4 h-48 sm:h-56 object-cover news-image rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
        />
        <div class="p-4 sm:p-6 flex-1">
          <div class="flex items-center space-x-3 text-xs sm:text-sm mb-3">
            <span class="text-primary-red font-bold uppercase">{{ news.category }}</span>
            <span class="text-gray-400">|</span>
            <span class="text-gray-500"><i class="far fa-clock mr-1"></i> {{ news.date }}</span>
          </div>
          <h3
            class="news-title text-xl sm:text-2xl font-extrabold text-dark-text hover:text-primary-red transition-colors duration-300 mb-2"
          >
            {{ news.title }}
          </h3>
          <p class="text-gray-700 text-base line-clamp-3">
            {{ news.description }}
          </p>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const allNews = ref([
  {
    id: 1,
    link: 'tin1.html',
    image:
      'https://yamaha-motor.com.vn/wp/wp-content/uploads/2025/07/522738521_1082519664023136_5925928157789263882_n.jpeg',
    category: 'TIN TỨC SỰ KIỆN',
    date: '03.08.2025',
    title: 'KHAI TRƯƠNG YAMAHA TOWN THANH VƯƠNG PHÁT 8 TẠI TP. HỒ CHÍ MINH',
    description:
      'Yamaha tiếp tục tăng tốc, rộn ràng chào đón đại lý mới khai trương tại Thành phố Hồ Chí Minh với hàng ngàn ưu đãi hấp dẫn. Ngày 23/07/2025 vừa qua, Yamaha Town Thanh Vương Phát 8 đã chính thức khai trương tại 336 Đường số 1, khu 2, phường Bình Dương...',
  },
  {
    id: 2,
    link: 'tin5.html',
    image:
      'https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/10/xe-tay-ga-gia-re-ua-chuong-nhat-1-768x384.jpg',
    category: 'REVIEW SẢN PHẨM',
    date: '10.08.2025',
    title: 'TOP XE TAY GA GIÁ RẺ, CHẤT LƯỢNG CAO NÊN MUA HIỆN NAY',
    description:
      "Thị trường xe tay ga giá rẻ tại Việt Nam rất 'sôi động' với sự góp mặt của nhiều thương hiệu khác nhau. Trong đó, Yamaha là một trong những hãng xe uy tín, nổi tiếng với mẫu xe có thiết kế thời thượng, màu sắc cuốn hút. Đặc biệt, ở phân khúc 20 - 40 triệu đồng...",
  },
  {
    id: 3,
    link: 'tin6.html',
    image: 'https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/08/Thumb-1-768x432.jpg',
    category: 'KỸ THUẬT',
    date: '05.08.2025',
    title: '5 MẸO BẢO DƯỠNG XE MÁY ĐƠN GIẢN TẠI NHÀ ĐỂ KÉO DÀI TUỔI THỌ ĐỘNG CƠ',
    description:
      'Việc bảo dưỡng xe định kỳ là vô cùng quan trọng. Bài viết này sẽ hướng dẫn bạn 5 bước cơ bản nhưng hiệu quả để tự tay chăm sóc chiếc xe của mình, giúp động cơ luôn hoạt động trơn tru.',
  },
])
</script>
