<script setup>
import { computed, ref, watch } from "vue";
import { useCart } from "~/composables/useCart";
import { useOrderStore } from "~/stores/order.store";
import orderMapper from "~/mappers/order.mapper";
import voucherService from "~/services/voucher.service";

const { cartItems, cartDetails, removeItem, _updateQuantity, isPending } =
  useCart();
const orderStore = useOrderStore();
const isChecking = ref(false);

const isSubmitting = computed(() => orderStore.isLoading);

const voucherCode = ref("");
const appliedVoucher = ref(null);
const voucherApplying = ref(false);
const voucherError = ref("");

const voucherDiscountAmount = computed(
  () => appliedVoucher.value?.discountAmount || 0
);

watch(
  () => cartDetails.value,
  () => {
    if (appliedVoucher.value) {
      appliedVoucher.value = null;
      voucherCode.value = "";
      orderStore.clearAppliedVoucher();
    }
  },
  { deep: true }
);

const orderSummary = computed(() =>
  orderMapper.calculateSummary(
    cartDetails.value,
    {
      orderValueExceeds: orderStore.settings.Order_value_exceeds,
      depositRatio: orderStore.settings.Deposit_ratio,
    },
    orderStore.calculatedShippingFee,
    voucherDiscountAmount.value
  )
);

const formatPrice = (val) => orderMapper.formatPrice(val);

async function handleApplyVoucher() {
  voucherError.value = "";
  appliedVoucher.value = null;
  const code = String(voucherCode.value || "").trim().toUpperCase();
  if (!code) {
    voucherError.value = "Vui lòng nhập mã voucher";
    return;
  }

  voucherApplying.value = true;
  try {
    const orderTotal = orderSummary.value.total;
    const voucher = await voucherService.getByCode(code);
    if (!voucher) {
      voucherError.value = "Mã voucher không tồn tại";
      return;
    }
    if (voucher.minOrderValue > 0 && orderTotal < voucher.minOrderValue) {
      voucherError.value =
        "Đơn hàng tối thiểu " +
        formatPrice(voucher.minOrderValue);
      return;
    }
    if (voucher.status && voucher.status !== "ACTIVE") {
      voucherError.value = "Mã voucher này không còn hoạt động";
      return;
    }
    const validation = await voucherService.validate(voucher.id, null);
    if (!validation || !validation.isValid) {
      voucherError.value = validation?.message || "Mã voucher không hợp lệ";
      return;
    }
    const result = await voucherService.apply(voucher.id, null);
    if (!result) {
      voucherError.value = "Không thể áp dụng voucher. Vui lòng thử lại";
      return;
    }
    appliedVoucher.value = {
      ...voucher,
      discountAmount: result.discountAmount || 0,
      orderVoucherId: result.orderVoucherId,
    };
    orderStore.setAppliedVoucher(appliedVoucher.value);
  } catch (e) {
    voucherError.value = e?.message || "Đã xảy ra lỗi khi áp dụng voucher";
  } finally {
    voucherApplying.value = false;
  }
}

async function handleRemoveVoucher() {
  if (!appliedVoucher.value?.orderVoucherId) return;
  const success = await voucherService.remove(appliedVoucher.value.orderVoucherId);
  if (success !== false) {
    appliedVoucher.value = null;
    voucherCode.value = "";
    orderStore.clearAppliedVoucher();
  }
}

function handlePlaceOrder() {
  emit("place-order");
}

const emit = defineEmits(["place-order"]);
</script>

