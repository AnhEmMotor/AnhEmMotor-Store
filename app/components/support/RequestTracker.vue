<template>
  <section class="support-tracker">
    <div class="support-tracker__header">
      <div>
        <p>Theo dõi yêu cầu #{{ request?.id }}</p>
        <h3>{{ request?.subject || "Yêu cầu hỗ trợ của bạn" }}</h3>
      </div>
      <button type="button" :disabled="loading" @click="$emit('refresh')">
        <Icon
          name="ph:arrows-clockwise-bold"
          :class="{ 'animate-spin': loading }"
        />
        Cập nhật
      </button>
    </div>

    <div v-if="loading && !request" class="support-tracker__empty">
      Đang tải tiến độ hỗ trợ...
    </div>

    <template v-else-if="request">
      <div class="support-tracker__employee">
        <Icon name="ph:headset-fill" />
        <div>
          <span>Nhân viên phụ trách</span>
          <strong>{{
            request.assignedUserName || "Đang chờ phân công"
          }}</strong>
        </div>
      </div>

      <div class="support-tracker__steps">
        <div
          v-for="(step, index) in steps"
          :key="step.status"
          class="support-tracker__step"
          :class="{
            'is-complete': index < currentStepIndex,
            'is-current': index === currentStepIndex,
          }"
        >
          <div class="support-tracker__marker">
            <Icon
              :name="index < currentStepIndex ? 'ph:check-bold' : step.icon"
            />
          </div>
          <div>
            <strong>{{ step.label }}</strong>
            <span>{{ formatTime(step.value) }}</span>
          </div>
        </div>
      </div>

      <section v-if="request.status === 'Closed'" class="rating-history">
        <div class="rating-history__heading">
          <div>
            <span>Đánh giá dịch vụ</span>
            <h4>Lịch sử đánh giá</h4>
          </div>
          <Icon name="ph:star-fill" />
        </div>

        <article
          v-if="request.customerRatingOfEmployee != null"
          class="rating-history__item"
        >
          <div>
            <strong>Đánh giá nhân viên hỗ trợ</strong>
            <span>{{ formatTime(request.customerRatedAt) }}</span>
          </div>
          <div class="rating-history__score">
            <div class="rating-history__stars" aria-label="Số sao đã đánh giá">
              <Icon
                v-for="star in 5"
                :key="star"
                name="ph:star-fill"
                :class="{
                  'is-active': star <= request.customerRatingOfEmployee,
                }"
              />
            </div>
            <b>{{ request.customerRatingOfEmployee }}/5 sao</b>
          </div>
        </article>

        <div v-else-if="request.canCustomerRate" class="rating-history__action">
          <div>
            <strong>Đánh giá nhân viên hỗ trợ</strong>
            <span>Chọn số sao cho trải nghiệm hỗ trợ của bạn.</span>
          </div>
          <div class="rating-history__action-controls">
            <div
              class="rating-history__stars rating-history__stars--editable"
              aria-label="Điểm đánh giá từ 1 đến 5"
            >
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                :class="{ 'is-active': star <= rating }"
                @click="rating = star"
              >
                <Icon name="ph:star-fill" />
              </button>
            </div>
            <button
              type="button"
              class="rating-history__submit"
              :disabled="rating === 0 || ratingSubmitting"
              @click="$emit('rate', rating, '')"
            >
              {{ ratingSubmitting ? "Đang gửi..." : "Lưu số sao" }}
            </button>
          </div>
        </div>

        <p v-else class="rating-history__empty">Chưa có lượt đánh giá nào.</p>
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

defineEmits(["refresh", "rate"]);

const rating = ref(0);

watch(
  () => props.request?.customerRatingOfEmployee,
  (value) => {
    rating.value = value || 0;
  },
  { immediate: true },
);

const statusOrder = ["New", "Assigned", "InProgress", "Closed"];
const currentStepIndex = computed(() =>
  Math.max(0, statusOrder.indexOf(props.request?.status)),
);
const steps = computed(() => [
  {
    status: "New",
    label: "Đã tiếp nhận",
    icon: "ph:inbox-bold",
    value: props.request?.createdAt,
  },
  {
    status: "Assigned",
    label: "Đã phân công",
    icon: "ph:user-circle-check-bold",
    value: props.request?.assignedAt,
  },
  {
    status: "InProgress",
    label: "Đang hỗ trợ",
    icon: "ph:headset-bold",
    value: props.request?.startedAt,
  },
  {
    status: "Closed",
    label: "Hoàn tất",
    icon: "ph:seal-check-bold",
    value: props.request?.closedAt,
  },
]);

const formatTime = (value) => {
  if (!value) return "Chưa ghi nhận thời gian";
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
};
</script>

