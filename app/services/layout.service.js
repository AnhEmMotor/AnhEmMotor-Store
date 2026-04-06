const layoutService = {
	async getNavItems() {
		return [
			{ name: "Trang Chủ", path: "/" },
			{ name: "Sản Phẩm", path: "/products" },
			{ name: "Giới Thiệu", path: "/about" },
			{ name: "Tin Tức", path: "/news" },
			{ name: "Khuyến Mãi", path: "/promotion" },
			{ name: "Liên Hệ", path: "/contact" },
			{ name: "Dịch Vụ", path: "/service" },
		];
	},

	async getFooterData() {
		return {
			contact: {
				address:
					"193 Đỗ Văn Thi, Phường Trấn Biên, TP. Biên Hoà, Tỉnh Đồng Nai",
				phone: "(024) 8582 0808",
				email: "anhemmotor@gmail.com",
				socials: [
					{ name: "facebook", icon: "fa6-brands:facebook-f", url: "#" },
					{ name: "youtube", icon: "fa6-brands:youtube", url: "#" },
					{ name: "instagram", icon: "fa6-brands:instagram", url: "#" },
					{ name: "tiktok", icon: "fa6-brands:tiktok", url: "#" },
				],
			},
			sections: [
				{
					title: "Sản Phẩm",
					links: [
						{ name: "Xe máy Honda", url: "#" },
						{ name: "Xe máy Yamaha", url: "#" },
						{ name: "Xe máy Suzuki", url: "#" },
						{ name: "Xe máy Kawasaki", url: "#" },
						{ name: "Phụ kiện xe máy", url: "#" },
					],
				},
				{
					title: "Dịch Vụ",
					links: [
						{ name: "Bảo dưỡng định kỳ", url: "#" },
						{ name: "Sửa chữa xe máy", url: "#" },
						{ name: "Đăng ký xe", url: "#" },
						{ name: "Bảo hiểm xe máy", url: "#" },
						{ name: "Tư vấn mua xe", url: "#" },
					],
				},
				{
					title: "Hỗ Trợ",
					links: [
						{ name: "Chính sách bảo hành", url: "#" },
						{ name: "Hướng dẫn sử dụng", url: "#" },
						{ name: "FAQ", url: "#" },
						{ name: "Liên hệ hỗ trợ", url: "#" },
						{ name: "Sitemap", url: "#" },
					],
				},
			],
		};
	},
};

export default layoutService;