<template>
  <div class="lg:w-[460px] space-y-6">
    <div
      class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-24"
    >
      <h3
        class="text-lg font-black text-gray-900 mb-6 uppercase tracking-wider flex items-center gap-2"
      >
        <Icon name="fa6-solid:receipt" class="text-red-600" />
        Tóm tắt đơn hàng
      </h3>

      <div class="space-y-5 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar mb-8">
        <template v-if="isPending && cartDetails.length === 0">
          <div v-for="i in cartItems.length || 3" :key="i" class="flex gap-4 animate-pulse">
            <div class="w-16 h-16 bg-gray-200 rounded-xl shrink-0" />
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 rounded w-3/4" />
              <div class="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </template>
        <template v-else>
          <div
            v-for="(item, index) in cartDetails"
            :key="item.id"
            class="flex flex-col gap-1 p-2 rounded-2xl transition-all border"
            :class="
              orderStore.fieldErrors[item.id]
                ? 'border-red-500 bg-red-50'
                : 'border-transparent'
            "
          >
            <div class="flex gap-4">
              <div class="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-cover"
                  @error="(e) => (e.target.src = '/assets/image/placeholder-product.webp')"
                >
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start">
                  <h5 class="text-sm font-bold text-gray-800 line-clamp-2 leading-snug">
                    {{ item.name }}
                  </h5>
                  <button
                    class="text-gray-400 hover:text-red-500 transition-colors ml-2 disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                    aria-label="Xóa sản phẩm này khỏi đơn hàng"
                    :disabled="isChecking || isSubmitting"
                    @click="removeItem(index)"
                  >
                    <Icon name="fa6-solid:trash-can" class="text-xs" />
                  </button>
                </div>
                <div class="flex flex-col items-start mt-1">
                  <p class="text-sm font-black text-red-600">
                    {{ formatPrice(item.price * item.quantity) }}
                  </p>
                </div>
                <div class="flex items-center gap-2 mt-2 bg-gray-100/50 p-1.5 rounded-lg w-fit">
                  <button
                    class="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-[10px] hover:bg-red-50 hover:text-red-500 transition-all font-black disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Giảm số lượng sản phẩm"
                    :disabled="isChecking || isSubmitting"
                    @click="handleUpdateQuantity(item, item.quantity - 1, index)"
                  >
                    -
                  </button>
                  <span class="text-xs font-bold min-w-[2rem] text-center px-1">{{ item.quantity }}</span>
                  <button
                    class="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-[10px] hover:bg-red-50 hover:text-red-500 transition-all font-black disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Tăng số lượng sản phẩm"
                    :disabled="isChecking || isSubmitting"
                    @click="handleUpdateQuantity(item, item.quantity + 1, index)"
                  >
                    +
                  </button>
                </div>
                <p v-if="orderStore.fieldErrors[item.id]" class="text-[9px] font-bold text-red-600 mt-1">
                  {{ orderStore.fieldErrors[item.id] }}
                </p>
              </div>
            </div>
            <p v-if="item.effectiveMax != null" class="mt-1 text-[10px] font-semibold text-gray-400">
              Tối đa {{ item.effectiveMax }} sản phẩm
            </p>
          </div>
        </template>
      </div>
    </div>

    <div class="space-y-6">
      <!-- Voucher input -->
      <div class="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <h3 class="text-lg font-black text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
          <Icon name="fa6-solid:ticket" class="text-red-600" />
          Mã giảm giá
        </h3>

        <div v-if="appliedVoucher" class="rounded-2xl border border-green-200 bg-green-50/70 p-4 space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Icon name="fa6-solid:circle-check" class="text-green-600" />
              <span class="text-sm font-bold text-green-800">
                {{ appliedVoucher.code }} - {{ appliedVoucher.name }}
              </span>
            </div>
            <button
              class="text-xs font-bold text-red-500 hover:text-red-700 transition-colors disabled:opacity-40"
              :disabled="removing"
              @click="handleRemoveVoucher"
            >
              <template v-if="removing">
                <Icon name="fa6-solid:circle-notch" class="animate-spin" />
              </template>
              <template v-else>
                Xóa
              </template>
            </button>
          </div>
          <p class="text-xs text-green-700">
            Giảm {{ formatPrice(appliedVoucher.discountAmount) }}
            <template v-if="appliedVoucher.discountType === 'PERCENT'">
              ({{ appliedVoucher.discountValue }}%)
            </template>
          </p>
        </div>

        <div v-else class="flex gap-3">
          <div class="flex-1 relative">
            <input
              v-model="voucherCode"
              type="text"
              placeholder="Nhập mã giảm giá"
              class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all uppercase"
              :class="{ 'border-red-300': voucherError }"
              :disabled="voucherApplying"
              @keyup.enter="handleApplyVoucher"
            >
          </div>
          <button
            class="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
            :disabled="voucherApplying"
            @click="handleApplyVoucher"
          >
            <template v-if="voucherApplying">
              <Icon name="fa6-solid:circle-notch" class="animate-spin" />
            </template>
            <template v-else>
              Áp dụng
            </template>
          </button>
        </div>

        <p v-if="voucherError" class="text-xs font-bold text-red-500 mt-2 flex items-center gap-1">
          <Icon name="fa6-solid:circle-exclamation" class="text-[10px]" />
          {{ voucherError }}
        </p>
      </div>

      <!-- Summary with discount -->
      <div class="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <div class="space-y-4">
          <div class="flex justify-between text-sm">
            <span class="text-gray-500 font-medium">Tạm tính</span>
            <span class="font-bold text-gray-900">{{ formatPrice(orderSummary.subtotal) }}</span>
          </div>

          <div v-if="appliedVoucher" class="flex justify-between text-sm">
            <span class="text-green-600 font-medium">Giảm giá</span>
            <span class="font-bold text-green-600">-{{ formatPrice(appliedVoucher.discountAmount) }}</span>
          </div>

          <div v-if="orderSummary.shipping !== null" class="flex justify-between text-sm">
            <span class="text-gray-500 font-medium">Phí giao hàng</span>
            <span v-if="orderStore.isCalculatingShipping" class="flex gap-2 items-center text-gray-400">
              <Icon name="fa6-solid:circle-notch" class="animate-spin" />
              Đang tính...
            </span>
            <span v-else class="font-bold text-gray-900">{{ orderSummary.shipping === 0 ? "Miễn phí" : formatPrice(orderSummary.shipping) }}</span>
          </div>

          <div
            v-if="orderSummary.requiresDeposit"
            class="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 space-y-3"
          >
            <div class="flex items-center gap-2 text-amber-700">
              <Icon name="fa6-solid:circle-info" class="text-sm" />
              <span class="text-xs font-black uppercase tracking-widest">Đơn hàng cần đặt cọc</span>
            </div>
            <p class="text-xs font-medium text-amber-800 leading-relaxed">
              Đơn hàng vượt ngưỡng áp dụng đặt cọc. Bạn chỉ cần thanh toán {{ orderSummary.depositRatio }}% trước, phần còn lại thanh toán sau.
            </p>
            <div class="flex justify-between text-sm">
              <span class="text-amber-700 font-bold">Tiền đặt cọc</span>
              <span class="font-black text-amber-900">{{ formatPrice(orderSummary.depositAmount) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-amber-700 font-bold">Còn lại</span>
              <span class="font-black text-amber-900">{{ formatPrice(orderSummary.remainingAmount) }}</span>
            </div>
          </div>

          <div class="flex justify-between pt-6 border-t border-gray-100">
            <span class="text-lg font-black text-gray-900 uppercase">
              {{ orderSummary.requiresDeposit ? "Thanh toán hôm nay" : "Tổng cộng" }}
            </span>
            <span class="text-xl font-black text-red-600">{{ formatPrice(orderSummary.payableNow) }}</span>
          </div>
        </div>
      </div>

      <!-- Place order button -->
      <div class="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <button
          class="w-full py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
          aria-label="Xác nhận và đặt hàng ngay"
          :disabled="isSubmitting"
          @click="handlePlaceOrder"
        >
          <Icon name="fa6-solid:lock" class="text-xs" />
          <span>Xác nhận đặt hàng</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-200 rounded-full;
}
</style>
