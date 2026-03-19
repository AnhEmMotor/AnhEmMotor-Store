<script setup>
import { ref, computed, onMounted } from "vue";
import { useCart } from "~/composables/useCart";
import { useAuthStore } from "~/stores/useAuthStore";
import { useAxios } from "~/composables/useAxios";

useSeoMeta({
	title: "Thanh Toán",
	description: "Hoàn tất đơn hàng của bạn tại AnhEm Motor.",
	ogTitle: "Thanh Toán",
	ogDescription: "Hoàn tất đơn hàng của bạn tại AnhEm Motor.",
	ogImage: "/assets/image/index/index-banner-bg.webp",
	twitterTitle: "Thanh Toán",
	twitterDescription: "Hoàn tất đơn hàng của bạn tại AnhEm Motor.",
	twitterImage: "/assets/image/index/index-banner-bg.webp",
});

useHead({
	link: [
		{
			rel: "icon",
			type: "image/x-icon",
			href: "/favicon.ico",
		},
	],
});

const {
	cartItems,
	cartDetails,
	isPending,
	clearCart,
	updateQuantity,
	removeItem,
} = useCart();
const authStore = useAuthStore();
const axios = useAxios();

const isLoggedIn = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.user);

const isSubmitting = ref(false);
const orderSuccess = ref(false);
const confirmedOrder = ref(null);

const shippingInfo = ref({
	fullName: "",
	phone: "",
	address: "",
	notes: "",
});

const errors = ref({
	fullName: "",
	phone: "",
	address: "",
});

function validateForm() {
	let isValid = true;
	errors.value = { fullName: "", phone: "", address: "" };

	if (!shippingInfo.value.fullName?.trim()) {
		errors.value.fullName = "Vui lòng nhập họ và tên người nhận";
		isValid = false;
	}
	if (!shippingInfo.value.phone?.trim()) {
		errors.value.phone = "Vui lòng nhập số điện thoại nhận hàng";
		isValid = false;
	}
	if (!shippingInfo.value.address?.trim()) {
		errors.value.address = "Vui lòng nhập địa chỉ giao hàng chi tiết";
		isValid = false;
	}

	return isValid;
}

const subtotal = computed(() =>
	cartDetails.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
);
const shipping = computed(() => (subtotal.value > 10000000 ? 0 : 200000));
const total = computed(() => subtotal.value + shipping.value);

