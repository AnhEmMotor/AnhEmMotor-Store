import { PRODUCT_ENDPOINTS } from "@/constants/endpoints/product.endpoint";

/**
 * Application Layer - Product Service
 */
export const productService = {
	async getProducts(params) {
		try {
			const data = await productRepository.getProducts(params);
			return {
				items: (data.items || []).map(item => new Product(item)),
				totalCount: data.totalCount,
				totalPages: data.totalPages,
			};
		} catch (error) {
			console.error("Service: Failed to fetch products:", error);
			return { items: [], totalCount: 0 };
		}
	},

	async getProductDetail(slug) {
		try {
			const data = await productRepository.getProductDetail(slug);
			return data ? new Product(data) : null;
		} catch (error) {
			console.error(`Service: Failed to fetch product detail for ${slug}:`, error);
			return null;
		}
	},

	async getOptions() {
		return await productRepository.getOptions();
	},

	async getAttributeLabels() {
		return await productRepository.getAttributeLabels();
	},
};
