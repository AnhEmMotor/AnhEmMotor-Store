<script setup>
import { computed, ref } from 'vue';
import { newsService } from '@/services/news.service';
import homeService from '@/services/home.service';
import voucherService from '@/services/voucher.service';
import feedbackService from '@/services/feedback.service';

const activeSubTab = ref('news');

const subTabs = [
  { id: 'news', label: 'Tin tức', icon: 'fa6-solid:newspaper' },
  { id: 'promotions', label: 'Khuyến mãi', icon: 'fa6-solid:tag' },
  { id: 'vouchers', label: 'Kho Voucher', icon: 'fa6-solid:ticket' },
  { id: 'feedback', label: 'Phản hồi', icon: 'fa6-solid:comment-dots' },
];

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('vi-VN');
}

function getLatestReply(feedback) {
  return [...(feedback.contact?.replies || [])]
    .filter((reply) => !reply.isInternal)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]?.message;
}

const {
  data: sourceData,
  status,
  refresh,
} = await useAsyncData(
  'profile-notifications',
  async () => {
    const [news, promotions, vouchers, feedback] = await Promise.all([
      newsService.getLatestNews(),
      homeService.getBanners('Promotion'),
      voucherService.getPersonal(),
      feedbackService.getMine(),
    ]);

    return { news, promotions, vouchers, feedback };
  },
  {
    default: () => ({ news: [], promotions: [], vouchers: [], feedback: [] }),
  }
);

const notifications = computed(() => ({
  news: sourceData.value.news.map((item) => ({
    id: item.id,
    title: item.title,
    date: formatDate(item.createdAt),
    content: item.excerpt || item.content || 'Xem nội dung tin tức mới nhất từ AnhEm Motor.',
  })),
  promotions: sourceData.value.promotions.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.description || item.ctaLabel || 'Xem chương trình khuyến mãi đang áp dụng.',
    link: item.ctaLink,
  })),
  vouchers: sourceData.value.vouchers.map((item) => ({
    id: item.id,
    title: item.name,
    expiry: formatDate(item.validTo),
    code: item.code,
    status: new Date(item.validTo) >= new Date() ? 'Còn hạn' : 'Hết hạn',
  })),
  feedback: sourceData.value.feedback.map((item) => ({
    id: item.id,
    title: item.contact?.subject || `Phản hồi ${item.feedbackArea || ''}`.trim(),
    date: formatDate(item.createdAt),
    content: getLatestReply(item) || item.content,
    status: item.status,
  })),
}));

const isLoading = computed(() => status.value === 'pending');
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
    <div class="p-6 pb-5 border-b border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-5">Thông báo của tôi</h3>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="tab in subTabs"
          :key="tab.id"
          class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all"
          :class="
            activeSubTab === tab.id
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          "
          @click="activeSubTab = tab.id"
        >
          <Icon :name="tab.icon" />
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <Icon name="fa6-solid:spinner" class="animate-spin text-primary text-3xl" />
    </div>

    <div v-else class="p-6">
      <Transition name="fade" mode="out-in">
        <div :key="activeSubTab" class="space-y-3">
          <div v-if="activeSubTab !== 'vouchers'" class="space-y-3">
            <div
              v-if="notifications[activeSubTab].length === 0"
              class="flex flex-col items-center justify-center py-20 text-gray-400"
            >
              <Icon name="ph:bell-slash-bold" class="text-6xl mb-4 opacity-20" />
              <p>Không có thông báo nào trong mục này</p>
            </div>

            <div
              v-for="item in notifications[activeSubTab]"
              :key="item.id"
              class="group p-4 rounded-md border border-gray-100 bg-white transition-all hover:shadow-md"
            >
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-3">
                  <h4 class="font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {{ item.title }}
                  </h4>
                </div>
                <span class="text-xs text-gray-400 font-medium">
                  {{ item.date || item.expiry }}
                </span>
              </div>
              <p class="text-sm text-gray-600 line-clamp-2">
                {{ item.content }}
              </p>
              <div
                v-if="item.store"
                class="mt-3 flex items-center gap-2 text-xs font-semibold text-primary"
              >
                <Icon name="ph:storefront-bold" />
                {{ item.store }}
              </div>
            </div>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-if="notifications.vouchers.length === 0"
              class="md:col-span-2 flex flex-col items-center justify-center py-20 text-gray-400"
            >
              <Icon name="ph:ticket-bold" class="text-6xl mb-4 opacity-20" />
              <p>Bạn chưa có voucher nào đang khả dụng</p>
              <button
                class="mt-4 text-sm font-semibold text-primary hover:underline"
                @click="refresh"
              >
                Tải lại
              </button>
            </div>

            <div
              v-for="voucher in notifications.vouchers"
              :key="voucher.id"
              class="relative flex bg-white rounded-md border border-gray-100 overflow-hidden group hover:shadow-lg transition-all"
            >
              <div
                class="w-24 bg-primary/10 flex flex-col items-center justify-center p-4 gap-2 border-r border-dashed border-gray-200"
              >
                <Icon name="ph:ticket-bold" class="text-3xl text-primary" />
                <span class="text-[10px] font-bold text-primary uppercase">AnhEm</span>
              </div>

              <div class="flex-1 p-4">
                <h4 class="font-bold text-gray-900 text-sm mb-1">
                  {{ voucher.title }}
                </h4>
                <p class="text-xs text-gray-500 mb-3">Hết hạn: {{ voucher.expiry }}</p>

                <div class="flex items-center justify-between">
                  <div
                    class="px-2 py-1 bg-gray-100 rounded-md font-mono text-xs font-bold text-gray-700"
                  >
                    {{ voucher.code }}
                  </div>
                  <button class="text-xs font-bold text-primary hover:underline">
                    Sử dụng ngay
                  </button>
                </div>
              </div>

              <div
                class="absolute top-1/2 -translate-y-1/2 left-24 -translate-x-1/2 w-4 h-4 bg-white border border-gray-100 rounded-full"
              />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
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