function formatCurrency(value) {
	if (!value) return "0 ₫";
	return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

async function handlePlaceOrder() {
	const instance = useNuxtApp();

	if (!isLoggedIn.value) {
		instance.$toast.error("Vui lòng đăng nhập để đặt hàng!");
		return;
	}

	if (!validateForm()) {
		instance.$toast.error("Vui lòng kiểm tra lại thông tin nhận hàng!");
		return;
	}

	isSubmitting.value = true;

	try {
		const payload = {
			customerName: shippingInfo.value.fullName,
			customerPhone: shippingInfo.value.phone,
			customerAddress: shippingInfo.value.address,
			notes: shippingInfo.value.notes,
			products: cartItems.value.map((item) => ({
				productId: item.id,
				count: item.quantity,
			})),
		};

		const { data } = await axios.post("/api/v1/SalesOrders", payload);

		if (data) {
			confirmedOrder.value = data;
			orderSuccess.value = true;
			clearCart();
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	} catch {
		isSubmitting.value = false;
	} finally {
		isSubmitting.value = false;
	}
}

onMounted(async () => {
	if (!isLoggedIn.value && import.meta.client) {
		navigateTo("/login?redirect=/process-order");
		return;
	}

	if (user.value) {
		shippingInfo.value.fullName =
			user.value.fullName || user.value.userName || "";
		shippingInfo.value.phone = user.value.phoneNumber || "";
		shippingInfo.value.address = user.value.address || "";
	}
});
</script>

<template>
	<main class="min-h-screen bg-gray-50 py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<ClientOnly>
				<div
					v-if="!orderSuccess && cartItems.length === 0"
					class="py-20 text-center"
				>
					<div
						class="w-24 h-24 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
					>
						<i class="fas fa-shopping-cart" />
					</div>
					<h2 class="text-2xl font-black text-gray-900 mb-2">
						Giỏ hàng của bạn đang trống
					</h2>
					<p class="text-gray-500 mb-8">
						Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.
					</p>
					<NuxtLink
						to="/products"
						class="inline-flex items-center px-8 py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 uppercase text-sm tracking-widest"
					>
						Quay lại mua sắm
					</NuxtLink>
				</div>

				<div v-else-if="!orderSuccess" class="flex flex-col lg:flex-row gap-8">
					<div class="flex-1 space-y-6">
						<div
							class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
						>
							<h1
								class="text-2xl font-black text-gray-900 flex items-center gap-3"
							>
								<i class="fas fa-shipping-fast text-red-600" />
								THÔNG TIN THANH TOÁN
							</h1>
						</div>

						<div
							class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6"
						>
							<h3
								class="text-lg font-bold text-gray-800 flex items-center gap-2"
							>
								<span
									class="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center text-sm"
									>1</span
								>
								Thông tin nhận hàng
							</h3>

							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div class="space-y-2">
									<label
										class="text-xs font-black text-gray-400 uppercase tracking-widest"
										>Họ và tên</label
									>
									<input
										v-model="shippingInfo.fullName"
										type="text"
										placeholder="Nhập họ và tên người nhận"
										class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm"
										:class="{ '!border-red-500 !bg-red-50': errors.fullName }"
										@input="errors.fullName = ''"
									>
									<p
										v-if="errors.fullName"
										class="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase tracking-tighter"
									>
										{{ errors.fullName }}
									</p>
								</div>
								<div class="space-y-2">
									<label
										class="text-xs font-black text-gray-400 uppercase tracking-widest"
										>Số điện thoại</label
									>
									<input
										v-model="shippingInfo.phone"
										type="tel"
										placeholder="Nhập số điện thoại"
										class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm"
										:class="{ '!border-red-500 !bg-red-50': errors.phone }"
										@input="errors.phone = ''"
									>
									<p
										v-if="errors.phone"
										class="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase tracking-tighter"
									>
										{{ errors.phone }}
									</p>
								</div>
							</div>

							<div class="space-y-2">
								<label
									class="text-xs font-black text-gray-400 uppercase tracking-widest"
									>Địa chỉ giao hàng</label
								>
								<textarea
									v-model="shippingInfo.address"
									rows="3"
									placeholder="Nhập địa chỉ nhận hàng chi tiết"
									class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm resize-none"
									:class="{ '!border-red-500 !bg-red-50': errors.address }"
									@input="errors.address = ''"
								/>
								<p
									v-if="errors.address"
									class="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase tracking-tighter"
								>
									{{ errors.address }}
								</p>
							</div>

							<div class="space-y-2">
								<label
									class="text-xs font-black text-gray-400 uppercase tracking-widest"
									>Ghi chú (tùy chọn)</label
								>
								<textarea
									v-model="shippingInfo.notes"
									rows="2"
									placeholder="Lưu ý cho người giao hàng..."
									class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm resize-none"
								/>
							</div>
						</div>

						<div
							class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6"
						>
							<h3
								class="text-lg font-bold text-gray-800 flex items-center gap-2"
							>
								<span
									class="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center text-sm"
									>2</span
								>
								Phương thức thanh toán
							</h3>

							<div class="space-y-3">
								<div
									class="p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 bg-red-50 border-red-500 shadow-md shadow-red-500/10"
								>
									<div
										class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm"
									>
										💵
									</div>
									<div class="flex-1">
										<h5 class="font-bold text-gray-900">
											Thanh toán khi nhận hàng (COD)
										</h5>
										<p class="text-xs text-gray-500 font-medium">
											Bạn sẽ thanh toán bằng tiền mặt khi shipper giao hàng đến.
										</p>
									</div>
									<div class="text-red-500">
										<i class="fas fa-check-circle text-xl" />
									</div>
								</div>

								<div
									class="p-4 bg-gray-100 rounded-xl flex items-center gap-3 grayscale opacity-60 cursor-not-allowed"
								>
									<div
										class="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-lg"
									>
										🏦
									</div>
									<span class="text-sm font-bold text-gray-400"
										>Chuyển khoản (Đang bảo trì)</span
									>
								</div>
							</div>
						</div>
					</div>

					<div class="lg:w-[400px] space-y-6">
						<div
							class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-24"
						>
							<h3
								class="text-lg font-black text-gray-900 mb-6 uppercase tracking-wider flex items-center gap-2"
							>
								<i class="fas fa-receipt text-red-600" />
								Tóm tắt đơn hàng
							</h3>

							<div
								class="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar mb-6"
							>
								<template v-if="isPending && cartItems.length > 0">
									<div
										v-for="i in cartItems.length"
										:key="i"
										class="flex gap-4 animate-pulse"
									>
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
										class="flex gap-4"
									>
										<div
											class="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 shrink-0"
										>
											<img
												:src="item.image"
												:alt="item.name"
												class="w-full h-full object-cover"
												@error="
													(e) =>
														(e.target.src =
															'/assets/image/placeholder-product.webp')
												"
											>
										</div>
										<div class="flex-1 min-w-0">
											<div class="flex justify-between items-start">
												<h5 class="text-sm font-bold text-gray-800 truncate">
													{{ item.name }}
												</h5>
												<button
													class="text-gray-400 hover:text-red-500 transition-colors ml-2"
													@click="removeItem(index)"
												>
													<i class="fas fa-trash-alt text-xs" />
												</button>
											</div>
											<div class="flex flex-col items-start mt-1">
												<p class="text-sm font-black text-red-600">
													{{ formatCurrency(item.price * item.quantity) }}
												</p>
											</div>
											<div
												class="flex items-center gap-2 mt-2 bg-gray-50 p-1.5 rounded-lg w-fit"
											>
												<button
													class="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-[10px] hover:bg-red-50 hover:text-red-500 transition-all font-black"
													@click="updateQuantity(item.id, item.quantity - 1)"
												>
													-
												</button>
												<span class="text-xs font-bold w-4 text-center">{{
													item.quantity
												}}</span>
												<button
													class="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-[10px] hover:bg-red-50 hover:text-red-500 transition-all font-black"
													@click="updateQuantity(item.id, item.quantity + 1)"
												>
													+
												</button>
											</div>
										</div>
									</div>
								</template>
							</div>

							<div class="space-y-3 pt-6 border-t border-gray-100">
								<div class="flex justify-between text-sm">
									<span class="text-gray-500 font-medium">Tạm tính</span>
									<span class="font-bold text-gray-900">{{
										formatCurrency(subtotal)
									}}</span>
								</div>
								<div class="flex justify-between text-sm">
									<span class="text-gray-500 font-medium">Phí giao hàng</span>
									<span class="font-bold text-gray-900">{{
										shipping === 0 ? "Miễn phí" : formatCurrency(shipping)
									}}</span>
								</div>
								<div class="flex justify-between pt-4 border-t border-gray-100">
									<span class="text-lg font-black text-gray-900 uppercase"
										>Tổng cộng</span
									>
									<span class="text-xl font-black text-red-600">{{
										formatCurrency(total)
									}}</span>
								</div>
							</div>

							<button
								:disabled="isSubmitting || cartItems.length === 0"
								class="w-full mt-8 py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
								@click="handlePlaceOrder"
							>
								<i v-if="isSubmitting" class="fas fa-spinner fa-spin" />
								<span v-else>Xác nhận đặt hàng</span>
							</button>
						</div>
					</div>
				</div>

				<div v-else class="max-w-2xl mx-auto text-center py-12">
					<div
						class="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 space-y-8 animate-in zoom-in duration-500"
					>
						<div
							class="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg shadow-green-500/20"
						>
							<i class="fas fa-check" />
						</div>

						<div class="space-y-2">
							<h2 class="text-3xl font-black text-gray-900 uppercase">
								Đặt hàng thành công!
							</h2>
							<p class="text-gray-500 font-medium">
								Cảm ơn bạn đã tin tưởng và mua hàng tại AnhEm Motor.
							</p>
						</div>

						<div
							class="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-left space-y-4"
						>
							<div
								class="flex justify-between items-center text-sm border-b border-gray-200 pb-3"
							>
								<span class="text-gray-400 font-bold uppercase tracking-widest"
									>Mã đơn hàng</span
								>
								<span class="font-black text-gray-900"
									>#{{ confirmedOrder?.id || "N/A" }}</span
								>
							</div>
							<div class="flex justify-between items-center text-sm">
								<span class="text-gray-400 font-bold uppercase tracking-widest"
									>Phương thức</span
								>
								<span class="font-black text-gray-900"
									>Thanh toán khi nhận hàng (COD)</span
								>
							</div>
							<div class="flex justify-between items-center text-sm">
								<span class="text-gray-400 font-bold uppercase tracking-widest"
									>Trạng thái</span
								>
								<span
									class="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full font-bold text-[10px] uppercase"
									>Chờ xác nhận</span
								>
							</div>
						</div>

						<div class="flex flex-col sm:flex-row gap-4 pt-4">
							<NuxtLink
								to="/category"
								class="flex-1 py-4 bg-gray-100 text-gray-700 font-black rounded-2xl hover:bg-gray-200 transition-colors uppercase text-sm"
							>
								Tiếp tục mua sắm
							</NuxtLink>
							<NuxtLink
								to="/orders"
								class="flex-1 py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 shadow-xl shadow-red-600/20 transition-all transform hover:-translate-y-1 uppercase text-sm"
							>
								Xem đơn hàng
							</NuxtLink>
						</div>
					</div>
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
				<CommonFullLoading :show="isSubmitting" text="Đang xử lý đơn hàng..." />
			</ClientOnly>
		</div>
	</main>
</template>

<style scoped>
@reference "../assets/main.css";

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
