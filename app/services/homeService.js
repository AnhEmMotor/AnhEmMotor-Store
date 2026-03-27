const homeService = {
	async getBrands() {
		return [
			{
				img: "/assets/image/index/brand/honda.webp",
				alt: "Honda Logo",
				text: "Thương hiệu xe máy số 1 thế giới với chất lượng và độ bền vượt trội",
			},
			{
				img: "/assets/image/index/brand/yamaha.webp",
				alt: "Yamaha Logo",
				text: "Thiết kế thể thao, công nghệ tiên tiến và âm thanh động cơ đầy sức hút",
			},
			{
				img: "/assets/image/index/brand/suzuki.webp",
				alt: "Suzuki Logo",
				text: "Nâng cao chất lượng, an toàn và thoải mái, nhân rộng niềm vui của tất cả mọi người",
			},
			{
				img: "/assets/image/index/brand/kawasaki.webp",
				alt: "Kawasaki Logo",
				text: "Phong cách mạnh mẽ, hiệu suất vượt trội, tốc độ đỉnh cao và công nghệ đột phá",
			},
		];
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
};

export default homeService;
