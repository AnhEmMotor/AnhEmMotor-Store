
export const maintenanceRepository = {
	async getMaintenanceServices() {
		return [
			{
				id: 1,
				icon: "🔧",
				image: "/service-1.png",
				name: "Bảo Dưỡng Toàn Diện",
				category: "maintenance",
				categoryLabel: "Bảo dưỡng định kỳ",
				description: "Kiểm tra toàn bộ hệ thống xe, từ động cơ đến hệ thống phanh, đảm bảo vận hành êm ái và bền bỉ như mới.",
				price: 150000,
				estimatedTime: "45",
				features: [
					"Thay nhớt động cơ chính hãng",
					"Kiểm tra hệ thống phanh an toàn",
					"Vệ sinh lọc gió & bugi chuyên sâu"
				],
			},
			{
				id: 2,
				icon: "🛞",
				image: "/service-2.png",
				name: "Thay Lốp Chuyên Nghiệp",
				category: "tires",
				categoryLabel: "Lốp & Mâm xe",
				description: "Thay thế lốp xe chính hãng Michelin, Dunlop với máy ra vào lốp hiện đại, không làm trầy xước vành xe.",
				price: 350000,
				estimatedTime: "30",
				features: [
					"Lốp Michelin/Dunlop cao cấp",
					"Cân bằng động mâm xe chính xác",
					"Bảo hành 6 tháng toàn quốc"
				],
			},
			{
				id: 3,
				icon: "🔋",
				image: "/service-3.png",
				name: "Sửa Chữa Hệ Thống Điện",
				category: "electrical",
				categoryLabel: "Hệ thống điện tử",
				description: "Chẩn đoán chính xác và khắc phục các sự cố về IC, ắc quy và hệ thống chiếu sáng bằng thiết bị đo chuyên dụng.",
				price: 200000,
				estimatedTime: "60",
				features: [
					"Kiểm tra hệ thống sạc thông minh",
					"Thay bình ắc quy GS chính hiệu",
					"Sửa lỗi hệ thống phun xăng Fi"
				],
			},
			{
				id: 4,
				icon: "⚙️",
				image: "/service-4.png",
				name: "Sửa Chữa Động Cơ",
				category: "repair",
				categoryLabel: "Sửa chữa chuyên sâu",
				description: "Phục hồi công suất động cơ, xử lý triệt để các tiếng động lạ và tình trạng hao xăng, mang lại sức mạnh nguyên bản.",
				price: 500000,
				estimatedTime: "120",
				features: [
					"Làm sạch buồng đốt Carbon",
					"Căn chỉnh khe hở xupap chuẩn hãng",
					"Vệ sinh hệ thống truyền động nồi"
				],
			},
			{
				id: 5,
				icon: "🚿",
				name: "Vệ Sinh Chi Tiết (Detailing)",
				category: "cleaning",
				categoryLabel: "Chăm sóc ngoại thất",
				description: "Làm sạch sâu từng ngóc ngách, đánh bóng phục hồi màu sơn và phủ bảo vệ bề mặt chống bám bẩn.",
				price: 100000,
				image: "/service-5.png",
				estimatedTime: "60",
				features: [
					"Rửa xe không chạm công nghệ mới",
					"Dưỡng bóng dàn nhựa nhám bền lâu",
					"Tẩy ố vành xe và chi tiết kim loại"
				],
			},
			{
				id: 6,
				icon: "📋",
				image: "/service-6.png",
				name: "Tư Vấn Đăng Kiểm & Pháp Lý",
				category: "other",
				categoryLabel: "Dịch vụ hỗ trợ",
				description: "Hỗ trợ khách hàng hoàn thiện thủ tục đăng kiểm, sang tên và các vấn đề pháp lý nhanh chóng, đúng quy định.",
				price: 300000,
				estimatedTime: "90",
				features: [
					"Kiểm tra tiêu chuẩn kỹ thuật xe",
					"Hoàn thiện hồ sơ nhanh gọn",
					"Tư vấn pháp lý xe máy miễn phí"
				],
			}
		];
	},
};
