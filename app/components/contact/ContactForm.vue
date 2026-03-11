<script setup>
import { reactive, ref } from 'vue'

// --- State ---
const formData = reactive({
  full_name: '',
  phone_number: '',
  email: '',
  request_type: '',
  car_type: '',
  budget: '',
  detailed_message: '',
})

const errors = reactive({
  full_name: '',
  phone_number: '',
  email: '',
  request_type: '',
})

const isLoading = ref(false)
const statusMessage = ref('')
const statusType = ref('') // 'success' or 'error'

// --- Validation Helpers ---
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const isValidPhone = (phone) => /^0[3-9]\d{8,9}$/.test(phone)

// --- Handle Submit ---
const handleSubmit = async () => {
  // 1. Reset Errors
  Object.keys(errors).forEach((key) => (errors[key] = ''))
  statusMessage.value = ''

  let isValid = true

  // 2. Validate
  if (!formData.full_name.trim()) {
    errors.full_name = 'Vui lòng nhập họ và tên.'
    isValid = false
  }

  if (!formData.phone_number.trim()) {
    errors.phone_number = 'Vui lòng nhập số điện thoại.'
    isValid = false
  } else if (!isValidPhone(formData.phone_number)) {
    errors.phone_number = 'Số điện thoại không hợp lệ.'
    isValid = false
  }

  if (formData.email && !isValidEmail(formData.email)) {
    errors.email = 'Email không hợp lệ.'
    isValid = false
  }

  if (!formData.request_type) {
    errors.request_type = 'Vui lòng chọn loại yêu cầu.'
    isValid = false
  }

  if (!isValid) return

  // 3. API Call
  isLoading.value = true
  try {
    const res = await fetch('https://backend-xolq.onrender.com/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    if (data.success) {
      statusType.value = 'success'
      statusMessage.value = '🎉 Gửi liên hệ thành công! Chúng tôi sẽ sớm liên hệ với bạn.'

      // Reset form
      Object.keys(formData).forEach((key) => (formData[key] = ''))
    } else {
      statusType.value = 'error'
      statusMessage.value = data.message || 'Có lỗi xảy ra.'
    }
  } catch (err) {
    console.error(err)
    statusType.value = 'error'
    statusMessage.value = 'Không thể kết nối server hoặc có lỗi mạng!'
  } finally {
    isLoading.value = false
    // Tự động ẩn thông báo sau 5s
    if (statusType.value === 'success') {
      setTimeout(() => (statusMessage.value = ''), 5000)
    }
  }
}
</script>

<template>
  <div class="form-section">
    <h3>Gửi Yêu Cầu Tư Vấn</h3>
    <p class="subtitle">Điền thông tin để nhận tư vấn miễn phí</p>

    <form @submit.prevent="handleSubmit" novalidate>
      <div class="form-row">
        <div class="form-group" :class="{ invalid: errors.full_name }">
          <label for="full_name" class="required">Họ và tên</label>
          <input type="text" id="full_name" v-model="formData.full_name" required />
          <div class="error-message" v-if="errors.full_name">{{ errors.full_name }}</div>
        </div>
        <div class="form-group" :class="{ invalid: errors.phone_number }">
          <label for="phone_number" class="required">Số điện thoại</label>
          <input type="tel" id="phone_number" v-model="formData.phone_number" required />
          <div class="error-message" v-if="errors.phone_number">{{ errors.phone_number }}</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group" :class="{ invalid: errors.email }">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="formData.email" />
          <div class="error-message" v-if="errors.email">{{ errors.email }}</div>
        </div>
        <div class="form-group" :class="{ invalid: errors.request_type }">
          <label for="request_type" class="required">Loại yêu cầu</label>
          <select id="request_type" v-model="formData.request_type" required>
            <option value="">-- Chọn loại yêu cầu --</option>
            <option value="mua-xe">Mua xe máy</option>
            <option value="ban-xe">Bán xe máy</option>
            <option value="bao-hanh">Bảo hành/Sửa chữa</option>
            <option value="tu-van">Tư vấn chung</option>
            <option value="khac">Khác</option>
          </select>
          <div class="error-message" v-if="errors.request_type">{{ errors.request_type }}</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="car_type">Loại xe quan tâm</label>
          <select id="car_type" v-model="formData.car_type">
            <option value="">-- Chọn loại xe --</option>
            <option value="xe-so">Xe số (Honda Wave, Yamaha Sirius...)</option>
            <option value="xe-ga">Xe ga (Honda SH, Yamaha Janus...)</option>
            <option value="xe-con-tay">Xe côn tay (Exciter, Winner...)</option>
            <option value="xe-phan-khoi-lon">Xe phân khối lớn (CBR, R15...)</option>
            <option value="xe-dien">Xe điện</option>
          </select>
        </div>
        <div class="form-group">
          <label for="budget">Ngân sách dự kiến</label>
          <select id="budget" v-model="formData.budget">
            <option value="">-- Chọn mức giá --</option>
            <option value="duoi-20tr">Dưới 20 triệu</option>
            <option value="20-40tr">20 - 40 triệu</option>
            <option value="40-60tr">40 - 60 triệu</option>
            <option value="60-100tr">60 - 100 triệu</option>
            <option value="tren-100tr">Trên 100 triệu</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="detailed_message">Tin nhắn chi tiết</label>
        <textarea
          id="detailed_message"
          v-model="formData.detailed_message"
          rows="4"
          placeholder="Mô tả chi tiết yêu cầu của bạn..."
        ></textarea>
      </div>

      <button type="submit" class="submit-btn" :disabled="isLoading">
        <span v-if="isLoading" class="loading-spinner"></span>
        <span>{{ isLoading ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU TƯ VẤN' }}</span>
      </button>

      <div v-if="statusMessage" class="form-status" :class="statusType">
        {{ statusMessage }}
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-section {
  padding: 40px;
}

.form-section h3 {
  font-size: 1.8em;
  color: #e25858;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 700;
}

.subtitle {
  text-align: center;
  color: red;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
  font-size: 0.95em;
}

.required::after {
  content: ' *';
  color: #e25858;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1em;
  transition: all 0.3s ease;
  background: #f9fafb;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #e25858;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(226, 88, 88, 0.1);
}

.invalid input,
.invalid select {
  border-color: #e25858;
  background: #fef2f2;
}

.error-message {
  color: #e25858;
  font-size: 0.85em;
  margin-top: 5px;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #e25858 0%, #ff4757 100%);
  color: #fff;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(226, 88, 88, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;
  display: inline-block;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.form-status {
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
}

.form-status.success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.form-status.error {
  background: #fef2f2;
  color: #b24040;
  border: 1px solid #ffbebe;
}

@media (max-width: 768px) {
  .form-section {
    padding: 30px 20px;
  }
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
