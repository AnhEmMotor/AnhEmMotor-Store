<script setup>
import { ref, onMounted } from "vue";
import { useOrderStore } from "@/stores/useOrderStore";
import { usePaginatedQuery } from "@/composables/usePaginatedQuery";
import { useAxios } from "@/composables/useAxios";
import { toast } from "vue3-toastify";
import { useQueryClient } from "@tanstack/vue-query";
import BasePagination from "@/components/ui/BasePagination.vue";

useSeoMeta({
	title: "Đơn hàng của tôi",
	description:
		"Xem danh sách và trạng thái các đơn hàng bạn đã mua tại AnhEm Motor.",
});

const orderStore = useOrderStore();
const axios = useAxios();
const queryClient = useQueryClient();

onMounted(async () => {
	await orderStore.initStatuses();
});

const isEditing = ref(false);
const isCancelModalOpen = ref(false);
const isSubmittingEdit = ref(false);
const isSubmittingCancel = ref(false);
const selectedOrder = ref(null);
const orderIdToCancel = ref(null);
const editForm = ref({
	customerName: "",
	customerPhone: "",
	customerAddress: "",
	notes: "",
});
const editErrors = ref({
	customerName: "",
	customerPhone: "",
	customerAddress: "",
});

const regexPhoneVN = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

const validateEditForm = () => {
	let isValid = true;
	editErrors.value = {
		customerName: "",
		customerPhone: "",
		customerAddress: "",
	};

	if (!editForm.value.customerName?.trim()) {
		editErrors.value.customerName = "Tên người nhận không được để trống.";
		isValid = false;
	}

	if (!editForm.value.customerPhone?.trim()) {
		editErrors.value.customerPhone = "Số điện thoại không được để trống.";
		isValid = false;
	} else if (!regexPhoneVN.test(editForm.value.customerPhone.trim())) {
		editErrors.value.customerPhone = "Số điện thoại Việt Nam không hợp lệ.";
		isValid = false;
	}

	if (!editForm.value.customerAddress?.trim()) {
		editErrors.value.customerAddress = "Địa chỉ giao hàng không được để trống.";
		isValid = false;
	}

	return isValid;
};

const canEdit = (statusId) => {
	const deliveryLocked =
		orderStore.lockedStatuses?.deliveryInfo?.includes(statusId);
	const notesLocked = orderStore.lockedStatuses?.notes?.includes(statusId);
	return !deliveryLocked || !notesLocked;
};

const openEditModal = (order) => {
	selectedOrder.value = order;
	editForm.value = {
		customerName: order.customerName || "",
		customerPhone: order.customerPhone || "",
		customerAddress: order.customerAddress || "",
		notes: order.notes || "",
	};
	editErrors.value = {
		customerName: "",
		customerPhone: "",
		customerAddress: "",
	};
	isEditing.value = true;
};

const handleUpdateOrder = async () => {
	if (!selectedOrder.value) return;

	if (!validateEditForm()) {
		toast.error("Vui lòng kiểm tra lại thông tin nhập liệu.");
		return;
	}

	isSubmittingEdit.value = true;
	try {
		await axios.patch(
			`/api/v1/SalesOrders/${selectedOrder.value.id}`,
			editForm.value,
		);
		toast.success("Cập nhật thông tin đơn hàng thành công!");
		isEditing.value = false;
		await queryClient.invalidateQueries({ queryKey: ["my-orders"] });
	} catch (error) {
		if (error.response?.data?.Errors) {
			const apiErrors = error.response.data.Errors;
			apiErrors.forEach((err) => {
				const field = err.Field?.toLowerCase();
				if (field === "customername")
					editErrors.value.customerName = err.Message;
				if (field === "customerphone")
					editErrors.value.customerPhone = err.Message;
				if (field === "customeraddress")
					editErrors.value.customerAddress = err.Message;
			});
		}
		const message =
			error.response?.data?.Errors?.[0]?.Message ||
			"Có lỗi xảy ra khi cập nhật đơn hàng.";
		toast.error(message);
	} finally {
		isSubmittingEdit.value = false;
	}
};

const filters = ref({});

const {
	data: orders,
	isLoading,
	pagination,
} = usePaginatedQuery({
	queryKey: ["my-orders"],
	queryFn: (params) => {
		return orderStore.getMyPurchases(params);
	},
	itemsPerPage: 10,
	filters: filters,
	dataKey: (res) => res.Items || res.items || [],
});

