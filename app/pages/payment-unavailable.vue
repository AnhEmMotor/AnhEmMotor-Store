<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useOrderStore } from "~/stores/order.store";

const route = useRoute();
const orderStore = useOrderStore();
const isRetrying = ref(false);
const retryError = ref("");

const orderId = computed(() => route.query.id);
const paymentMethod = computed(() => {
  const method = String(route.query.method || "").toLowerCase();
  if (method === "vnpay") return "VNPay";
  if (method === "payos") return "PayOS";
  return "cổng thanh toán";
});

const reasonMessage = computed(() => {
  switch (route.query.reason) {
    case "cancelled":
      return "Bạn đã rời hoặc hủy phiên thanh toán. Đơn hàng vẫn được giữ lại.";
    case "failed":
      return "Giao dịch chưa thành công. Đơn hàng vẫn được giữ để bạn thanh toán lại.";
    case "verification":
      return "Chưa thể xác nhận kết quả thanh toán với hệ thống.";
    case "invalid":
      return "Thông tin trả về từ cổng thanh toán không hợp lệ.";
    default:
      return `${paymentMethod.value} chưa sẵn sàng hoặc chưa được cấu hình đầy đủ.`;
  }
});

async function retryPayment() {
  if (!orderId.value) return;
  isRetrying.value = true;
  retryError.value = "";
  try {
    const url = await orderStore.getPaymentLink(orderId.value);
    if (!url) {
      throw new Error("Không nhận được đường dẫn thanh toán.");
    }
    window.location.href = url;
  } catch (error) {
    retryError.value =
      error.response?.data?.errors?.[0]?.message ||
      error.response?.data?.message ||
      error.message ||
      `Không thể mở ${paymentMethod.value}.`;
  } finally {
    isRetrying.value = false;
  }
}

useSeoMeta({
  title: "Chưa hoàn tất thanh toán",
  description: "Tiếp tục thanh toán đơn hàng tại AnhEm Motor.",
});
</script>

<template>
  <main class="min-h-screen bg-gray-50 py-16 md:py-24">
    <div class="max-w-2xl mx-auto px-4">
      <div
        class="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-12 text-center space-y-8"
      >
        <div
          class="w-24 h-24 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-4xl shadow-lg shadow-amber-500/10"
        >
          <Icon name="fa6-solid:clock" />
        </div>

        <div class="space-y-3">
          <h1 class="text-3xl md:text-4xl font-black text-gray-900 uppercase">
            Chưa hoàn tất thanh toán
          </h1>
          <p class="text-gray-600 font-medium leading-relaxed">
            {{ reasonMessage }}
          </p>
          <p v-if="orderId" class="text-sm text-gray-400 font-bold">
            Mã đơn hàng: #{{ orderId }}
          </p>
        </div>

        <div
          class="rounded-2xl bg-blue-50 border border-blue-100 p-5 text-left"
        >
          <p class="text-sm text-blue-800 font-medium leading-relaxed">
            Đây không phải trang xác nhận thanh toán thành công. Khi thử lại,
            hệ thống sẽ mở trực tiếp trang thanh toán chính thức của
            {{ paymentMethod }}.
          </p>
        </div>

        <p v-if="retryError" class="text-sm text-red-600 font-bold">
          {{ retryError }}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NuxtLink
            to="/orders"
            class="py-4 bg-gray-100 text-gray-700 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase text-xs tracking-widest"
          >
            Xem đơn hàng
          </NuxtLink>
          <button
            v-if="orderId"
            class="py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 shadow-xl shadow-red-600/20 transition-all uppercase text-xs tracking-widest disabled:opacity-50"
            :disabled="isRetrying"
            @click="retryPayment"
          >
            {{ isRetrying ? "Đang mở cổng..." : `Thanh toán qua ${paymentMethod}` }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
