export const ORDER_ENDPOINTS = {
	CREATE: "/api/v1/SalesOrders",
	MY_PURCHASES: "/api/v1/SalesOrders/my-purchases",
	STATUS_MAP: "/api/v1/SalesOrders/status",
	CANCELLABLE_STATUSES: "/api/v1/SalesOrders/cancellable-statuses",
	DETAIL: (id) => `/api/v1/SalesOrders/${id}`,
	UPDATE: (id) => `/api/v1/SalesOrders/${id}`,
	CANCEL: (id) => `/api/v1/SalesOrders/${id}/cancel-my-order`,
};
