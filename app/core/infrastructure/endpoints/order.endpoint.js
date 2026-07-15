export const ORDER_ENDPOINTS = {
	CREATE: "/api/v1/SalesOrders",
	MY_PURCHASES: "/api/v1/SalesOrders/my-purchases",
	STATUS_MAP: "/api/v1/SalesOrders/status-map",
	CANCELLABLE_STATUSES: "/api/v1/SalesOrders/cancellable-statuses",
	DETAIL: (id) => `/api/v1/SalesOrders/my-purchases/${id}`,
	UPDATE: (id) => `/api/v1/SalesOrders/${id}`,
	CANCEL: (id) => `/api/v1/SalesOrders/${id}/cancel-my-order`,
	COMPANY_INVOICE: (id) => `/api/v1/SalesOrders/${id}/company-invoice`,
	PAYMENT_LINK: (id) => `/api/v1/Payment/${id}/link`,
	PROVINCES: "/api/v1/SalesOrders/provinces",
	WARDS: (provinceId) => `/api/v1/SalesOrders/wards/${provinceId}`,
};
