export const orderRepository = {
	async createOrder(orderData) {
		const axios = useAxios();
		const response = await axios.post("/api/v1/Order", orderData);
		return response.data;
	},
	async getOrderDetail(id) {
		const axios = useAxios();
		const response = await axios.get(`/api/v1/Order/${id}`);
		return response.data;
	},
	async getMyOrders() {
		const axios = useAxios();
		const response = await axios.get("/api/v1/Order/my-orders");
		return response.data;
	},
	async getPaymentLink(orderId) {
		const axios = useAxios();
		const response = await axios.get(`/api/v1/Payment/${orderId}/link`);
		return response.data;
	}
};
