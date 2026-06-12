/**
 * Application Layer - Order Service
 */
export const orderService = {
	async createOrder(orderData) {
		try {
			return await orderRepository.createOrder(orderData);
		} catch (error) {
			console.error("Service: Failed to create order:", error);
			throw error;
		}
	},

	async getOrderDetail(id) {
		try {
			return await orderRepository.getOrderDetail(id);
		} catch (error) {
			console.error(`Service: Failed to fetch order detail for ${id}:`, error);
			return null;
		}
	},

	async getMyPurchases(params) {
		try {
			return await orderRepository.getMyPurchases(params);
		} catch (error) {
			console.error("Service: Failed to fetch my orders:", error);
			throw error;
		}
	},

	async getStatusMap() {
		return await orderRepository.getStatusMap();
	},

	async getCancellableStatuses() {
		return await orderRepository.getCancellableStatuses();
	},

	async cancelOrder(orderId) {
		return await orderRepository.cancelOrder(orderId);
	},

	async updateOrder(orderId, payload) {
		return await orderRepository.updateOrder(orderId, payload);
	},

	async getPaymentLink(orderId) {
		try {
			return await orderRepository.getPaymentLink(orderId);
		} catch (error) {
			console.error(`Service: Failed to get payment link for order ${orderId}:`, error);
			throw error;
		}
	},
};

export default orderService;
