export const orderService = {
	async createOrder(orderData) {
		return await orderRepository.createOrder(orderData);
	},

	async getOrderDetail(id) {
		try {
			return await orderRepository.getOrderDetail(id);
		} catch {
			return null;
		}
	},

	async getMyPurchases(params) {
		try {
			return await orderRepository.getMyPurchases(params);
		} catch {
			return { items: [], totalCount: 0 };
		}
	},

	async getStatusMap() {
		try {
			return await orderRepository.getStatusMap();
		} catch {
			return {};
		}
	},

	async getCancellableStatuses() {
		try {
			return await orderRepository.getCancellableStatuses();
		} catch {
			return [];
		}
	},

	async cancelOrder(orderId) {
		return await orderRepository.cancelOrder(orderId);
	},

	async updateOrder(orderId, payload) {
		return await orderRepository.updateOrder(orderId, payload);
	},

	async getPaymentLink(orderId) {
		return await orderRepository.getPaymentLink(orderId);
	},
};

export default orderService;
