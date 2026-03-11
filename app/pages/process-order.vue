<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useCart } from "~/composables/useCart";

useSeoMeta({
	title: "Giỏ Hàng | AnhEm Motor",
	description: "Xem và quản lý giỏ hàng của bạn tại AnhEm Motor.",
});

const { cartItems, fetchCart, clearCart } = useCart();
const cart = cartItems;
const isCheckoutModalVisible = ref(false);
const isConfirmationModalVisible = ref(false);
const selectedPaymentMethod = ref(null);
const paymentInfoHtml = ref("");
const orderId = ref("");
const invoiceData = ref(null);

const totalCartItems = computed(() =>
	cart.value.reduce((sum, item) => sum + item.quantity, 0),
);
const subtotal = computed(() =>
	cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
);
const shipping = computed(() => (subtotal.value > 10000000 ? 0 : 200000));
const total = computed(() => subtotal.value + shipping.value);
const codFee = computed(() =>
	selectedPaymentMethod.value === "cod" ? 30000 : 0,
);
const checkoutTotal = computed(
	() => subtotal.value + shipping.value + codFee.value,
);
const requiresDeposit = computed(() => subtotal.value > 15000000);
const depositAmount = computed(() =>
	requiresDeposit.value ? Math.round(subtotal.value * 0.1) : 0,
);

