<template>
  <div class="info-section">
    <h2>Liên Hệ Với Chúng Tôi</h2>
    <p>
      Chuyên cung cấp và mua bán các loại xe máy chính hãng với giá tốt nhất thị trường. Đội ngũ tư vấn
      chuyên nghiệp sẵn sàng hỗ trợ bạn 24/7.
    </p>

    <div class="contact-info">
      <div class="contact-item">
        <i class="fas fa-map-marker-alt"></i>
        <span>123 Đường ABC, Quận 1, TP.HCM</span>
      </div>
      <div class="contact-item">
        <i class="fas fa-phone"></i>
        <span>0901 234 567</span>
      </div>
      <div class="contact-item">
        <i class="fas fa-envelope"></i>
        <span>info@anhemmotor.vn</span>
      </div>
      <div class="contact-item">
        <i class="fas fa-clock"></i>
        <span>8:00 - 22:00 (Hàng ngày)</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-section {
  background: linear-gradient(135deg, #E25858 0%, #FF4757 100%);
  padding: 40px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.info-section::before,
.info-section::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.info-section::before {
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  transform: translate(30px, -30px);
}

.info-section::after {
  bottom: 0;
  left: 0;
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.05);
  transform: translate(-50px, 50px);
}

.info-section h2 {
  font-size: 2.2em;
  margin-bottom: 20px;
  font-weight: 700;
}

.info-section p {
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0.95;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.contact-item i {
  width: 20px;
  font-size: 1.2em;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .info-section {
    padding: 30px 20px;
    text-align: center;
  }
  
  .info-section h2 {
    font-size: 1.8em;
  }
  
  .contact-item {
    justify-content: center;
  }
}
</style>