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

      <div v-if="request.canCustomerRate" class="support-tracker__rating">
        <p>Đánh giá nhân viên hỗ trợ</p>
        <div
          class="support-tracker__stars"
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
        <textarea
          v-model="comment"
          rows="3"
          maxlength="1000"
          placeholder="Chia sẻ trải nghiệm hỗ trợ của bạn"
        />
        <button
          type="button"
          class="support-tracker__submit"
          :disabled="rating === 0 || ratingSubmitting"
          @click="$emit('rate', rating, comment.trim())"
        >
          {{ ratingSubmitting ? "Đang gửi..." : "Gửi đánh giá" }}
        </button>
      </div>
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
const comment = ref("");

watch(
  () => props.request?.customerRatingOfEmployee,
  (value) => {
    rating.value = value || 0;
    comment.value = props.request?.customerRatingComment || "";
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
  if (!value) return "Chưa đến bước này";
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
.support-tracker__rating p {
  margin: 0;
}
.support-tracker__header p {
  color: rgb(220 38 38);
  font-size: 0.625rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.support-tracker__header h3 {
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
.support-tracker__employee div {
  display: flex;
  flex-direction: column;
}
.support-tracker__employee span,
.support-tracker__step span {
  color: rgb(107 114 128);
  font-size: 0.65rem;
}
.support-tracker__employee strong,
.support-tracker__step strong {
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
.support-tracker__step > div:last-child {
  display: flex;
  min-width: 0;
  flex-direction: column;
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
.support-tracker__rating {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background: rgb(249 250 251);
}
.support-tracker__rating p {
  color: rgb(17 24 39);
  font-size: 0.8rem;
  font-weight: 900;
}
.support-tracker__stars {
  display: flex;
  gap: 0.35rem;
}
.support-tracker__stars button {
  color: rgb(209 213 219);
  font-size: 1.4rem;
}
.support-tracker__stars button.is-active {
  color: rgb(245 158 11);
}
.support-tracker__rating textarea {
  padding: 0.75rem;
  border: 1px solid rgb(229 231 235);
  border-radius: 0.75rem;
  background: white;
  font-size: 0.75rem;
  resize: vertical;
}
.support-tracker__submit {
  padding: 0.75rem 1rem;
  color: white;
  border-radius: 0.75rem;
  background: rgb(220 38 38);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.support-tracker__submit:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.support-tracker__empty {
  padding: 1.5rem;
  color: rgb(107 114 128);
  font-size: 0.75rem;
  text-align: center;
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