const isCancellable = (statusId) => {
	return orderStore.cancellableStatuses.includes(statusId);
};

const calculateTotal = (outputInfos) => {
	if (!outputInfos) return 0;
	return outputInfos.reduce(
		(sum, item) => sum + (item.count || 0) * (item.price || 0),
		0,
	);
};

const formatDateSimple = (dateString) => {
	if (!dateString) return "---";
	return new Date(dateString).toLocaleDateString("vi-VN", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});
};

const handleCancelOrder = (orderId) => {
	orderIdToCancel.value = orderId;
	isCancelModalOpen.value = true;
};

const confirmCancel = async () => {
	if (!orderIdToCancel.value) return;

	isSubmittingCancel.value = true;
	try {
		await orderStore.cancelOrder(orderIdToCancel.value);
		toast.success("Hủy đơn hàng thành công!");
		isCancelModalOpen.value = false;
		await queryClient.invalidateQueries({ queryKey: ["my-orders"] });
	} catch (error) {
		const message =
			error.response?.data?.Errors?.[0]?.Message ||
			"Có lỗi xảy ra khi hủy đơn hàng.";
		toast.error(message);
	} finally {
		isSubmittingCancel.value = false;
		orderIdToCancel.value = null;
	}
};

const formatPrice = (price) => {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(price || 0);
};
</script>

