export const OrderRepository = (axios) => ({
	async getMyPurchases(params) {
		const response = await axios.get("/api/v1/SalesOrders/my-purchases", {
			params,
		});
		return response.data;
	},
	async getCancellableStatuses() {
		const response = await axios.get(
			"/api/v1/SalesOrders/cancellable-statuses",
		);
		return response.data;
	},
	async cancelMyOrder(id) {
		const response = await axios.patch(
			`/api/v1/SalesOrders/${id}/cancel-my-order`,
		);
		return response.data;
	},
	async getStatusMap() {
		const response = await axios.get("/api/v1/SalesOrders/status-map");
		return response.data;
	},
});
