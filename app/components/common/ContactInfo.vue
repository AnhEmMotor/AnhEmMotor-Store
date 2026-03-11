<template>
  <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 md:p-8 my-8 shadow-md">
    <h3 class="text-2xl font-bold text-primary-red mb-6 text-center">
      {{ title }}
    </h3>
    
    <div class="space-y-4 text-gray-700">
      <p v-if="description" class="mb-4">{{ description }}</p>
      
      <div v-if="contactInfo.hotline" class="flex items-start gap-3">
        <i class="fas fa-phone-alt text-primary-red mt-1"></i>
        <div>
          <strong>Số điện thoại chăm sóc khách hàng (miễn phí):</strong>
          <span class="text-primary-red font-bold ml-2">{{ contactInfo.hotline }}</span>
          <p v-if="contactInfo.workingHours" class="text-sm text-gray-600 mt-1">
            {{ contactInfo.workingHours }}
          </p>
        </div>
      </div>
      
      <div v-if="contactInfo.email" class="flex items-start gap-3">
        <i class="fas fa-envelope text-primary-red mt-1"></i>
        <div>
          <strong>Email:</strong>
          <a 
            :href="`mailto:${contactInfo.email}`" 
            class="text-blue-600 hover:underline ml-2"
          >
            {{ contactInfo.email }}
          </a>
        </div>
      </div>
      
      <div v-if="contactInfo.website" class="flex items-start gap-3">
        <i class="fas fa-globe text-primary-red mt-1"></i>
        <div>
          <strong>Website:</strong>
          <a 
            :href="contactInfo.website" 
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline ml-2"
          >
            {{ contactInfo.website }}
          </a>
        </div>
      </div>
      
      <div v-if="contactInfo.fanpage" class="flex items-start gap-3">
        <i class="fab fa-facebook text-primary-red mt-1"></i>
        <div>
          <strong>Fanpage:</strong>
          <a 
            :href="`https://${contactInfo.fanpage}`" 
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline ml-2"
          >
            {{ contactInfo.fanpage }}
          </a>
        </div>
      </div>

      <!-- Financial Companies Table -->
      <div v-if="financialCompanies && financialCompanies.length > 0" class="mt-6">
        <p class="italic mb-3">Danh sách các công ty tài chính áp dụng trong CTKM:</p>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse rounded-lg overflow-hidden shadow">
            <thead>
              <tr class="bg-primary-red text-white">
                <th class="p-3 text-left text-sm font-bold">STT</th>
                <th class="p-3 text-left text-sm font-bold">Công ty tài chính (CTTC)</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(company, index) in financialCompanies" 
                :key="index"
                class="border-b border-gray-200 hover:bg-red-50 transition-colors"
                :class="{ 'bg-red-50': index % 2 === 0 }"
              >
                <td class="p-3">{{ index + 1 }}</td>
                <td class="p-3">{{ company }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p v-if="closingText" class="mt-6 font-semibold">
        {{ closingText }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactInfo',
  props: {
    title: {
      type: String,
      default: 'Thông tin liên hệ'
    },
    description: {
      type: String,
      default: ''
    },
    contactInfo: {
      type: Object,
      required: true
    },
    financialCompanies: {
      type: Array,
      default: () => []
    },
    closingText: {
      type: String,
      default: 'Xin trân trọng cảm ơn!'
    }
  }
};
</script>

<style scoped>
.text-primary-red {
  color: #E65151;
}

.bg-primary-red {
  background-color: #E65151;
}
</style>