<template>
	<div class="bg-gray-50 min-h-screen py-12">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="mb-8">
				<h1 class="text-3xl font-black text-gray-900 mb-2">Đơn hàng của tôi</h1>
				<p class="text-gray-500">
					Quản lý và theo dõi trạng thái các đơn hàng của bạn.
				</p>
			</div>

			<div v-if="isLoading" class="flex justify-center py-20">
				<div
					class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"
				/>
			</div>

			<div
				v-else-if="orders.length === 0"
				class="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100"
			>
				<div
					class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6"
				>
					<Icon
						name="fa6-solid:basket-shopping"
						class="text-3xl text-gray-300"
					/>
				</div>
				<h2 class="text-xl font-bold text-gray-900 mb-2">
					Bạn chưa có đơn hàng nào
				</h2>
				<p class="text-gray-500 mb-8">
					Hãy khám phá các sản phẩm tuyệt vời của chúng tôi và đặt hàng ngay!
				</p>
				<RouterLink
					to="/category"
					class="inline-flex items-center px-8 py-3 bg-red-500 text-white font-black rounded-full shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all active:scale-95"
				>
					Mua sắm ngay
				</RouterLink>
			</div>

			<div v-else class="space-y-6">
				<div
					v-for="order in orders"
					:key="order.id"
					class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
				>
					<div
						class="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4"
					>
						<div class="flex items-center gap-4">
							<div
								class="text-xs text-gray-400 font-bold uppercase tracking-widest"
							>
								Ngày đặt:
								<span class="text-gray-900 ml-1">{{
									formatDateSimple(order.createdAt)
								}}</span>
							</div>
						</div>

						<div class="flex items-center gap-3">
							<span
								class="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider"
								:class="{
									'bg-yellow-50 text-yellow-600':
										order.statusId === 'pending' ||
										order.statusId === 'waiting_deposit',
									'bg-blue-50 text-blue-600':
										order.statusId === 'confirmed_cod' ||
										order.statusId === 'deposit_paid' ||
										order.statusId === 'paid_processing',
									'bg-indigo-50 text-indigo-600':
										order.statusId === 'delivering' ||
										order.statusId === 'waiting_pickup',
									'bg-green-50 text-green-600': order.statusId === 'completed',
									'bg-red-50 text-red-600': order.statusId === 'cancelled',
									'bg-orange-50 text-orange-600':
										order.statusId === 'refunding' ||
										order.statusId === 'refunded',
								}"
							>
								{{ orderStore.getStatusName(order.statusId) }}
							</span>
						</div>
					</div>

					<div class="px-6 py-4">
						<div class="space-y-4">
							<div
								v-for="(item, index) in order.outputInfos"
								:key="index"
								class="flex gap-4"
							>
								<div
									class="w-16 h-16 bg-gray-50 rounded-xl flex-shrink-0 border border-gray-100 flex items-center justify-center overflow-hidden"
								>
									<img
										:src="
											item.coverImageUrl ||
											'/assets/image/placeholder-product.webp'
										"
										class="w-full h-full object-cover"
										@error="
											(e) =>
												(e.target.src =
													'/assets/image/placeholder-product.webp')
										"
									>
								</div>
								<div class="flex-1 min-w-0 flex flex-col justify-center">
									<h4 class="font-bold text-gray-900 truncate">
										{{ item.productName || "Sản phẩm" }}
									</h4>
									<div class="flex items-center justify-between">
										<p class="text-xs text-gray-500">
											Số lượng: <span class="font-bold">{{ item.count }}</span>
										</p>
										<p class="text-sm font-black text-red-500">
											{{ formatPrice(item.price) }}
										</p>
									</div>
								</div>
							</div>
						</div>

						<div
							class="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6"
						>
							<div class="space-y-3">
								<div
									class="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest"
								>
									<Icon name="fa6-solid:truck" class="text-red-500" />
									Thông tin giao hàng
								</div>
								<div class="bg-gray-50/50 rounded-2xl p-4 space-y-2">
									<div class="flex items-center gap-3">
										<Icon
											name="fa6-solid:user"
											class="text-[10px] text-gray-400"
										/>
										<span class="text-sm font-bold text-gray-900">{{
											order.customerName || "Chưa có tên"
										}}</span>
									</div>
									<div class="flex items-center gap-3">
										<Icon
											name="fa6-solid:phone"
											class="text-[10px] text-gray-400"
										/>
										<span class="text-sm font-bold text-gray-700">{{
											order.customerPhone || "Chưa có SĐT"
										}}</span>
									</div>
									<div class="flex items-start gap-3">
										<Icon
											name="fa6-solid:location-dot"
											class="text-[10px] text-gray-400 mt-1"
										/>
										<span
											class="text-sm font-medium text-gray-600 leading-relaxed italic"
											>{{ order.customerAddress || "Chưa có địa chỉ" }}</span
										>
									</div>
								</div>
							</div>
							<div class="space-y-3">
								<div
									class="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest"
								>
									<Icon name="fa6-solid:note-sticky" class="text-red-500" />
									Ghi chú khách hàng
								</div>
								<p class="text-sm font-bold text-gray-700 leading-relaxed px-2">
									{{ order.notes || "Không có ghi chú nào cho đơn hàng này." }}
								</p>
							</div>
						</div>
					</div>

					<div
						class="px-6 py-4 bg-gray-50/20 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4"
					>
						<div class="flex items-center gap-3">
							<button
								v-if="isCancellable(order.statusId)"
								class="px-6 py-2 bg-white border border-red-100 text-red-500 text-xs font-black rounded-full hover:bg-red-50 transition-all active:scale-95 shadow-sm uppercase tracking-wider"
								@click="handleCancelOrder(order.id)"
							>
								Hủy đơn
							</button>
							<button
								v-if="canEdit(order.statusId)"
								class="px-6 py-2 bg-gray-900 text-white text-xs font-black rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-sm uppercase tracking-wider"
								@click="openEditModal(order)"
							>
								Sửa thông tin
							</button>
						</div>
						<div class="text-right">
							<p
								class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1"
							>
								Tổng cộng:
							</p>
							<p class="text-2xl font-black text-red-500">
								{{ formatPrice(calculateTotal(order.outputInfos)) }}
							</p>
						</div>
					</div>
				</div>

				<div v-if="pagination.totalPages > 1" class="flex justify-center pt-8">
					<BasePagination
						:current-page="pagination.currentPage"
						:total-pages="pagination.totalPages"
						@update:current-page="pagination.goToPage"
					/>
				</div>
			</div>
		</div>

		<div
			v-if="isEditing"
			class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity"
		>
			<div
				class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in duration-300"
			>
				<div
					class="px-8 py-6 border-b border-gray-100 flex items-center justify-between"
				>
					<h3 class="text-xl font-black text-gray-900 uppercase">
						Sửa thông tin đơn hàng
					</h3>
					<button
						class="text-gray-400 hover:text-gray-600 transition-colors"
						@click="isEditing = false"
					>
						<Icon name="fa6-solid:xmark" class="text-xl" />
					</button>
				</div>

				<div
					class="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar"
				>
					<div class="space-y-4">
						<div class="space-y-2">
							<label
								class="text-xs font-black text-gray-400 uppercase tracking-widest"
							>
								Người nhận hàng
							</label>
							<input
								v-model="editForm.customerName"
								type="text"
								placeholder="Tên khách hàng"
								class="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm"
								:class="{
									'border-red-500 bg-red-50/10': editErrors.customerName,
								}"
								:disabled="
									orderStore.lockedStatuses?.deliveryInfo?.includes(
										selectedOrder?.statusId,
									)
								"
								@input="editErrors.customerName = ''"
							>
							<p
								v-if="editErrors.customerName"
								class="text-xs text-red-500 mt-1"
							>
								{{ editErrors.customerName }}
							</p>
						</div>

						<div class="space-y-2">
							<label
								class="text-xs font-black text-gray-400 uppercase tracking-widest"
							>
								Số điện thoại
							</label>
							<input
								v-model="editForm.customerPhone"
								type="tel"
								placeholder="Số điện thoại"
								class="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm"
								:class="{
									'border-red-500 bg-red-50/10': editErrors.customerPhone,
								}"
								:disabled="
									orderStore.lockedStatuses?.deliveryInfo?.includes(
										selectedOrder?.statusId,
									)
								"
								@input="editErrors.customerPhone = ''"
							>
							<p
								v-if="editErrors.customerPhone"
								class="text-xs text-red-500 mt-1"
							>
								{{ editErrors.customerPhone }}
							</p>
						</div>

						<div class="space-y-2">
							<label
								class="text-xs font-black text-gray-400 uppercase tracking-widest"
							>
								Địa chỉ giao hàng
							</label>
							<textarea
								v-model="editForm.customerAddress"
								rows="3"
								placeholder="Địa chỉ chi tiết"
								class="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm resize-none"
								:class="{
									'border-red-500 bg-red-50/10': editErrors.customerAddress,
								}"
								:disabled="
									orderStore.lockedStatuses?.deliveryInfo?.includes(
										selectedOrder?.statusId,
									)
								"
								@input="editErrors.customerAddress = ''"
							/>
							<p
								v-if="editErrors.customerAddress"
								class="text-xs text-red-500 mt-1"
							>
								{{ editErrors.customerAddress }}
							</p>
						</div>

						<div class="space-y-2">
							<label
								class="text-xs font-black text-gray-400 uppercase tracking-widest"
							>
								Ghi chú
							</label>
							<textarea
								v-model="editForm.notes"
								rows="2"
								placeholder="Lời nhắn..."
								class="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm resize-none"
								:disabled="
									orderStore.lockedStatuses?.notes?.includes(
										selectedOrder?.statusId,
									)
								"
							/>
						</div>
					</div>
				</div>

				<div class="p-8 bg-gray-50 border-t border-gray-100 flex gap-4">
					<button
						class="flex-1 py-4 bg-white border border-gray-200 text-gray-500 font-black rounded-2xl hover:bg-gray-100 transition-all active:scale-95 uppercase tracking-widest text-xs"
						@click="isEditing = false"
					>
						Hủy bỏ
					</button>
					<button
						:disabled="isSubmittingEdit"
						class="flex-1 py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
						@click="handleUpdateOrder"
					>
						<Icon
							v-if="isSubmittingEdit"
							name="fa6-solid:spinner"
							class="animate-spin"
						/>
						Lưu thay đổi
					</button>
				</div>
			</div>
		</div>

		<div
			v-if="isCancelModalOpen"
			class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity"
		>
			<div
				class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300"
			>
				<div class="p-8 text-center">
					<div
						class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"
					>
						<Icon
							name="fa6-solid:triangle-exclamation"
							class="text-3xl text-red-500"
						/>
					</div>
					<h3 class="text-2xl font-black text-gray-900 mb-2 uppercase">
						Hủy đơn hàng?
					</h3>
					<p class="text-gray-500 font-medium">
						Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không
						thể hoàn tác.
					</p>
				</div>

				<div class="p-8 bg-gray-50 border-t border-gray-100 flex gap-4">
					<button
						class="flex-1 py-4 bg-white border border-gray-200 text-gray-500 font-black rounded-2xl hover:bg-gray-100 transition-all active:scale-95 uppercase tracking-widest text-xs"
						@click="isCancelModalOpen = false"
					>
						Quay lại
					</button>
					<button
						:disabled="isSubmittingCancel"
						class="flex-1 py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
						@click="confirmCancel"
					>
						<Icon
							v-if="isSubmittingCancel"
							name="fa6-solid:spinner"
							class="animate-spin"
						/>
						Xác nhận hủy
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.text-red-500 {
	color: #e31837;
}
.bg-red-500 {
	background-color: #e31837;
}
</style>
