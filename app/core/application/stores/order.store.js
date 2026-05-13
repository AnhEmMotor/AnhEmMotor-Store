import { defineStore } from "pinia";
import { ref } from "vue";
import { useQueryClient } from "@tanstack/vue-query";




export const useOrderStore = defineStore("order", () => {
	const axios = useAxios();
	const service = orderService(axios);
	const queryClient = useQueryClient();

	const currentOrder = ref(null);
	const lastCreatedOrderId = ref(null);
	const isLoading = ref(false);
	const error = ref(null);

	const statusMap = ref({
		pending: "Chờ xác nhận",
		waiting_deposit: "Chờ đặt cọc",
		deposit_paid: "Đã đặt cọc",
		confirmed_cod: "Đã xác nhận (COD)",
		paid_processing: "Đang xử lý",
		waiting_pickup: "Chờ lấy hàng",
		delivering: "Đang giao hàng",
		completed: "Đã hoàn tất",
		cancelled: "Đã hủy",
		refunding: "Đang hoàn tiền",
		refunded: "Đã hoàn tiền",
	});
	const lockedStatuses = ref({
		deliveryInfo: ["delivering", "completed", "cancelled"],
		notes: ["completed", "cancelled"],
	});
	const cancellableStatuses = ref(["pending", "waiting_deposit"]);

	const initStatuses = async () => {
		try {
			const [mapRes, cancellableRes] = await Promise.all([
				service.getStatusMap(),
				service.getCancellableStatuses(),
			]);

			statusMap.value = orderMapper.mapStatusMap(mapRes);
			cancellableStatuses.value = cancellableRes || [];

			lockedStatuses.value = {
				deliveryInfo: ["delivering", "completed", "cancelled"],
				notes: ["completed", "cancelled"],
			};
		} catch {
			null;
		}
	};

	const _refreshMyOrders = async () => {
		const params = { page: 1, pageSize: 10 };
		await queryClient.prefetchQuery({
			queryKey: ["my-orders", params],
			queryFn: () => getMyPurchases(params),
		});
	};

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

	const initShippingInfo = (user) => {
		if (user) {
			shippingInfo.value.fullName = user.fullName || user.userName || "";
			shippingInfo.value.phone = user.phoneNumber || "";
			shippingInfo.value.address = user.address || "";
		}
	};

	const validateShippingInfo = () => {
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
	};

	const createOrder = async (cartItems) => {
		isLoading.value = true;
		error.value = null;
		try {
			const authStore = useAuthStore();
			const userId = authStore.user?.id || authStore.user?.sub;
			const payload = orderMapper.mapOrderPayload(
				shippingInfo.value,
				cartItems,
				userId,
			);
			const res = await service.createOrder(payload);
			lastCreatedOrderId.value = res.id || res.Id;
			currentOrder.value = orderMapper.mapOrderResponse(res);

			queryClient.invalidateQueries({ queryKey: ["my-orders"] });
			_refreshMyOrders();

			return currentOrder.value;
		} catch (e) {
			const data = e.response?.data;
			if (data?.type === "Validation" && data?.errors) {
				error.value = data.errors.map((err) => err.message).join(" ");
			} else {
				error.value = data?.message || "Đã có lỗi xảy ra";
			}
			throw e;
		} finally {
			isLoading.value = false;
		}
	};

	const getMyPurchases = async (params) => {
		const res = await service.getMyPurchases(params);
		return {
			...res,
			items: orderMapper.mapOrderList(res),
		};
	};

	const fetchOrderDetail = async (id) => {
		isLoading.value = true;
		error.value = null;
		try {
			const res = await service.getOrderDetail(id);
			currentOrder.value = orderMapper.mapOrderResponse(res);
			return currentOrder.value;
		} catch (e) {
			error.value = "Không tìm thấy thông tin đơn hàng";
			throw e;
		} finally {
			isLoading.value = false;
		}
	};

	const cancelOrder = async (orderId) => {
		await service.cancelOrder(orderId);
		queryClient.invalidateQueries({ queryKey: ["my-orders"] });
		_refreshMyOrders();
	};

	const updateOrderInfo = async (orderId, payload) => {
		await service.updateOrder(orderId, payload);
		queryClient.invalidateQueries({ queryKey: ["my-orders"] });
		_refreshMyOrders();
	};

	const getStatusName = (statusId) => {
		return statusMap.value[statusId] || statusId || "Đang xử lý";
	};

	const clearOrder = () => {
		currentOrder.value = null;
		lastCreatedOrderId.value = null;
		errors.value = { fullName: "", phone: "", address: "" };
	};

	return {
		currentOrder,
		lastCreatedOrderId,
		statusMap,
		lockedStatuses,
		cancellableStatuses,
		isLoading,
		error,
		shippingInfo,
		errors,
		initStatuses,
		initShippingInfo,
		validateShippingInfo,
		createOrder,
		getMyPurchases,
		fetchOrderDetail,
		cancelOrder,
		updateOrderInfo,
		getStatusName,
		clearOrder,
	};
});

