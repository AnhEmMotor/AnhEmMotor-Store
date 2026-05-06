
const homeService = {
	async getBrands() {
		const axios = useAxios();
		try {
			const { data } = await axios.get("/api/v1/Brand", {
				params: {
					pageSize: 10,
					sorts: "name",
				},
			});
			return data.items || [];
		} catch (error) {
			console.error("Failed to fetch brands:", error);
			return [];
		}
	},

	async getHeroStats() {
		// Mock stats for now or fetch from a real endpoint if available
		return [
			{ number: "50+", label: "Mẫu xe" },
			{ number: "1K+", label: "Khách hàng" },
			{ number: "5+", label: "Năm kinh nghiệm" },
		];
	},

	async getSearchPhrases() {
		return [
			"Nhập tên xe bạn muốn sở hữu...",
			'Tìm "Winner X v4", "Vario 160" hoặc hãng xe...',
		];
	},

	async getFeaturedProducts() {
		const axios = useAxios();
		try {
			const { data } = await axios.get("/api/v1/Product", {
				params: {
					pageSize: 8,
					sorts: "-createdAt",
				},
			});
			return data.items || [];
		} catch (error) {
			console.error("Failed to fetch featured products:", error);
			return [];
		}
	},

	async getBanners() {
		const axios = useAxios();
		try {
			const { data } = await axios.get("/api/v1/banners/active");
			return data || [];
		} catch (error) {
			console.error("Failed to fetch banners:", error);
			return [];
		}
	},
};

export default homeService;


