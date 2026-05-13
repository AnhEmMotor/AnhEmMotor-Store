

const orderService = (axios) => ({
	async createOrder(payload) {
		const response = await axios.post(ORDER_ENDPOINTS.CREATE, payload);
		return response.data;
	},

	async getMyPurchases(params) {
		const response = await axios.get(ORDER_ENDPOINTS.MY_PURCHASES, { params });
		return response.data;
	},

	async getOrderDetail(id) {
		const response = await axios.get(ORDER_ENDPOINTS.DETAIL(id));
		return response.data;
	},

	async getStatusMap() {
		const response = await axios.get(ORDER_ENDPOINTS.STATUS_MAP);
		return response.data;
	},

	async getCancellableStatuses() {
		const response = await axios.get(ORDER_ENDPOINTS.CANCELLABLE_STATUSES);
		return response.data;
	},

	async cancelOrder(orderId) {
		const response = await axios.patch(ORDER_ENDPOINTS.CANCEL(orderId));
		return response.data;
	},

	async updateOrder(orderId, payload) {
		const response = await axios.patch(
			ORDER_ENDPOINTS.UPDATE(orderId),
			payload,
		);
		return response.data;
	},
});

export default orderService;
