<script setup>
import { onMounted } from "vue";
import { useCart } from "~/composables/useCart";
import { useAuthStore } from "~/stores/auth.store";
import { useOrderStore } from "~/stores/order.store";

import CheckoutCartEmpty from "@/components/checkout/CheckoutCartEmpty.vue";
import CheckoutShippingForm from "@/components/checkout/CheckoutShippingForm.vue";
import CheckoutPaymentMethod from "@/components/checkout/CheckoutPaymentMethod.vue";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary.vue";

useSeoMeta({
  title: "Thanh Toan",
  description: "Hoan tat don hang cua ban tai AnhEm Motor.",
  ogTitle: "Thanh Toan",
  ogDescription: "Hoan tat don hang cua ban tai AnhEm Motor.",
  ogImage: "/assets/image/index/index-banner-bg.webp",
  twitterTitle: "Thanh Toan",
  twitterDescription: "Hoan tat don hang cua ban tai AnhEm Motor.",
  twitterImage: "/assets/image/index/index-banner-bg.webp",
});

useHead({
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

const { cartItems, clearCart } = useCart();
const authStore = useAuthStore();
const orderStore = useOrderStore();

onMounted(() => {
  orderStore.clearOrder();
  orderStore.initShippingInfo(authStore.user);
});

const handleCheckout = async () => {
  if (!orderStore.validateShippingInfo()) {
    const instance = useNuxtApp();
    instance.$toast.error("Vui long kiem tra lai thong tin nhan hang!");
    return;
  }
  try {
    const order = await orderStore.createOrder(cartItems.value);
    if (order?.id) {
      const instance = useNuxtApp();
      const paymentMethod = orderStore.selectedPaymentMethod;
      if (paymentMethod === "cod") {
        clearCart();
        instance.$toast.success("Dat hang thanh cong!");
        navigateTo(`/order-success?id=${order.id}`);
      } else {
        instance.$toast.info("Dang chuyen den trang thanh toan...");
        const url = await orderStore.getPaymentLink(order.id);
        if (url) {
          clearCart();
          window.location.href = url;
        } else {
          clearCart();
          navigateTo(`/order-success?id=${order.id}`);
        }
      }
    }
  } catch {
    const instance = useNuxtApp();
    instance.$toast.error(orderStore.error || "Co loi xay ra khi dat hang.");
  }
};
</script>

<template>
  <main class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ClientOnly>
        <CheckoutCartEmpty v-if="cartItems.length === 0" />

        <div v-else class="flex flex-col lg:flex-row gap-8">
          <div class="flex-1 space-y-6">
            <div
              class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <h1
                class="text-2xl font-black text-gray-900 flex items-center gap-3"
              >
                <Icon name="fa6-solid:truck-fast" class="text-red-600" />
                THONG TIN THANH TOAN
              </h1>
            </div>

            <CheckoutShippingForm />

            <CheckoutPaymentMethod
              v-model="orderStore.selectedPaymentMethod"
            />
          </div>

          <CheckoutOrderSummary @place-order="handleCheckout" />
        </div>

        <template #fallback>
          <div class="flex flex-col lg:flex-row gap-8 animate-pulse">
            <div class="flex-1 space-y-6">
              <div class="h-20 bg-gray-200 rounded-2xl" />
              <div class="h-64 bg-gray-200 rounded-3xl" />
              <div class="h-48 bg-gray-200 rounded-3xl" />
            </div>
            <div class="lg:w-[400px]">
              <div class="h-[500px] bg-gray-200 rounded-3xl" />
            </div>
          </div>
        </template>
      </ClientOnly>
    </div>
  </main>
</template>

<style scoped>
@reference "../assets/main.css";
</style>
