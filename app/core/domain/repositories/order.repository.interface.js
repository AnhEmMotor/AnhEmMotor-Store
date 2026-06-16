/**
 * Order Repository Interface (Domain Layer)
 * Contract for order data access operations.
 */
export const IOrderRepository = {
  createOrder: async (orderData) => {
    throw new Error('IOrderRepository.createOrder not implemented');
  },
  getOrderDetail: async (id) => {
    throw new Error('IOrderRepository.getOrderDetail not implemented');
  },
  getMyPurchases: async (params) => {
    throw new Error('IOrderRepository.getMyPurchases not implemented');
  },
  getStatusMap: async () => {
    throw new Error('IOrderRepository.getStatusMap not implemented');
  },
  getCancellableStatuses: async () => {
    throw new Error('IOrderRepository.getCancellableStatuses not implemented');
  },
  cancelOrder: async (orderId) => {
    throw new Error('IOrderRepository.cancelOrder not implemented');
  },
  updateOrder: async (orderId, payload) => {
    throw new Error('IOrderRepository.updateOrder not implemented');
  },
  getPaymentLink: async (orderId) => {
    throw new Error('IOrderRepository.getPaymentLink not implemented');
  }
};
