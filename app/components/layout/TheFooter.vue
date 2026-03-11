<template>
  <footer class="bg-gradient-to-br from-gray-800 to-slate-800 text-white pt-16 pb-5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        <div class="footer-col">
          <h3 class="footer-heading">Thông Tin Liên Hệ</h3>
          <p class="contact-info-item">
            <i class="fas fa-map-marker-alt mr-2"></i>193 Đỗ Văn Thi, Phường Trấn Biên, TP. Biên
            Hoà, Tỉnh Đồng Nai
          </p>
          <p class="contact-info-item"><i class="fas fa-phone mr-2"></i>(024) 8582 0808</p>
          <p class="contact-info-item"><i class="fas fa-envelope mr-2"></i>anhemmotor@gmail.com</p>
          <div class="flex gap-4 mt-5">
            <RouterLink to="#" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </RouterLink>
            <RouterLink to="#" class="social-icon">
              <i class="fab fa-youtube"></i>
            </RouterLink>
            <RouterLink to="#" class="social-icon">
              <i class="fab fa-instagram"></i>
            </RouterLink>
            <RouterLink to="#" class="social-icon">
              <i class="fab fa-tiktok"></i>
            </RouterLink>
          </div>
        </div>

        <div class="footer-col">
          <h3 class="footer-heading">Sản Phẩm</h3>
          <ul class="space-y-2">
            <li><RouterLink to="#" class="footer-link">Xe máy Honda</RouterLink></li>
            <li><RouterLink to="#" class="footer-link">Xe máy Yamaha</RouterLink></li>
            <li><RouterLink to="#" class="footer-link">Xe máy Suzuki</RouterLink></li>
            <li><RouterLink to="#" class="footer-link">Xe máy Kawasaki</RouterLink></li>
            <li><RouterLink to="#" class="footer-link">Phụ kiện xe máy</RouterLink></li>
          </ul>
        </div>

        <div class="footer-col">
          <h3 class="footer-heading">Dịch Vụ</h3>
          <ul class="space-y-2">
            <li><RouterLink to="#" class="footer-link">Bảo dưỡng định kỳ</RouterLink></li>
            <li><RouterLink to="#" class="footer-link">Sửa chữa xe máy</RouterLink></li>
            <li><RouterLink to="#" class="footer-link">Đăng ký xe</RouterLink></li>
            <li><RouterLink to="#" class="footer-link">Bảo hiểm xe máy</RouterLink></li>
            <li><RouterLink to="#" class="footer-link">Tư vấn mua xe</RouterLink></li>
          </ul>
        </div>

        <div class="footer-col">
          <h3 class="footer-heading">Hỗ Trợ</h3>
          <ul class="space-y-2">
            <li><RouterLink to="#" class="footer-link">Chính sách bảo hành</RouterLink></li>
            <li><RouterLink to="#" class="footer-link">Hướng dẫn sử dụng</RouterLink></li>
            <li><RouterLink to="#" class="footer-link">FAQ</RouterLink></li>
            <li><RouterLink to="#" class="footer-link">Liên hệ hỗ trợ</RouterLink></li>
            <li><RouterLink to="#" class="footer-link">Sitemap</RouterLink></li>
          </ul>
        </div>
      </div>

      <div class="text-center pt-8 border-t border-white/10 text-white/60">
        <p>© 2025 AnhEm Motor. Mọi quyền được bảo lưu. | Thiết kế bởi AnhEm Team</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@reference "../../assets/main.css";

.footer-heading {
  @apply text-red-500 mb-5 text-lg sm:text-xl font-bold;
}

.contact-info-item {
  @apply text-white/80 leading-relaxed text-sm sm:text-base mb-2;
}

.social-icon {
  @apply w-11 h-11 bg-red-500/20 flex items-center justify-center rounded-full text-white text-lg transition-all duration-300 ease-in-out hover:bg-red-500 hover:-translate-y-1;
}

.footer-link {
  @apply text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500;
}
</style>
