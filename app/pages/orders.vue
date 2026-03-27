<script setup>
import { useOrderStore } from "@/stores/order.store";
import { usePaginatedQuery } from "@/composables/usePaginatedQuery";
import { toast } from "vue3-toastify";
import { useQueryClient } from "@tanstack/vue-query";
import OrderEmpty from "@/components/order/OrderEmpty.vue";
import OrderList from "@/components/order/OrderList.vue";
import OrderEditModal from "@/components/order/OrderEditModal.vue";
import OrderCancelModal from "@/components/order/OrderCancelModal.vue";

useSeoMeta({
	title: "Đơn hàng của tôi",
	description:
		"Xem danh sách và trạng thái các đơn hàng bạn đã mua tại AnhEm Motor.",
});

const orderStore = useOrderStore();
const queryClient = useQueryClient();

useAsyncData("order-statuses", async () => {
	await orderStore.initStatuses();
	return true;
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

const openEditModal = (order) => {
	selectedOrder.value = order;
	editForm.value = {
		customerName: order.customer?.name || "",
		customerPhone: order.customer?.phone || "",
		customerAddress: order.customer?.address || "",
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
		const payload = {
			customerName: editForm.value.customerName,
			customerPhone: editForm.value.customerPhone,
			customerAddress: editForm.value.customerAddress,
			notes: editForm.value.notes,
		};

		await orderStore.updateOrderInfo(selectedOrder.value.id, payload);
		toast.success("Cập nhật thông tin đơn hàng thành công!");
		isEditing.value = false;
		await queryClient.invalidateQueries({ queryKey: ["my-orders"] });
	} catch (error) {
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
	isInitialLoading,
	pagination,
} = usePaginatedQuery({
	queryKey: ["my-orders"],
	queryFn: (params) => {
		return orderStore.getMyPurchases(params);
	},
	itemsPerPage: 10,
	filters: filters,
	dataKey: (res) => res.items || [],
});

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

const isCancellable = (statusId) =>
	orderStore.cancellableStatuses.includes(statusId);
const canEdit = (statusId) => {
	if (!orderStore.lockedStatuses) return true;
	const deliveryLocked =
		orderStore.lockedStatuses.deliveryInfo?.includes(statusId);
	const notesLocked = orderStore.lockedStatuses.notes?.includes(statusId);
	return !deliveryLocked || !notesLocked;
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

			<div v-if="isInitialLoading" class="flex justify-center py-20">
				<div
					class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"
				/>
			</div>

			<div v-else-if="isLoading" class="flex justify-center py-10">
				<div
					class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"
				/>
			</div>

			<template v-else>
				<OrderEmpty v-if="orders.length === 0" />

				<OrderList
					v-else
					:orders="orders"
					:pagination="pagination"
					:get-status-name="orderStore.getStatusName"
					:is-cancellable="isCancellable"
					:can-edit="canEdit"
					@edit="openEditModal"
					@cancel="handleCancelOrder"
				/>
			</template>
		</div>

		<OrderEditModal
			v-model:form="editForm"
			:is-open="isEditing"
			:order="selectedOrder"
			:errors="editErrors"
			:is-submitting="isSubmittingEdit"
			:locked-delivery="
				orderStore.lockedStatuses?.deliveryInfo?.includes(selectedOrder?.status)
			"
			:locked-notes="
				orderStore.lockedStatuses?.notes?.includes(selectedOrder?.status)
			"
			@close="isEditing = false"
			@save="handleUpdateOrder"
		/>

		<OrderCancelModal
			:is-open="isCancelModalOpen"
			:is-submitting="isSubmittingCancel"
			@close="isCancelModalOpen = false"
			@confirm="confirmCancel"
		/>
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
