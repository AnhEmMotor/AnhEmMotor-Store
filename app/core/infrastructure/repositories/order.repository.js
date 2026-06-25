import { ORDER_ENDPOINTS } from "@/constants/endpoints/order.endpoint";

export const orderRepository = {
  async createOrder(orderData) {
    const axios = useAxios();
    const response = await axios.post(ORDER_ENDPOINTS.CREATE, orderData);
    return response.data;
  },
  async getOrderDetail(id) {
    const axios = useAxios();
    const response = await axios.get(ORDER_ENDPOINTS.DETAIL(id));
    return response.data;
  },
  async getMyPurchases(params) {
    const axios = useAxios();
    const response = await axios.get(ORDER_ENDPOINTS.MY_PURCHASES, { params });
    return response.data;
  },
  async getStatusMap() {
    const axios = useAxios();
    const response = await axios.get(ORDER_ENDPOINTS.STATUS_MAP);
    return response.data;
  },
  async getCancellableStatuses() {
    const axios = useAxios();
    const response = await axios.get(ORDER_ENDPOINTS.CANCELLABLE_STATUSES);
    return response.data;
  },
  async cancelOrder(orderId) {
    const axios = useAxios();
    const response = await axios.patch(ORDER_ENDPOINTS.CANCEL(orderId));
    return response.data;
  },
  async updateOrder(orderId, payload) {
    const axios = useAxios();
    const response = await axios.put(ORDER_ENDPOINTS.UPDATE(orderId), payload);
    return response.data;
  },
  async getPaymentLink(orderId) {
    const axios = useAxios();
    const response = await axios.get(ORDER_ENDPOINTS.PAYMENT_LINK(orderId));
    return response.data;
  },
};
