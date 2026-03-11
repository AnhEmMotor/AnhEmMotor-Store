<template>
  <teleport to="body">
    <div v-if="show" class="checkout-modal">
      <div class="checkout-modal-content" role="dialog" aria-modal="true">
        <header class="checkout-header flex items-center justify-between">
          <h3 class="text-lg font-semibold flex items-center gap-3">
            <i class="fas fa-credit-card text-red-600 mr-2"></i>
            <span>Chọn phương thức thanh toán</span>
          </h3>
          <button class="close-btn" @click="$emit('close')" aria-label="Đóng">×</button>
        </header>

        <div class="checkout-body">
          <section class="payment-methods" aria-label="Phương thức thanh toán">
            <div
              v-for="method in methods"
              :key="method.key"
              role="button"
              tabindex="0"
              class="pm-card"
              :class="{ selected: selectedMethod === method.key }"
              @click="$emit('update:selectedMethod', method.key)"
            >
              <div class="pm-icon" :style="{ background: method.color }">{{ method.icon }}</div>
              <div class="pm-meta">
                <h5 class="font-semibold">{{ method.title }}</h5>
                <p class="text-sm text-gray-600">{{ method.description }}</p>
                <small class="text-sm text-gray-500">{{ method.note }}</small>
              </div>
              <div class="pm-check"> 
                <i v-if="selectedMethod === method.key" class="fas fa-check-circle text-red-600"></i>
              </div>
            </div>
          </section>

          <section class="order-summary bg-gray-50 p-4 rounded-lg mt-4">
            <h5 class="font-semibold text-gray-800 mb-2"><i class="fas fa-receipt text-red-600 mr-2"></i>Tóm tắt đơn hàng</h5>

            <div id="checkout-items-list" class="mt-3 space-y-3 max-h-48 overflow-auto">
              <div v-for="item in cart" :key="item.id" class="flex items-center gap-3 bg-white p-3 rounded">
                <img :src="item.image" :alt="item.name" class="w-12 h-12 object-cover rounded" />
                <div class="flex-1">
                  <span class="block font-semibold text-gray-800">{{ item.name }}</span>
                  <span class="text-sm text-gray-500">x{{ item.quantity }}</span>
                </div>
                <span class="font-semibold text-red-600">{{ formatCurrency(item.price * item.quantity) }}</span>
              </div>
            </div>

            <div class="mt-4 space-y-2">
              <div class="flex justify-between"><span>Tạm tính:</span><span>{{ formatCurrency(subtotal) }}</span></div>
              <div class="flex justify-between"><span>Phí vận chuyển:</span><span>{{ shipping === 0 ? 'Miễn phí' : formatCurrency(shipping) }}</span></div>
              <div v-if="selectedMethod === 'cod'" class="flex justify-between"><span>Phí COD:</span><span>{{ formatCurrency(codFee) }}</span></div>
              <div class="mt-3 p-3 bg-white rounded border-t">
                <div v-if="requiresDeposit" class="space-y-2">
                  <div class="flex justify-between"><span>Tổng giá trị:</span><span>{{ formatCurrency(checkoutTotal) }}</span></div>
                  <div class="flex justify-between text-red-600"><span>Tiền đặt cọc (10%):</span><span>{{ formatCurrency(depositAmount) }}</span></div>
                  <div class="flex justify-between"><span>Tiền còn lại:</span><span>{{ formatCurrency(checkoutTotal - depositAmount) }}</span></div>
                </div>
                <div v-else class="flex justify-between"><span>Tổng cộng:</span><span class="text-right font-semibold">{{ formatCurrency(checkoutTotal) }}</span></div>
              </div>
            </div>
          </section>
        </div>

        <footer class="checkout-footer flex items-center justify-end gap-3">
          <button class="btn-cancel" @click="$emit('close')">Hủy</button>
          <button class="btn-confirm primary" @click="$emit('confirm')">Xác nhận thanh toán</button>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script setup>
defineProps({
  show: Boolean,
  cart: { type: Array, default: () => [] },
  subtotal: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  codFee: { type: Number, default: 0 },
  checkoutTotal: { type: Number, default: 0 },
  requiresDeposit: { type: Boolean, default: false },
  depositAmount: { type: Number, default: 0 },
  selectedMethod: { type: String, default: null },
})

// declare emits so parent can listen without warnings
defineEmits(['close', 'confirm', 'update:selectedMethod'])

function formatCurrency(value) {
  if (typeof value !== 'number') return ''
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

const methods = [
  { key: 'bank', title: 'Chuyển khoản ngân hàng', description: 'Chuyển khoản qua ATM, Internet Banking hoặc Mobile Banking', note: 'Thời gian xử lý: Ngay lập tức', color: '#dc2626', icon: '🏦' },
  { key: 'momo', title: 'Ví điện tử MoMo', description: 'Thanh toán nhanh chóng qua ví MoMo', note: 'Thời gian xử lý: Ngay lập tức', color: '#fb7185', icon: '📱' },
  { key: 'zalopay', title: 'ZaloPay', description: 'Thanh toán an toàn với ZaloPay', note: 'Thời gian xử lý: Ngay lập tức', color: '#2563eb', icon: '💳' },
  { key: 'cod', title: 'Thanh toán khi nhận hàng (COD)', description: 'Thanh toán bằng tiền mặt khi nhận hàng', note: 'Phí COD: 30,000 VNĐ', color: '#16a34a', icon: '💵' },
]
</script>

<style scoped>
.checkout-modal { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.45); z-index: 9999; }
.checkout-modal-content { background: #fff; border-radius: 10px; width: 96%; max-width: 980px; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 12px 30px rgba(0,0,0,0.16); }
.checkout-header { padding: 16px 20px; border-bottom: 1px solid #f3f4f6; }
.close-btn { background: transparent; border: none; font-size: 20px; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; }
.checkout-body { padding: 18px 20px; overflow: auto; }
.payment-methods { display: flex; flex-direction: column; gap: 10px; }
.pm-card { display: flex; align-items: center; gap: 12px; padding: 14px; border-radius: 10px; border: 1px solid #e5e7eb; background: white; cursor: pointer; }
.pm-card:hover { box-shadow: 0 8px 20px rgba(0,0,0,0.06); }
.pm-card.selected { border-color: #dc2626; background: #fff7f6; box-shadow: 0 8px 28px rgba(220,38,38,0.08); }
.pm-icon { width: 60px; height: 60px; border-radius: 10px; display:flex; align-items:center; justify-content:center; color: #fff; font-size: 20px; }
.pm-meta { flex: 1; }
.pm-check { width: 36px; text-align: center; }
.order-summary { padding: 10px; }
#checkout-items-list { max-height: 190px; overflow:auto; }
.checkout-footer { padding: 12px 20px; border-top: 1px solid #f3f4f6; }
.btn-cancel { background: transparent; border: 1px solid #e5e7eb; color: #374151; padding: 8px 14px; border-radius: 8px; }
.btn-confirm.primary { background: #dc2626; color: white; padding: 10px 16px; border-radius: 8px; border: none; box-shadow: 0 6px 18px rgba(220, 38, 38, 0.18); }
.btn-confirm.primary:hover { filter: brightness(0.95); }
</style>
