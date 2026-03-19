<template>
  <div class="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto space-y-6">
      
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Quản lý tài khoản</h1>
        <p class="mt-2 text-sm text-gray-500">Xem và cập nhật thông tin cá nhân hoặc cài đặt bảo mật của bạn.</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        
        <!-- Left Sidebar / Navigation -->
        <div class="lg:w-1/3 xl:w-1/4 flex flex-col gap-6">
          
          <!-- Avatar Summary Card -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
            <div class="relative group cursor-pointer" @click="triggerAvatarUpload">
              <img 
                :src="user?.avatar || `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=random&size=128`" 
                alt="Avatar" 
                class="w-32 h-32 rounded-full object-cover ring-4 ring-gray-50 shadow-md transition-opacity duration-200"
                :class="{ 'opacity-50': isUploadingAvatar }"
              />
              <div class="absolute inset-0 bg-gray-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <i class="fa-solid fa-camera text-white text-xl"></i>
              </div>
              <div v-if="isUploadingAvatar" class="absolute inset-0 flex items-center justify-center">
                 <i class="fa-solid fa-spinner fa-spin text-white text-3xl"></i>
              </div>
            </div>
            
            <input 
              type="file" 
              ref="fileInput" 
              class="hidden" 
              accept="image/jpeg,image/png,image/webp,image/jpg"
              @change="handleAvatarChange" 
              :disabled="isUploadingAvatar"
            />

            <h2 class="mt-5 text-xl font-bold text-gray-900 text-center">{{ user?.fullName || 'Người dùng' }}</h2>
            <p class="text-gray-500 text-sm mt-1 text-center w-full truncate px-2" :title="user?.email">{{ user?.email || user?.phoneNumber || 'Chưa cập nhật email' }}</p>

            <button 
              @click="triggerAvatarUpload" 
              class="mt-6 w-full py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 transition-colors flex items-center justify-center gap-2"
              :disabled="isUploadingAvatar"
            >
              <i class="fa-solid fa-cloud-arrow-up"></i>
              {{ isUploadingAvatar ? 'Đang tải lên...' : 'Đổi ảnh đại diện' }}
            </button>
          </div>

          <!-- Vertical Tabs Navigation -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <nav class="flex flex-col">
              <button 
                @click="activeTab = 'profile'" 
                :class="['flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-all text-left border-l-4', activeTab === 'profile' ? 'border-blue-600 bg-blue-50/50 text-blue-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900']"
              >
                <div :class="['w-8 h-8 rounded-lg flex items-center justify-center transition-colors', activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500']">
                   <i class="fa-regular fa-id-card text-lg"></i>
                </div>
                Hồ sơ cá nhân
              </button>

              <div class="h-px bg-gray-100 mx-4"></div>

              <button 
                @click="activeTab = 'security'" 
                :class="['flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-all text-left border-l-4', activeTab === 'security' ? 'border-blue-600 bg-blue-50/50 text-blue-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900']"
              >
                <div :class="['w-8 h-8 rounded-lg flex items-center justify-center transition-colors', activeTab === 'security' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500']">
                  <i class="fa-solid fa-shield-halved text-lg"></i>
                </div>
                Bảo mật & Mật khẩu
              </button>
            </nav>
          </div>

        </div>

        <!-- Right Main Content -->
        <div class="lg:w-2/3 xl:w-3/4">
          
          <!-- Tab 1: Personal Info Form -->
          <div v-if="activeTab === 'profile'" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-fadeIn">
            <div class="border-b border-gray-100 pb-5 mb-6">
               <h3 class="text-xl font-bold text-gray-900">Thông tin cá nhân</h3>
               <p class="text-sm text-gray-500 mt-1">Cập nhật thông tin liên hệ và định danh của bạn.</p>
            </div>
            
            <form @submit.prevent="handleUpdateInfo" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <!-- Full Name -->
                <div class="md:col-span-2">
                  <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1.5">Họ và tên <span class="text-red-500">*</span></label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <i class="fa-regular fa-user text-gray-400"></i>
                    </div>
                    <input 
                      type="text" 
                      id="fullName" 
                      v-model="formData.fullName"
                      class="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all sm:text-sm"
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>
                </div>

                <!-- Phone Number -->
                <div>
                  <label for="phoneNumber" class="block text-sm font-medium text-gray-700 mb-1.5">Số điện thoại</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <i class="fa-solid fa-phone text-gray-400"></i>
                    </div>
                    <input 
                      type="tel" 
                      id="phoneNumber" 
                      v-model="formData.phoneNumber"
                      class="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all sm:text-sm"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <!-- Gender -->
                <div>
                  <label for="gender" class="block text-sm font-medium text-gray-700 mb-1.5">Giới tính <span class="text-red-500">*</span></label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <i class="fa-solid fa-venus-mars text-gray-400"></i>
                    </div>
                    <select 
                      id="gender" 
                      v-model="formData.gender"
                      class="block w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all sm:text-sm appearance-none"
                    >
                      <option value="" disabled>Chọn giới tính</option>
                      <option v-for="option in genderOptions" :key="option.value" :value="option.value">
                        {{ option.label }}
                      </option>
                    </select>
                    <!-- Custom chevron -->
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <i class="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                  </div>
                </div>
                
                <!-- Email (readonly) -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Địa chỉ Email</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <i class="fa-regular fa-envelope text-gray-400"></i>
                    </div>
                    <input 
                      type="email" 
                      :value="user?.email"
                      disabled
                      title="Bạn không thể thay đổi email"
                      class="block w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 text-gray-500 rounded-xl sm:text-sm cursor-not-allowed"
                      placeholder="Email chưa được cập nhật"
                    />
                    <div class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                      <i class="fa-solid fa-lock text-gray-300"></i>
                    </div>
                  </div>
                  <p class="mt-2 text-xs text-gray-500 flex items-start gap-1.5">
                    <i class="fa-solid fa-circle-info mt-0.5 text-blue-500"></i>
                    <span>Email là thông tin định danh không thể thay đổi. Quý khách vui lòng liên hệ CSKH nếu có nhu cầu chuyển đổi tài khoản.</span>
                  </p>
                </div>
              </div>

              <div class="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  :disabled="isLoading"
                  class="inline-flex items-center justify-center py-2.5 px-6 border border-transparent shadow-sm shadow-blue-500/30 text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  <i v-if="isLoading" class="fa-solid fa-spinner fa-spin mr-2"></i>
                  <i v-else class="fa-solid fa-check mr-2"></i>
                  Lưu thông tin
                </button>
              </div>
            </form>
          </div>

          <!-- Tab 2: Password Change Form -->
          <div v-if="activeTab === 'security'" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-fadeIn">
            <div class="border-b border-gray-100 pb-5 mb-6">
               <h3 class="text-xl font-bold text-gray-900">Đổi mật khẩu</h3>
               <p class="text-sm text-gray-500 mt-1">Đảm bảo tài khoản của bạn đang sử dụng một mật khẩu mạnh và an toàn.</p>
            </div>
            
            <form @submit.prevent="handleUpdatePassword" class="space-y-6">
              
              <div class="space-y-6 max-w-lg">
                <!-- Current Password -->
                <div>
                  <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1.5">Mật khẩu hiện tại <span class="text-red-500">*</span></label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <i class="fa-solid fa-lock text-gray-400"></i>
                    </div>
                    <input 
                      :type="passwordFieldType.current" 
                      id="currentPassword" 
                      v-model="passwordData.currentPassword"
                      class="block w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 focus:bg-white transition-all sm:text-sm"
                      placeholder="Nhập mật khẩu hiện tại"
                    />
                    <button 
                      type="button" 
                      class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-700 focus:outline-none"
                      @click="togglePassword('current')"
                    >
                      <i :class="passwordFieldType.current === 'password' ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
                    </button>
                  </div>
                </div>

                <!-- New Password -->
                <div>
                  <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1.5">Mật khẩu mới <span class="text-red-500">*</span></label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <i class="fa-solid fa-key text-gray-400"></i>
                    </div>
                    <input 
                      :type="passwordFieldType.new" 
                      id="newPassword" 
                      v-model="passwordData.newPassword"
                      class="block w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 focus:bg-white transition-all sm:text-sm"
                      placeholder="Nhập mật khẩu mới"
                    />
                    <button 
                      type="button" 
                      class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-700 focus:outline-none"
                      @click="togglePassword('new')"
                    >
                      <i :class="passwordFieldType.new === 'password' ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
                    </button>
                  </div>
                  <p class="mt-2 text-xs text-gray-500">Tối thiểu 6 ký tự, bao gồm ít nhất 1 chữ số và 1 ký tự đặc biệt (VD: @, #, $, ...).</p>
                </div>

                <!-- Confirm Password -->
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1.5">Xác nhận mật khẩu mới <span class="text-red-500">*</span></label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <i class="fa-solid fa-shield-halved text-gray-400"></i>
                    </div>
                    <input 
                      :type="passwordFieldType.confirm" 
                      id="confirmPassword" 
                      v-model="passwordData.confirmPassword"
                      class="block w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 focus:bg-white transition-all sm:text-sm"
                      placeholder="Nhập lại mật khẩu mới"
                    />
                    <button 
                      type="button" 
                      class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-700 focus:outline-none"
                      @click="togglePassword('confirm')"
                    >
                      <i :class="passwordFieldType.confirm === 'password' ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="pt-2 flex justify-start">
                <button 
                  type="submit" 
                  :disabled="isLoading"
                  class="inline-flex items-center justify-center py-2.5 px-6 border border-transparent shadow-sm shadow-gray-900/20 text-sm font-semibold rounded-xl text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  <i v-if="isLoading" class="fa-solid fa-spinner fa-spin mr-2"></i>
                  Cập nhật mật khẩu
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "../stores/useAuthStore";
import { useAxios } from "~/composables/useAxios";

useSeoMeta({
    title: "Chỉnh sửa hồ sơ | AnhEm Motor",
    description: "Quản lý thông tin cá nhân và tài khoản của bạn tại AnhEm Motor.",
});

const instance = useNuxtApp();
const authStore = useAuthStore();
const axios = useAxios();

const activeTab = ref('profile');
const isLoading = ref(false);
const isUploadingAvatar = ref(false);
const fileInput = ref(null);

const user = computed(() => authStore.user);

const genderOptions = [
  { value: 'Male', label: 'Nam' },
  { value: 'Female', label: 'Nữ' },
  { value: 'Other', label: 'Khác' }
];

const formData = ref({
    fullName: "",
    phoneNumber: "",
    gender: "",
});

const passwordData = ref({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
});

const passwordFieldType = ref({
    current: "password",
    new: "password",
    confirm: "password"
});

// Khởi tạo dữ liệu form
const initFormData = () => {
    if (user.value) {
        formData.value.fullName = user.value.fullName || "";
        formData.value.phoneNumber = user.value.phoneNumber || "";
        formData.value.gender = user.value.gender || "";
    }
};

onMounted(() => {
    initFormData();
});

function togglePassword(field) {
    passwordFieldType.value[field] =
        passwordFieldType.value[field] === "password" ? "text" : "password";
}

function triggerAvatarUpload() {
    if (fileInput.value) {
        fileInput.value.click();
    }
}

// Xử lý đổi Avatar
async function handleAvatarChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
        return instance.$toast.error("Vui lòng chọn file hình ảnh (jpg, png, webp)!");
    }
    
    if (file.size > 5 * 1024 * 1024) {
        return instance.$toast.error("Kích thước ảnh không được vượt quá 5MB!");
    }

    isUploadingAvatar.value = true;
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
        await axios.post("/api/v1/user/avatar", uploadData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        
        instance.$toast.success("Cập nhật ảnh đại diện thành công!");
        
        if (authStore.fetchUser) {
            await authStore.fetchUser();
        }
    } catch (error) {
        console.error("Avatar upload error:", error);
        instance.$toast.error("Lỗi khi cập nhật ảnh đại diện!");
    } finally {
        isUploadingAvatar.value = false;
        if(fileInput.value) fileInput.value.value = "";
    }
}

