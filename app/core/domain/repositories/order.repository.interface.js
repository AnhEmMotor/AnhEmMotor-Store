/**
 * Order Repository Interface (Domain Layer)
 * Contract for order data access operations.
 */
export const IOrderRepository = {
	createOrder: async () => {
		throw new Error("IOrderRepository.createOrder not implemented");
	},
	getOrderDetail: async () => {
		throw new Error("IOrderRepository.getOrderDetail not implemented");
	},
	getMyPurchases: async () => {
		throw new Error("IOrderRepository.getMyPurchases not implemented");
	},
	getStatusMap: async () => {
		throw new Error("IOrderRepository.getStatusMap not implemented");
	},
	getCancellableStatuses: async () => {
		throw new Error("IOrderRepository.getCancellableStatuses not implemented");
	},
	cancelOrder: async () => {
		throw new Error("IOrderRepository.cancelOrder not implemented");
	},
	updateOrder: async () => {
		throw new Error("IOrderRepository.updateOrder not implemented");
	},
	updateCompanyInvoice: async () => {
		throw new Error("IOrderRepository.updateCompanyInvoice not implemented");
	},
	getPaymentLink: async () => {
		throw new Error("IOrderRepository.getPaymentLink not implemented");
	},
};
