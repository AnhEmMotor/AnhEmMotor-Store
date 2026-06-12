
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

	async getMyOrders() {
		try {
			return await orderRepository.getMyOrders();
		} catch {

			return [];
		}
	},

	async getPaymentLink(orderId) {
		try {
			return await orderRepository.getPaymentLink(orderId);
		} catch {

			return null;
		}
	},
};

export default orderService;
