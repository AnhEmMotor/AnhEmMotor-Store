<template>
  <section
    class="mx-6 mb-8 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden"
  >
    <div
      class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"
    />

    <div class="flex items-center justify-between mb-8 relative z-10">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-3">
          <span class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span class="text-[10px] font-black uppercase tracking-widest text-primary"
            >Yêu cầu #{{ request?.id }}</span
          >
        </div>
        <h3 class="text-xl font-black text-gray-900">
          {{ request?.subject || 'Yêu cầu hỗ trợ của bạn' }}
        </h3>
      </div>
      <button
        type="button"
        :disabled="loading"
        class="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl text-xs font-bold transition-colors disabled:opacity-50 group"
        @click="$emit('refresh')"
      >
        <Icon
          name="ph:arrows-clockwise-bold"
          :class="{ 'animate-spin': loading }"
          class="text-base group-hover:-rotate-45 transition-transform"
        />
        Cập nhật
      </button>
    </div>

    <div
      v-if="loading && !request"
      class="py-12 flex flex-col items-center justify-center text-gray-400"
    >
      <Icon name="ph:spinner-gap-bold" class="animate-spin text-4xl mb-4 text-primary/50" />
      <span class="text-sm font-medium tracking-wide">Đang tải tiến độ hỗ trợ...</span>
    </div>

    <template v-else-if="request">
      <div
        class="flex items-center gap-4 p-4 mb-8 bg-gradient-to-r from-red-50 to-white rounded-2xl border border-red-100/50 relative z-10"
      >
        <div
          class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0"
        >
          <Icon name="ph:headset-fill" class="text-2xl text-primary" />
        </div>
        <div>
          <span class="text-xs font-bold text-red-400 uppercase tracking-wider block mb-1"
            >Nhân viên phụ trách</span
          >
          <strong class="text-base font-black text-gray-900">{{
            request.assignedUserName || 'Đang chờ phân công'
          }}</strong>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 relative z-10">
        <div
          v-for="(step, index) in steps"
          :key="step.status"
          class="relative p-5 rounded-2xl border transition-all duration-300"
          :class="[
            index === currentStepIndex
              ? 'bg-red-50 border-red-200 shadow-md shadow-red-100/50 scale-[1.02]'
              : index < currentStepIndex
                ? 'bg-gray-50 border-gray-100'
                : 'bg-white border-gray-100 opacity-60',
          ]"
        >
          <div
            class="w-10 h-10 rounded-xl mb-3 flex items-center justify-center transition-colors"
            :class="[
              index === currentStepIndex
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : index < currentStepIndex
                  ? 'bg-green-500 text-white shadow-md shadow-green-500/20'
                  : 'bg-gray-100 text-gray-400',
            ]"
          >
            <Icon :name="index < currentStepIndex ? 'ph:check-bold' : step.icon" class="text-xl" />
          </div>
          <div>
            <strong class="block text-sm font-black text-gray-900 mb-1">{{ step.label }}</strong>
            <span class="text-xs font-medium text-gray-500">{{ formatTime(step.value) }}</span>
          </div>
        </div>
      </div>

      <section
        v-if="request.status === 'Closed'"
        class="mt-8 pt-8 border-t border-gray-100 relative z-10"
      >
        <div class="flex items-center justify-between mb-6">
          <div>
            <span
              class="text-[10px] font-black uppercase tracking-widest text-orange-500 block mb-1"
              >Đánh giá dịch vụ</span
            >
            <h4 class="text-lg font-black text-gray-900">Lịch sử đánh giá</h4>
          </div>
          <div
            class="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center"
          >
            <Icon name="ph:star-fill" class="text-xl" />
          </div>
        </div>

        <article
          v-if="request.customerRatingOfEmployee != null"
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl"
        >
          <div>
            <strong class="block text-sm font-black text-gray-900 mb-1"
              >Đánh giá nhân viên hỗ trợ</strong
            >
            <span class="text-xs font-medium text-gray-500">{{
              formatTime(request.customerRatedAt)
            }}</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex gap-1 text-gray-200">
              <Icon
                v-for="star in 5"
                :key="star"
                name="ph:star-fill"
                class="text-lg"
                :class="{ 'text-orange-500': star <= request.customerRatingOfEmployee }"
              />
            </div>
            <b
              class="text-sm font-black text-gray-900 bg-white px-2 py-1 rounded-lg border border-gray-100"
              >{{ request.customerRatingOfEmployee }}/5 sao</b
            >
          </div>
        </article>

        <div
          v-else-if="request.canCustomerRate"
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl shadow-sm"
        >
          <div>
            <strong class="block text-sm font-black text-gray-900 mb-1"
              >Đánh giá nhân viên hỗ trợ</strong
            >
            <span class="text-xs font-medium text-gray-500"
              >Chọn số sao cho trải nghiệm hỗ trợ của bạn.</span
            >
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div class="flex gap-1.5 text-gray-200">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                class="text-2xl hover:scale-110 transition-transform focus:outline-none"
                :class="{ 'text-orange-500': star <= rating }"
                @click="rating = star"
              >
                <Icon name="ph:star-fill" />
              </button>
            </div>
            <button
              type="button"
              class="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
              :disabled="rating === 0 || ratingSubmitting"
              @click="$emit('rate', rating, '')"
            >
              {{ ratingSubmitting ? 'Đang gửi...' : 'Lưu đánh giá' }}
            </button>
          </div>
        </div>

        <p v-else class="text-center text-sm font-medium text-gray-400 py-6">
          Chưa có lượt đánh giá nào.
        </p>
      </section>
    </template>
  </section>
</template>

<script setup>
const props = defineProps({
  request: { type: Object, default: null },
  loading: { type: Boolean, default: false },
  ratingSubmitting: { type: Boolean, default: false },
});

defineEmits(['refresh', 'rate']);

const rating = ref(0);

watch(
  () => props.request?.customerRatingOfEmployee,
  (value) => {
    rating.value = value || 0;
  },
  { immediate: true }
);

const statusOrder = ['New', 'Assigned', 'InProgress', 'Closed'];
const currentStepIndex = computed(() => Math.max(0, statusOrder.indexOf(props.request?.status)));
const steps = computed(() => [
  {
    status: 'New',
    label: 'Đã tiếp nhận',
    icon: 'ph:envelope-simple-bold',
    value: props.request?.createdAt,
  },
  {
    status: 'Assigned',
    label: 'Đã phân công',
    icon: 'ph:user-circle-check-bold',
    value: props.request?.assignedAt,
  },
  {
    status: 'InProgress',
    label: 'Đang hỗ trợ',
    icon: 'ph:headset-bold',
    value: props.request?.startedAt,
  },
  {
    status: 'Closed',
    label: 'Hoàn tất',
    icon: 'ph:seal-check-bold',
    value: props.request?.closedAt,
  },
]);

const formatTime = (value) => {
  if (!value) return 'Chưa ghi nhận thời gian';
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
};
</script>

<style scoped></style>
