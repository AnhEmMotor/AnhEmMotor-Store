export const productService = {
	async getProducts(params) {
		try {
			const data = await productRepository.getProducts(params);
			return {
				items: data.items || [],
				totalCount: data.totalCount,
				totalPages: data.totalPages,
			};
		} catch {
			return { items: [], totalCount: 0 };
		}
	},

	async getProductDetail(slug) {
		try {
			const data = await productRepository.getProductDetail(slug);
			return data || null;
		} catch (error) {
			console.error("[product.service] getProductDetail failed:", error);
			return null;
		}
	},

	async getOptions() {
		return await productRepository.getOptions();
	},

	async getAttributeLabels() {
		return await productRepository.getAttributeLabels();
	},

	async getBrands() {
		try {
			const data = await productRepository.getBrands();
			return data?.items || data || [];
		} catch {
			return [];
		}
	},

	async getRecommendations(params) {
		try {
			const data = await productRepository.getRecommendations(params);
			return { items: data.items || [], totalCount: data.totalCount };
		} catch {
			return { items: [], totalCount: 0 };
		}
	},

	async trackView(productId, dwellTimeMs, visitorKey) {
		try {
			await productRepository.trackView(productId, dwellTimeMs, visitorKey);
		} catch {
			// Best-effort — mất 1 lượt tracking không nên ảnh hưởng trải nghiệm xem sản phẩm.
		}
	},
};

export default productService;
