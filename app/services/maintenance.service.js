export const maintenanceService = {
	getMaintenanceServices: async () => {
		return [
			{
				icon: "🔧",
				title: "Sửa Chữa & Bảo Dưỡng",
				description: "Dịch vụ sửa chữa và bảo dưỡng định kỳ cho xe máy",
				price: "Từ 100.000đ",
				features: [
					"Thay nhớt định kỳ",
					"Kiểm tra hệ thống phanh",
					"Vệ sinh bugi",
					"Căn chỉnh xích xe",
					"Bảo hành 30 ngày",
				],
			},
			{
				icon: "🛞",
				title: "Thay Lốp Xe",
				description: "Thay thế lốp xe chính hãng với giá cả hợp lý",
				price: "Từ 250.000đ",
				features: [
					"Lốp chính hãng Michelin, Dunlop",
					"Vá lốp tại chỗ",
					"Cân bằng lốp",
					"Kiểm tra áp suất",
					"Bảo hành 6 tháng",
				],
			},
			{
				icon: "🔋",
				title: "Sửa Chữa Điện",
				description: "Khắc phục các sự cố về hệ thống điện xe máy",
				price: "Từ 150.000đ",
				features: [
					"Thay bình ắc quy",
					"Sửa đèn pha, đèn xi nhan",
					"Khắc phục lỗi IC",
					"Sửa hệ thống khởi động",
					"Bảo hành 3 tháng",
				],
			},
			{
				icon: "⚙️",
				title: "Thay Phụ Tùng",
				description: "Cung cấp phụ tùng chính hãng cho mọi dòng xe",
				price: "Theo báo giá",
				features: [
					"Phụ tùng Honda, Yamaha, Suzuki",
					"Má phanh, dây curoa",
					"Lọc gió, lọc xăng",
					"Bugi, dây ga",
					"Bảo hành chính hãng",
				],
			},
			{
				icon: "🚿",
				title: "Rửa Xe & Vệ Sinh",
				description: "Dịch vụ rửa xe và vệ sinh toàn diện",
				price: "50.000đ",
				features: [
					"Rửa xe bằng máy áp lực cao",
					"Vệ sinh khoang máy",
					"Đánh bóng thân xe",
					"Vệ sinh yên xe",
					"Phủ bóng bảo vệ",
				],
			},
			{
				icon: "📋",
				title: "Đăng Kiểm Xe Máy",
				description: "Hỗ trợ thủ tục đăng kiểm xe máy nhanh chóng",
				price: "200.000đ",
				features: [
					"Kiểm tra kỹ thuật trước đăng kiểm",
					"Hỗ trợ làm thủ tục",
					"Tư vấn pháp lý",
					"Nhận xe tại nhà",
					"Cam kết đậu 100%",
				],
			},
		];
	},
};
