<script setup>
import { computed, onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { useOrderStore } from "~/stores/order.store";
import { formatCurrency } from "~/utils/currency";
import { toast } from "vue3-toastify";

const route = useRoute();
const orderStore = useOrderStore();
const { depositSettings } = useStoreSettings();
const orderId = computed(() => route.query.id);

if (import.meta.server) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const { data: order, pending: isLoading } = await useAsyncData(
  `order-success-${orderId.value}`,
  async () => {
    if (!orderId.value) return null;
    const fetched = await orderStore.fetchOrderDetail(orderId.value);
    return fetched;
  },
  { watch: [orderId], server: false },
);

const isOnlinePayment = computed(
  () =>
    order.value &&
    order.value.paymentMethod &&
    order.value.paymentMethod.toLowerCase() !== "cod",
);

onMounted(() => {
  if (!order.value) return;
  const status = order.value.statusId || order.value.status;
  if (
    isOnlinePayment.value &&
    ["pending", "waiting_deposit"].includes(status)
  ) {
    navigateTo({
      path: "/payment-unavailable",
      query: {
        id: order.value.id,
        method: order.value.paymentMethod,
        reason: "unpaid",
      },
      replace: true,
    });
  }
});



const totalAmount = computed(() => Number(order.value?.totalAmount || 0));
const depositThreshold = computed(() =>
  Number(depositSettings.value?.orderValueExceeds || 0),
);
const depositRatio = computed(() =>
  Number(order.value?.depositRatio || depositSettings.value?.depositRatio || 0),
);

const requiresDeposit = computed(
  () =>
    totalAmount.value > 0 &&
    depositThreshold.value > 0 &&
    depositRatio.value > 0 &&
    totalAmount.value >= depositThreshold.value,
);

const payableNow = computed(() =>
  requiresDeposit.value
    ? Math.round((totalAmount.value * depositRatio.value) / 100)
    : totalAmount.value,
);

const remainingAmount = computed(() =>
  requiresDeposit.value ? Math.max(totalAmount.value - payableNow.value, 0) : 0,
);

useSeoMeta({
  title: "Đặt hàng thành công",
  description: "Cảm ơn bạn đã mua hàng tại AnhEm Motor.",
});

const printInvoice = () => {
  if (typeof window !== "undefined") {
    window.print();
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// VAT invoice request states
const showInvoiceForm = ref(false);
const isSubmittingInvoice = ref(false);
const invoiceForm = reactive({
  companyName: "",
  companyAddress: "",
  companyTaxCode: "",
  companyEmail: "",
  budgetCode: "",
});
const invoiceErrors = reactive({
  companyName: "",
  companyAddress: "",
  companyTaxCode: "",
  companyEmail: "",
  budgetCode: "",
});

const validateInvoiceForm = () => {
  let isValid = true;
  invoiceErrors.companyName = "";
  invoiceErrors.companyAddress = "";
  invoiceErrors.companyTaxCode = "";
  invoiceErrors.companyEmail = "";
  invoiceErrors.budgetCode = "";

  if (!invoiceForm.companyName.trim()) {
    invoiceErrors.companyName = "Tên công ty không được để trống.";
    isValid = false;
  }
  if (!invoiceForm.companyAddress.trim()) {
    invoiceErrors.companyAddress = "Địa chỉ công ty không được để trống.";
    isValid = false;
  }
  if (!invoiceForm.companyTaxCode.trim()) {
    invoiceErrors.companyTaxCode = "Mã số thuế không được để trống.";
    isValid = false;
  } else {
    const taxRegex = /^\d{3}$|^\d{10}$|^\d{13}$|^\d{10}-\d{3}$/;
    if (!taxRegex.test(invoiceForm.companyTaxCode.trim())) {
      invoiceErrors.companyTaxCode = "Mã số thuế không hợp lệ. Nhập đúng 3 chữ số hoặc MST chuẩn (10/13 số).";
      isValid = false;
    }
  }

  if (invoiceForm.companyEmail.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(invoiceForm.companyEmail.trim())) {
      invoiceErrors.companyEmail = "Email không đúng định dạng.";
      isValid = false;
    }
  }

  return isValid;
};

const submitInvoiceRequest = async () => {
  if (!validateInvoiceForm()) return;
  isSubmittingInvoice.value = true;
  try {
    const payload = {
      companyName: invoiceForm.companyName.trim(),
      companyAddress: invoiceForm.companyAddress.trim(),
      companyTaxCode: invoiceForm.companyTaxCode.trim(),
      companyEmail: invoiceForm.companyEmail.trim() || null,
      budgetCode: invoiceForm.budgetCode.trim() || null,
    };
    await orderStore.updateOrderCompanyInvoice(order.value.id, payload);
    await orderStore.fetchOrderDetail(order.value.id);
    toast.success("Gửi yêu cầu xuất hóa đơn công ty thành công!");
    showInvoiceForm.value = false;
  } catch (err) {
    const msg = err.response?.data?.message || err.message || "Đã có lỗi xảy ra, vui lòng thử lại.";
    toast.error(msg);
  } finally {
    isSubmittingInvoice.value = false;
  }
};
</script>

<template>
  <main class="min-h-screen bg-gray-50 py-12 md:py-20">
    <div class="max-w-3xl mx-auto px-4">
      <ClientOnly>
        <div v-if="isLoading" class="text-center py-20">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"
          />
          <p
            class="mt-4 text-gray-500 font-bold uppercase tracking-widest text-xs"
          >
            Đang tải thông tin đơn hàng...
          </p>
        </div>

        <div v-if="order" class="space-y-8 animate-in zoom-in duration-500">
          <div
            id="printable-receipt"
            class="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-100 text-center space-y-8"
          >
            <!-- Header Hóa Đơn (Chỉ hiển thị khi in ra giấy/PDF) -->
            <div class="hidden print:flex items-center justify-between border-b-2 border-gray-100 pb-6 mb-6 text-left">
              <div>
                <h2 class="text-xl font-black text-red-600 uppercase tracking-widest">AnhEm Motor</h2>
                <p class="text-[10px] text-gray-500 font-bold uppercase mt-1">Hệ thống xe máy chính hãng</p>
                <p class="text-[9px] text-gray-400 font-medium mt-0.5">Hotline: 090 123 4567 | Website: anhemmotor.com</p>
              </div>
              <div class="text-right">
                <h3 class="text-base font-black text-gray-900 uppercase">Hóa đơn đặt hàng</h3>
                <p class="text-[10px] text-gray-500 font-bold mt-1">Mã đơn: #{{ order.orderCode || order.id }}</p>
                <p class="text-[9px] text-gray-400 font-medium mt-0.5">Ngày tạo: {{ formatDate(order.createdAt) }}</p>
              </div>
            </div>

            <div
              class="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg shadow-green-500/20 print:hidden"
            >
              <Icon name="fa6-solid:check" />
            </div>

            <div class="space-y-3 print:hidden">
              <h1
                class="text-3xl md:text-4xl font-black text-gray-900 uppercase"
              >
                Đặt hàng thành công!
              </h1>
              <div
                v-if="order.statusId === 'waiting_deposit'"
                class="space-y-2"
              >
                <p class="text-blue-600 font-bold max-w-md mx-auto">
                  Đơn hàng
                  <span class="text-red-600">#{{ order.orderCode }}</span> cần
                  được đặt cọc để xác nhận.
                </p>
                <p class="text-gray-500 text-sm max-w-sm mx-auto">
                  Vui lòng liên hệ hotline hoặc thanh toán ngay qua cổng online
                  để thực hiện đặt cọc
                  <span class="font-bold text-gray-900"
                    >{{ order.depositRatio }}%</span
                  >
                  giá trị đơn.
                </p>
              </div>
              <div
                v-else-if="order.statusId === 'deposit_paid'"
                class="space-y-2"
              >
                <p class="text-green-600 font-bold max-w-md mx-auto">
                  Đã nhận tiền đặt cọc cho đơn hàng
                  <span class="text-red-600">#{{ order.orderCode }}</span
                  >!
                </p>
                <p class="text-gray-500 text-sm max-w-sm mx-auto">
                  Cảm ơn bạn đã đặt cọc. Đơn hàng của bạn đang được nhân viên
                  xác nhận và chuẩn bị.
                </p>
              </div>
              <div
                v-else-if="order.statusId === 'paid_processing'"
                class="space-y-2"
              >
                <p class="text-green-600 font-bold max-w-md mx-auto">
                  Thanh toán thành công đơn hàng
                  <span class="text-red-600">#{{ order.orderCode }}</span
                  >!
                </p>
                <p class="text-gray-500 text-sm max-w-sm mx-auto">
                  Hệ thống đã ghi nhận thanh toán toàn bộ. Đơn hàng của bạn đang
                  được xử lý nhanh nhất có thể.
                </p>
              </div>
              <p v-else class="text-gray-500 font-medium max-w-md mx-auto">
                Chúc mừng! Đơn hàng
                <span class="text-red-600 font-black"
                  >#{{ order.orderCode }}</span
                >
                của bạn đã được tiếp nhận và đang chờ xử lý.
              </p>
            </div>

            <div
              class="bg-gray-50 rounded-[2.5rem] border border-gray-100 overflow-hidden text-left"
            >
              <div class="p-6 md:p-8 space-y-6">
                <h3
                  class="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"
                >
                  <Icon name="fa6-solid:receipt" class="text-red-500" />
                  Tóm tắt đơn hàng
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="space-y-4">
                    <div class="space-y-1">
                      <p
                        class="text-[10px] font-black text-gray-400 uppercase tracking-tighter"
                      >
                        Người nhận
                      </p>
                      <p class="text-sm font-bold text-gray-900">
                        {{ order.customer?.name }}
                      </p>
                    </div>
                    <div class="space-y-1">
                      <p
                        class="text-[10px] font-black text-gray-400 uppercase tracking-tighter"
                      >
                        Số điện thoại
                      </p>
                      <p class="text-sm font-bold text-gray-900">
                        {{ order.customer?.phone }}
                      </p>
                    </div>
                    <div class="space-y-1">
                      <p
                        class="text-[10px] font-black text-gray-400 uppercase tracking-tighter"
                      >
                        Địa chỉ
                      </p>
                      <p
                        class="text-sm font-medium text-gray-600 leading-relaxed italic"
                      >
                        {{ order.customer?.address }}
                      </p>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <div class="space-y-1">
                      <p
                        class="text-[10px] font-black text-gray-400 uppercase tracking-tighter"
                      >
                        Thanh toán
                      </p>
                      <p class="text-sm font-bold text-gray-900">
                        {{ order.paymentMethod || "COD" }}
                      </p>
                    </div>
                    <div class="space-y-1">
                      <p
                        class="text-[10px] font-black text-gray-400 uppercase tracking-tighter"
                      >
                        Tổng tiền
                      </p>
                      <p class="text-xl font-black text-red-600">
                        {{ formatCurrency(order.totalAmount) }}
                      </p>
                    </div>
                    <div class="space-y-1">
                      <p
                        class="text-[10px] font-black text-gray-400 uppercase tracking-tighter"
                      >
                        Số tiền cần thanh toán
                      </p>
                      <p class="text-lg font-black text-red-600">
                        {{ formatCurrency(payableNow) }}
                        <span
                          v-if="requiresDeposit"
                          class="text-xs text-gray-400 font-bold"
                        >
                          ({{ depositRatio }}%)
                        </span>
                      </p>
                    </div>
                    <template v-if="requiresDeposit">
                      <div class="space-y-1">
                        <p
                          class="text-[10px] font-black text-gray-400 uppercase tracking-tighter"
                        >
                          Còn lại
                        </p>
                        <p class="text-sm font-bold text-gray-900">
                          {{ formatCurrency(remainingAmount) }}
                        </p>
                      </div>
                    </template>
                  </div>
                </div>

                <!-- Danh sách sản phẩm -->
                <div v-if="order.items && order.items.length" class="border-t border-gray-200/60 pt-6 mt-6">
                  <h4 class="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Icon name="fa6-solid:cubes" class="text-red-500 text-sm" />
                    Danh sách sản phẩm
                  </h4>
                  <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs font-medium text-gray-700 border-collapse">
                      <thead>
                        <tr class="border-b border-gray-200 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                          <th class="py-2.5">Sản phẩm</th>
                          <th class="py-2.5 text-center w-20">Số lượng</th>
                          <th class="py-2.5 text-right w-28">Đơn giá</th>
                          <th class="py-2.5 text-right w-32">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in order.items" :key="item.id" class="border-b border-gray-100 last:border-0">
                          <td class="py-3">
                            <div class="font-bold text-gray-900">{{ item.name }}</div>
                            <div class="text-[10px] text-gray-500 font-semibold mt-0.5">
                              Phiên bản: {{ item.productVariantName }}
                              <span v-if="item.colorName"> - Màu: {{ item.colorName }}</span>
                            </div>
                          </td>
                          <td class="py-3 text-center font-bold text-gray-900 text-sm">{{ item.quantity }}</td>
                          <td class="py-3 text-right text-gray-600 text-sm">{{ formatCurrency(item.price) }}</td>
                          <td class="py-3 text-right font-bold text-gray-900 text-sm">{{ formatCurrency(item.price * item.quantity) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Yêu cầu xuất hóa đơn công ty (VAT) -->
              <div v-if="order.isCompanyInvoice && order.companyName" class="border-t border-gray-100 pt-6 mt-6">
                <div class="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-left space-y-4">
                  <div class="flex items-center gap-2 text-blue-700 font-bold text-sm uppercase">
                    <Icon name="fa6-solid:circle-info" class="text-blue-500 shrink-0" />
                    Đã ghi nhận yêu cầu xuất hóa đơn công ty
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs text-blue-800 font-medium">
                    <div><span class="text-blue-500 font-bold uppercase tracking-wider">Tên công ty:</span> <span class="font-bold text-gray-900">{{ order.companyName }}</span></div>
                    <div><span class="text-blue-500 font-bold uppercase tracking-wider">Mã số thuế:</span> <span class="font-bold text-gray-900">{{ order.companyTaxCode }}</span></div>
                    <div class="md:col-span-2"><span class="text-blue-500 font-bold uppercase tracking-wider">Địa chỉ:</span> <span class="font-bold text-gray-900">{{ order.companyAddress }}</span></div>
                    <div v-if="order.companyEmail"><span class="text-blue-500 font-bold uppercase tracking-wider">Email nhận HĐ:</span> <span class="font-bold text-gray-900">{{ order.companyEmail }}</span></div>
                    <div v-if="order.budgetCode"><span class="text-blue-500 font-bold uppercase tracking-wider">Mã ngân sách:</span> <span class="font-bold text-gray-900">{{ order.budgetCode }}</span></div>
                  </div>

                  <!-- Nút in hóa đơn PDF -->
                  <div class="pt-3 border-t border-blue-100/50 flex justify-end">
                    <button 
                      @click="printInvoice"
                      class="print-hide inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-xs uppercase tracking-wider cursor-pointer shadow-md shadow-blue-600/10"
                    >
                      <Icon name="fa6-solid:file-pdf" class="text-sm" />
                      Xuất hóa đơn PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 pt-4 print-hide">
            <NuxtLink
              to="/products"
              class="flex-1 py-4.5 bg-gray-100 text-gray-700 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase text-xs tracking-widest text-center"
            >
              Tiếp tục mua sắm
            </NuxtLink>
            <NuxtLink
              to="/orders"
              class="flex-1 py-4.5 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 shadow-xl shadow-red-600/20 transition-all transform hover:-translate-y-1 active:scale-95 uppercase text-xs tracking-widest text-center"
            >
              Xem đơn hàng của tôi
            </NuxtLink>
          </div>

          <p class="text-center text-gray-400 text-xs font-medium print-hide">
            Một email xác nhận đã được gửi đến bạn. Nếu có thắc mắc, vui lòng
            liên hệ hotline
            <a href="tel:0901234567" class="text-red-500 font-bold"
              >090 123 4567</a
            >.
          </p>
        </div>

        <div
          v-else-if="!isLoading && orderId"
          class="text-center py-20 bg-white rounded-[3rem] shadow-xl border border-gray-100 animate-in fade-in duration-500 px-8"
        >
          <div
            class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Icon name="fa6-solid:box-open" class="text-4xl text-gray-300" />
          </div>
          <h2 class="text-2xl font-black text-gray-900 mb-2 uppercase">
            Không tìm thấy đơn hàng
          </h2>
          <p class="text-gray-500 font-medium mb-8 max-w-sm mx-auto">
            Rất tiếc, chúng tôi không thể tìm thấy thông tin chi tiết cho đơn
            hàng #{{ orderId }}.
          </p>
          <NuxtLink
            to="/products"
            class="inline-flex items-center px-10 py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all uppercase text-xs tracking-widest"
          >
            Quay lại mua sắm
          </NuxtLink>
        </div>
      </ClientOnly>
    </div>
  </main>
</template>

<style>
@media print {
  @page {
    margin: 5mm !important;
  }

  html, body {
    width: 210mm !important;
    height: 297mm !important;
  }

  /* Force override global visibility restrictions */
  #printable-receipt,
  #printable-receipt * {
    visibility: visible !important;
  }

  /* Force override animations, transitions, and opacities so they don't hide print content */
  *, *:before, *:after {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }

  /* Reset layout constraints (flex columns, min-heights, overflows) which collapse under print engines */
  html, body, #__nuxt, #__layout, .flex, .min-h-screen, main {
    display: block !important;
    height: auto !important;
    min-height: auto !important;
    overflow: visible !important;
    position: static !important;
    background: white !important;
  }

  /* Hide headers, footers, navigation, floating widgets, and print-hide elements */
  header, footer, nav, aside, .print-hide, .CommonFloatingContact, .LayoutTheHeader, .LayoutTheFooter {
    display: none !important;
  }
  
  body {
    background-color: white !important;
    color: black !important;
  }

  main {
    padding: 0 !important;
    background-color: white !important;
  }

  /* Make sure the receipt container spans full page without shadows/borders */
  #printable-receipt {
    border: none !important;
    box-shadow: none !important;
    padding: 1rem !important;
    margin: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    display: block !important;
    font-size: 14px !important;
  }

  /* Force 2 columns grid on print to save vertical space */
  #printable-receipt .grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 1.5rem !important;
  }

  /* Scale font size and adjust line height for perfect readability */
  #printable-receipt p,
  #printable-receipt span,
  #printable-receipt td,
  #printable-receipt th,
  #printable-receipt div {
    font-size: 14px !important;
    line-height: 1.6 !important;
  }

  #printable-receipt h2 {
    font-size: 24px !important;
  }

  #printable-receipt h3 {
    font-size: 20px !important;
  }

  #printable-receipt h4 {
    font-size: 16px !important;
  }

  /* Tighten paddings/margins to fit exactly in one A4 portrait page */
  #printable-receipt .p-6,
  #printable-receipt .p-8,
  #printable-receipt .p-12 {
    padding: 1.25rem !important;
  }

  #printable-receipt .space-y-6 > :not([hidden]) ~ :not([hidden]),
  #printable-receipt .space-y-8 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 1rem !important;
  }

  #printable-receipt .mt-6,
  #printable-receipt .pt-6 {
    margin-top: 1rem !important;
    padding-top: 1rem !important;
  }
}
</style>