<style scoped>
.support-tracker {
  margin: 0 1.5rem 1.5rem;
  padding: 1.25rem;
  border: 1px solid rgb(229 231 235);
  border-radius: 1.5rem;
  background: rgb(255 255 255);
}
.support-tracker__header,
.support-tracker__employee,
.support-tracker__step {
  display: flex;
  align-items: center;
}
.support-tracker__header {
  gap: 1rem;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.support-tracker__header p,
.support-tracker__header h3,
.rating-history__heading h4 {
  margin: 0;
}
.support-tracker__header p,
.rating-history__heading span {
  color: rgb(220 38 38);
  font-size: 0.625rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.support-tracker__header h3,
.rating-history__heading h4 {
  color: rgb(17 24 39);
  font-size: 1rem;
  font-weight: 900;
}
.support-tracker__header button {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
  padding: 0.55rem 0.75rem;
  color: rgb(75 85 99);
  border-radius: 0.75rem;
  background: rgb(249 250 251);
  font-size: 0.68rem;
  font-weight: 800;
}
.support-tracker__employee {
  gap: 0.75rem;
  padding: 0.9rem;
  color: rgb(220 38 38);
  border-radius: 1rem;
  background: rgb(254 242 242);
}
.support-tracker__employee div,
.support-tracker__step > div:last-child,
.rating-history__item > div:first-child,
.rating-history__action > div:first-child {
  display: flex;
  min-width: 0;
  flex-direction: column;
}
.support-tracker__employee span,
.support-tracker__step span,
.rating-history__item span,
.rating-history__action span,
.rating-history__empty {
  color: rgb(107 114 128);
  font-size: 0.65rem;
}
.support-tracker__employee strong,
.support-tracker__step strong,
.rating-history__item strong,
.rating-history__action strong {
  color: rgb(31 41 55);
  font-size: 0.75rem;
}
.support-tracker__steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.65rem;
  margin-top: 1rem;
}
.support-tracker__step {
  gap: 0.65rem;
  padding: 0.75rem;
  border: 1px solid rgb(243 244 246);
  border-radius: 1rem;
  background: rgb(249 250 251);
}
.support-tracker__marker {
  display: grid;
  flex: 0 0 2rem;
  width: 2rem;
  height: 2rem;
  color: rgb(156 163 175);
  border-radius: 0.7rem;
  background: rgb(229 231 235);
  place-items: center;
}
.support-tracker__step.is-current {
  border-color: rgb(248 113 113);
  background: rgb(254 242 242);
}
.support-tracker__step.is-current .support-tracker__marker {
  color: white;
  background: rgb(220 38 38);
}
.support-tracker__step.is-complete .support-tracker__marker {
  color: white;
  background: rgb(22 163 74);
}
.rating-history {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgb(229 231 235);
}
.rating-history__heading,
.rating-history__item,
.rating-history__action,
.rating-history__score,
.rating-history__action-controls {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
}
.rating-history__heading {
  margin-bottom: 0.75rem;
  color: rgb(245 158 11);
}
.rating-history__heading > div {
  display: flex;
  flex-direction: column;
}
.rating-history__item,
.rating-history__action,
.rating-history__empty {
  padding: 0.9rem;
  border: 1px solid rgb(243 244 246);
  border-radius: 1rem;
  background: rgb(249 250 251);
}
.rating-history__stars {
  display: flex;
  gap: 0.22rem;
  color: rgb(209 213 219);
}
.rating-history__stars .is-active,
.rating-history__stars button.is-active {
  color: rgb(245 158 11);
}
.rating-history__stars--editable button {
  font-size: 1.35rem;
}
.rating-history__score b {
  color: rgb(31 41 55);
  font-size: 0.7rem;
  white-space: nowrap;
}
.rating-history__submit {
  padding: 0.65rem 0.85rem;
  color: white;
  border-radius: 0.7rem;
  background: rgb(220 38 38);
  font-size: 0.68rem;
  font-weight: 900;
}
.rating-history__submit:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.rating-history__empty {
  margin: 0;
  text-align: center;
}
.support-tracker__empty {
  padding: 1.5rem;
  color: rgb(107 114 128);
  font-size: 0.75rem;
  text-align: center;
}
@media (max-width: 639px) {
  .rating-history__item,
  .rating-history__action {
    align-items: flex-start;
    flex-direction: column;
  }
  .rating-history__action-controls {
    width: 100%;
  }
}
@media (min-width: 640px) {
  .support-tracker {
    margin-right: 2.5rem;
    margin-left: 2.5rem;
  }
  .support-tracker__steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .support-tracker__steps {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