function formatCurrency(value) {
	return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

function updateQuantity(productId, newQuantity) {
	const quantity = parseInt(newQuantity, 10);
	if (isNaN(quantity)) return;
	if (quantity > 3) {
		alert(
			"Số lượng mỗi sản phẩm chỉ có thể mua tối đa là 3. Để mua số lượng lớn hơn, vui lòng liên hệ trực tiếp tại cửa hàng.",
		);
		return;
	}
	if (quantity <= 0) {
		removeFromCart(productId);
		return;
	}
	const item = cart.value.find((i) => i.id === productId);
	if (item) item.quantity = quantity;
}

function removeFromCart(productId) {
	const idx = cart.value.findIndex((i) => i.id === productId);
	if (idx !== -1) cart.value.splice(idx, 1);
}

function proceedToCheckout() {
	if (cart.value.length === 0) {
		alert("Giỏ hàng của bạn đang trống!");
		return;
	}
	orderId.value = `DH${Date.now()}`;
	paymentInfoHtml.value = "";
	isCheckoutModalVisible.value = true;
}

function closeCheckoutModal() {
	isCheckoutModalVisible.value = false;
	selectedPaymentMethod.value = null;
}

function confirmPayment() {
	if (!selectedPaymentMethod.value) {
		alert("Vui lòng chọn phương thức thanh toán!");
		return;
	}
	const totalWithFees = checkoutTotal.value;
	let paymentInfo = "";
	switch (selectedPaymentMethod.value) {
		case "bank": {
			const bankAmount = requiresDeposit.value
				? depositAmount.value
				: totalWithFees;
			paymentInfo = `<h4>Thông tin chuyển khoản:</h4><div class="bank-info"><p><strong>Ngân hàng:</strong> Vietcombank</p><p><strong>Số tài khoản:</strong> 1234567890</p><p><strong>Chủ tài khoản:</strong> CONG TY TNHH ANHEM MOTOR</p><p><strong>Số tiền:</strong> ${formatCurrency(bankAmount)}</p><p><strong>Nội dung:</strong> ${orderId.value}</p></div>`;
			break;
		}
		case "momo": {
			const momoAmount = requiresDeposit.value
				? depositAmount.value
				: totalWithFees;
			paymentInfo = `<h4>Thanh toán MoMo:</h4><p>Số điện thoại: <strong>0123456789</strong></p><p>Tên: <strong>AnhEm Motor</strong></p><p>Số tiền: <strong>${formatCurrency(momoAmount)}</strong></p><p>Nội dung: <strong>${orderId.value}</strong></p>`;
			break;
		}
		case "zalopay": {
			const zalopayAmount = requiresDeposit.value
				? depositAmount.value
				: totalWithFees;
			paymentInfo = `<h4>Thanh toán ZaloPay:</h4><p>Số điện thoại: <strong>0123456789</strong></p><p>Tên: <strong>AnhEm Motor</strong></p><p>Số tiền: <strong>${formatCurrency(zalopayAmount)}</strong></p><p>Nội dung: <strong>${orderId.value}</strong></p>`;
			break;
		}
		case "cod": {
			const codAmount = requiresDeposit.value
				? totalWithFees - depositAmount.value
				: totalWithFees;
			paymentInfo = `<h4>Thanh toán khi nhận hàng:</h4><p>Đơn hàng của bạn sẽ được giao trong 2-3 ngày làm việc.</p><p>Vui lòng chuẩn bị: <strong>${formatCurrency(codAmount)}</strong></p><p>Chúng tôi sẽ liên hệ xác nhận đơn hàng trong vòng 24 giờ.</p>`;
			break;
		}
	}
	paymentInfoHtml.value = paymentInfo;
	closeCheckoutModal();
	isConfirmationModalVisible.value = true;
}

function onPaymentConfirmationClose() {
	isConfirmationModalVisible.value = false;
	clearCart();
	invoiceData.value = {
		orderId: orderId.value,
		date: new Date(),
		cart: JSON.parse(JSON.stringify(cart.value)),
		totals: {
			subtotal: subtotal.value,
			shipping: shipping.value,
			codFee: codFee.value,
			total: checkoutTotal.value,
			requiresDeposit: requiresDeposit.value,
			depositAmount: depositAmount.value,
		},
		paymentMethod: selectedPaymentMethod.value,
	};
}

watch(
	cart,
	() => {
		window.dispatchEvent(
			new CustomEvent("cart-updated", { detail: totalCartItems.value }),
		);
	},
	{ deep: true },
);

onMounted(async () => {
	await fetchCart();
});
</script>

<template>
	<main
		class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 min-h-[calc(100vh-150px)]"
	>
		<div class="bg-white p-4 sm:p-8 rounded-xl shadow mb-8 text-center">
			<h1 class="text-xl sm:text-2xl font-semibold text-gray-800">
				<i class="fas fa-shopping-cart text-red-600 mr-2" />Giỏ Hàng Của Bạn
			</h1>
			<p class="text-gray-500 text-sm sm:text-base mt-1">
				Quản lý các sản phẩm trong giỏ hàng của bạn
			</p>
		</div>

		<CartPaymentConfirmationModal
			:show="isConfirmationModalVisible"
			:order-id="orderId"
			:payment-info-html="paymentInfoHtml"
			@close="onPaymentConfirmationClose"
		/>

		<CartCheckoutModal
			:show="isCheckoutModalVisible"
			:cart="cart"
			:subtotal="subtotal"
			:shipping="shipping"
			:cod-fee="codFee"
			:checkout-total="checkoutTotal"
			:requires-deposit="requiresDeposit"
			:deposit-amount="depositAmount"
			:selected-method="selectedPaymentMethod"
			@close="closeCheckoutModal"
			@update:selectedMethod="(m) => (selectedPaymentMethod = m)"
			@confirm="confirmPayment"
		/>

		<div class="cart-content">
			<div v-if="cart.length === 0" class="text-center py-16 text-gray-500">
				<i class="fas fa-shopping-cart text-4xl mb-4" />
				<h3 class="text-lg sm:text-xl font-semibold mb-2">
					Giỏ hàng của bạn đang trống
				</h3>
				<p class="mb-4 text-sm sm:text-base">
					Hãy thêm một số sản phẩm vào giỏ hàng để tiếp tục mua sắm
				</p>
				<NuxtLink
					to="/motorcycles"
					class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full inline-flex items-center gap-2 text-sm sm:text-base"
				>
					<i class="fas fa-shopping-bag" /> Tiếp tục mua sắm
				</NuxtLink>
			</div>
			<table v-else class="w-full table-fixed">
				<thead>
					<tr class="text-sm sm:text-base">
						<th class="p-2 sm:p-4 text-left">Sản phẩm</th>
						<th class="p-2 sm:p-4 text-center">Giá</th>
						<th class="p-2 sm:p-4 text-center">Số lượng</th>
						<th class="p-2 sm:p-4 text-center">Tổng</th>
						<th class="p-2 sm:p-4 text-center">Thao tác</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="item in cart"
						:key="item.id"
						class="border-b last:border-b-0"
					>
						<td class="py-2 sm:py-4 px-1 sm:px-2">
							<div class="flex items-center gap-2 sm:gap-4">
								<img
									:src="item.image"
									:alt="item.name"
									class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-200"
								/>
								<div>
									<h5 class="text-gray-800 font-semibold text-sm sm:text-base">
										{{ item.name }}
									</h5>
									<small class="text-gray-500 text-xs sm:text-sm"
										>Mã SP: {{ item.id.toUpperCase() }}</small
									>
								</div>
							</div>
						</td>
						<td class="py-2 sm:py-4 px-1 sm:px-2 align-top text-center">
							<span class="text-red-600 font-bold text-base sm:text-lg">{{
								formatCurrency(item.price)
							}}</span>
						</td>
						<td class="py-2 sm:py-4 px-1 sm:px-2 align-top text-center">
							<div
								class="flex items-center gap-1 sm:gap-2 bg-gray-100 rounded-full px-1 sm:px-2 py-0.5 sm:py-1 w-max mx-auto"
							>
								<button
									class="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 text-xs sm:text-sm"
									@click="updateQuantity(item.id, item.quantity - 1)"
								>
									<i class="fas fa-minus" />
								</button>
								<input
									type="number"
									class="w-10 sm:w-14 text-center bg-transparent outline-none text-sm sm:text-base"
									:value="item.quantity"
									min="1"
									max="3"
									@change="
										updateQuantity(item.id, parseInt($event.target.value) || 1)
									"
								/>
								<button
									class="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 text-xs sm:text-sm"
									@click="updateQuantity(item.id, item.quantity + 1)"
								>
									<i class="fas fa-plus" />
								</button>
							</div>
						</td>
						<td class="py-2 sm:py-4 px-1 sm:px-2 align-top text-center">
							<span class="text-red-600 font-bold text-base sm:text-lg">{{
								formatCurrency(item.price * item.quantity)
							}}</span>
						</td>
						<td class="py-2 sm:py-4 px-1 sm:px-2 align-top text-center">
							<button
								class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 mx-auto text-xs sm:text-sm"
								@click="removeFromCart(item.id)"
							>
								<i class="fas fa-trash" /> Xóa
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div
			v-if="cart.length > 0"
			class="bg-gray-50 p-4 sm:p-6 rounded-xl mt-6 sm:mt-8"
		>
			<h4 class="text-base sm:text-lg font-semibold text-gray-800 mb-4">
				<i class="fas fa-calculator text-red-600 mr-2" />Tổng kết đơn hàng
			</h4>
			<div class="flex justify-between py-2 border-b text-sm sm:text-base">
				<span>Tạm tính:</span>
				<span>{{ formatCurrency(subtotal) }}</span>
			</div>
			<div class="flex justify-between py-2 border-b text-sm sm:text-base">
				<span>Phí vận chuyển:</span>
				<span>{{
					shipping === 0 ? "Miễn phí" : formatCurrency(shipping)
				}}</span>
			</div>
			<small
				v-if="shipping === 0"
				class="text-green-600 block mb-2 mt-2 text-xs sm:text-sm"
			>
				<i class="fas fa-gift" /> Bạn được miễn phí vận chuyển!
			</small>
			<div class="flex justify-between py-4 border-b text-sm sm:text-base">
				<span class="font-bold">Tổng cộng:</span>
				<span class="font-bold text-red-600">{{ formatCurrency(total) }}</span>
			</div>
			<div class="flex gap-3 sm:gap-4 mt-4 sm:mt-6 flex-wrap justify-center">
				<NuxtLink
					to="/motorcycles"
					class="border-2 border-red-600 text-red-600 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-red-50 inline-flex items-center gap-2 text-sm sm:text-base"
				>
					<i class="fas fa-arrow-left" /> Tiếp tục mua sắm
				</NuxtLink>
				<button
					class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold inline-flex items-center gap-2 text-sm sm:text-base"
					@click.prevent="proceedToCheckout"
				>
					<i class="fas fa-credit-card" /> Thanh toán
				</button>
			</div>
		</div>
	</main>
</template>

