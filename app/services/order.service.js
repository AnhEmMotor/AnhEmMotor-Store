/**
 * Application Layer - Order Service
 */
import { IOrderRepository } from "@/core/domain/repositories/order.repository.interface";

/**
 * Factory function to create order service with dependency injection
 * @param {IOrderRepository} repository
 * @returns {IOrderRepository}
 */
export const createOrderService = (repository) => ({
	async createOrder(orderData) {
		try {
			return await repository.createOrder(orderData);
		} catch (error) {
			throw error;
		}
	},

	async getOrderDetail(id) {
		try {
			return await repository.getOrderDetail(id);
		} catch (error) {
			return null;
		}
	},

	async getMyPurchases(params) {
		try {
			return await repository.getMyPurchases(params);
		} catch (error) {
			throw error;
		}
	},

	async getStatusMap() {
		return await repository.getStatusMap();
	},

	async getCancellableStatuses() {
		return await repository.getCancellableStatuses();
	},

	async cancelOrder(orderId) {
		return await repository.cancelOrder(orderId);
	},

	async updateOrder(orderId, payload) {
		return await repository.updateOrder(orderId, payload);
	},

	async getPaymentLink(orderId) {
		try {
			return await repository.getPaymentLink(orderId);
		} catch (error) {
			throw error;
		}
	},
});

export default createOrderService;
