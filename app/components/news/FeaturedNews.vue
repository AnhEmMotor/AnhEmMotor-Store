<template>
    <section class="container mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-center text-primary-red mb-8 sm:mb-12 border-b-2 border-primary-light pb-4 fade-in-up">
            NỔI BẬT TRONG TUẦN</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <a v-for="(news, index) in featuredNews" :key="news.id" :href="news.link"
                :style="{ 'transition-delay': `${index * 100}ms` }"
                class="block news-card-hover bg-white rounded-xl overflow-hidden shadow-2xl border-t-4 border-primary-red transform hover:translate-y-[-5px] transition-all duration-300 ease-in-out fade-in-up">
                <div class="overflow-hidden">
                    <img :src="news.image" :alt="news.title" class="w-full h-40 sm:h-48 object-cover news-image">
                </div>
                <div class="p-6">
                    <span class="text-sm text-gray-500 font-medium">{{ news.date }}</span>
                    <h3 class="news-title text-lg sm:text-xl font-bold text-dark-text mt-2 mb-3 leading-snug transition-colors duration-300">
                        {{ news.title }}
                    </h3>
                    <p class="text-gray-600 text-base line-clamp-3">
                        {{ news.description }}
                    </p>
                    <span class="text-primary-red font-bold mt-4 inline-block text-xs sm:text-sm hover:underline">Đọc thêm <i
                            class="fas fa-arrow-right ml-1 text-xs"></i></span>
                </div>
            </a>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const featuredNews = ref([
    {
        id: 1,
        link: "tin2.html",
        image: "https://yamaha-motor.com.vn/wp/wp-content/uploads/2025/08/Thumb-Post-1.jpg",
        date: "15 tháng 8, 2025",
        title: "Ra mắt dòng xe thể thao mới với công nghệ đột phá",
        description: "Chúng tôi tự hào giới thiệu mẫu xe thể thao mới, hứa hẹn mang đến trải nghiệm lái xe tuyệt vời nhất với động cơ thế hệ mới và khung gầm siêu nhẹ."
    },
    {
        id: 2,
        link: "tin3.html",
        image: "https://yamaha-motor.com.vn/wp/wp-content/uploads/2025/05/WTGP-slogan_01-1.png",
        date: "12 tháng 8, 2025",
        title: "Kết quả giải đua xe vô địch quốc gia 2025: Đội AnhEm Motor vô địch",
        description: "Đội đua của chúng tôi đã xuất sắc giành vị trí dẫn đầu trong giải đấu năm nay. Cùng nhìn lại những khoảnh khắc đáng nhớ và chặng đường chinh phục đỉnh cao."
    },
    {
        id: 3,
        link: "tin4.html",
        image: "https://yamaha-motor.com.vn/wp/wp-content/uploads/2025/07/xe-dien-yamaha-neos.jpg",
        date: "17 tháng 7, 2025",
        title: "NEO’s – Dòng xe điện dẫn đầu xu hướng di chuyển xanh tại Việt Nam",
        description: "Khám phá mẫu xe điện tiên phong của Yamaha, kết hợp thiết kế thời thượng và công nghệ pin thân thiện với môi trường, đáp ứng nhu cầu di chuyển đô thị."
    }
]);
</script>
