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

	async getMyOrders() {
		try {
			return await orderRepository.getMyOrders();
		} catch (error) {
			console.error("Service: Failed to fetch my orders:", error);
			return [];
		}
	},

	async getPaymentLink(orderId) {
		try {
			return await orderRepository.getPaymentLink(orderId);
		} catch (error) {
			console.error(`Service: Failed to get payment link for order ${orderId}:`, error);
			return null;
		}
	},
};

export default orderService;
