import { defineStore } from "pinia";
import { computed } from "vue";
import { useAxios } from "@/composables/useAxios";
import { useQuery } from "@tanstack/vue-query";
import { OrderRepository } from "@/repositories/OrderRepository";

export const useOrderStore = defineStore("order", () => {
	const axios = useAxios();
	const orderRepo = OrderRepository(axios);

	const { data: statusMapRaw = [] } = useQuery({
		queryKey: ["order-status-map"],
		queryFn: () => orderRepo.getStatusMap(),
		staleTime: 1000 * 60 * 60,
	});

	const statusMap = computed(() => statusMapRaw.value || []);

	const { data: cancellableStatusesRaw = [] } = useQuery({
		queryKey: ["cancellable-statuses"],
		queryFn: () => orderRepo.getCancellableStatuses(),
		staleTime: 1000 * 60 * 60,
	});

	const cancellableStatuses = computed(
		() => cancellableStatusesRaw.value || [],
	);

	const { data: lockedStatusesRaw = {} } = useQuery({
		queryKey: ["order-locked-statuses"],
		queryFn: () =>
			axios.get("/api/v1/SalesOrders/locked-statuses").then((r) => r.data),
		staleTime: 1000 * 60 * 60,
	});

	const lockedStatuses = computed(() => lockedStatusesRaw.value || {});

	const getMyPurchases = async (params) => {
		return await orderRepo.getMyPurchases(params);
	};

	const initStatuses = async () => {};

	const cancelOrder = async (id) => {
		return await orderRepo.cancelMyOrder(id);
	};

	const getStatusName = (statusId) => {
		const status = statusMap.value.find((s) => s.id === statusId);
		return status ? status.name : statusId;
	};

	return {
		cancellableStatuses,
		statusMap,
		lockedStatuses,
		getMyPurchases,
		initStatuses,
		cancelOrder,
		getStatusName,
	};
});
