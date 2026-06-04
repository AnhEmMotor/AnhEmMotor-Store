export const orderRepository = {
  async createOrder(orderData) {
    const axios = useAxios();
    const response = await axios.post("/api/v1/SalesOrders", orderData);
    return response.data;
  },
  async getOrderDetail(id) {
    const axios = useAxios();
    const response = await axios.get(`/api/v1/SalesOrders/${id}`);
    return response.data;
  },
  async getMyOrders() {
    const axios = useAxios();
    const response = await axios.get("/api/v1/SalesOrders/my-purchases");
    return response.data;
  },
  async getPaymentLink(orderId) {
    const axios = useAxios();
    const response = await axios.get(`/api/v1/Payment/${orderId}/link`);
    return response.data;
  },
};
