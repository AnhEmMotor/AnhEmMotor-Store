export const homeRepository = {
	async getBrands() {
		const axios = useAxios();
		const { data } = await axios.get("/api/v1/Brand", {
			params: {
				pageSize: 10,
				sorts: "name",
			},
		});
		return data.items || [];
	},

	async getHeroStats() {
		
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
		const { data } = await axios.get("/api/v1/Product", {
			params: {
				pageSize: 8,
				sorts: "-createdAt",
			},
		});
		return data.items || [];
	},

	async getBanners(placement) {
		const axios = useAxios();
		const url = placement ? `/api/v1/banners/store?placement=${placement}` : "/api/v1/banners/store";
		const { data } = await axios.get(url);
		return Array.isArray(data) ? data : (data.data || []);
	},
};