// Xử lý cập nhật thông tin
async function handleUpdateInfo() {
    if (!formData.value.fullName) {
        return instance.$toast.error("Vui lòng nhập họ và tên!");
    }
    if (!formData.value.gender) {
        return instance.$toast.error("Vui lòng chọn giới tính!");
    }

    isLoading.value = true;
    try {
        await axios.put("/api/v1/user/me", {
            fullName: formData.value.fullName,
            phoneNumber: formData.value.phoneNumber,
            gender: formData.value.gender,
        });
        
        instance.$toast.success("Cập nhật thông tin thành công!");
        
        if (authStore.fetchUser) {
            await authStore.fetchUser();
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.response?.data?.errors?.[0]?.message || "Đã xảy ra lỗi khi cập nhật thông tin.";
        instance.$toast.error(errorMessage);
    } finally {
        isLoading.value = false;
    }
}

// Xử lý đổi mật khẩu
async function handleUpdatePassword() {
    const data = passwordData.value;
    if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
        return instance.$toast.error("Vui lòng nhập đầy đủ thông tin mật khẩu!");
    }
    if (data.newPassword.length < 6) {
        return instance.$toast.error("Mật khẩu mới phải có ít nhất 6 ký tự!");
    }
    if (!/[^a-zA-Z0-9]/.test(data.newPassword)) {
        return instance.$toast.error("Mật khẩu mới phải chứa ít nhất 1 ký tự đặc biệt (không phải chữ hoặc số)!");
    }
    if (data.newPassword !== data.confirmPassword) {
        return instance.$toast.error("Mật khẩu xác nhận không khớp!");
    }
    if (data.newPassword === data.currentPassword) {
        return instance.$toast.error("Mật khẩu mới không được trùng với mật khẩu hiện tại!");
    }

    isLoading.value = true;
    try {
        await axios.post("/api/v1/user/change-password", {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        });
        
        instance.$toast.success("Đổi mật khẩu thành công!");
        passwordData.value = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        };
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.response?.data?.errors?.[0]?.message || "Mật khẩu hiện tại không chính xác hoặc không đủ điều kiện.";
        instance.$toast.error(errorMessage);
    } finally {
        isLoading.value = false;
    }
}
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
