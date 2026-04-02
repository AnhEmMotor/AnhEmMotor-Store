export const aboutService = {
	getAboutContent: async () => {
		return {
			mission: {
				title: "Sứ Mệnh Của Chúng Tôi",
				description:
					"Tại AnhEm Moto, chúng tôi không chỉ đơn thuần là một cửa hàng xe máy – chúng tôi là người bạn đồng hành tin cậy trên mỗi chặng đường. Sứ mệnh của chúng tôi là mang đến cho khách hàng những phương tiện di chuyển an toàn, bền bỉ và phù hợp nhất với nhu cầu cá nhân, đồng thời xây dựng một cộng đồng người yêu xe mạnh mẽ và gắn kết.",
			},
			services: {
				title: "Dịch Vụ Tại AnhEm Moto",
				items: [
					{
						label: "Bán xe mới và xe đã qua sử dụng:",
						desc: "Đầy đủ giấy tờ, chất lượng kiểm định kỹ càng, giá cạnh tranh.",
					},
					{
						label: "Dịch vụ bảo trì – sửa chữa:",
						desc: "Đội ngũ kỹ thuật viên chuyên nghiệp, phụ tùng chính hãng, quy trình minh bạch.",
					},
					{
						label: "Thu mua – đổi xe:",
						desc: "Hỗ trợ định giá nhanh chóng, thủ tục đơn giản, hỗ trợ sang tên.",
					},
					{
						label: "Tư vấn và hỗ trợ trả góp:",
						desc: "Hợp tác cùng nhiều đơn vị tài chính uy tín, thủ tục dễ dàng, lãi suất ưu đãi.",
					},
				],
			},
			commitment: {
				title: "Cam Kết Từ AnhEm Moto",
				list: [
					"Xe đúng chất lượng như cam kết",
					"Không xe tai nạn, ngập nước",
					"Giá bán hợp lý, minh bạch",
					"Bảo hành rõ ràng, dịch vụ hậu mãi tận tâm",
					"Hỗ trợ khách hàng từ khâu tư vấn đến sau khi mua",
				],
			},
			whyChooseUs: {
				title: "Tại Sao Chọn Chúng Tôi?",
				items: [
					{
						text: "Hơn 10 năm kinh nghiệm trong lĩnh vực xe máy tại TP.HCM",
						isStrong: true,
					},
					{
						text: "Hàng ngàn khách hàng hài lòng và quay lại mua xe lần 2, lần 3",
						isStrong: true,
					},
					{
						text: "Không gian cửa hàng hiện đại, dễ tiếp cận, đội ngũ nhân viên thân thiện, hỗ trợ nhiệt tình",
						isStrong: false,
					},
					{
						text: "Cập nhật liên tục các dòng xe mới nhất trên thị trường",
						isStrong: false,
					},
				],
			},
			contact: {
				title: "Liên Hệ Với Chúng Tôi",
				description:
					"Hãy ghé thăm cửa hàng AnhEm Moto để trải nghiệm thực tế và nhận tư vấn chi tiết về chiếc xe phù hợp nhất với bạn. Chúng tôi luôn sẵn sàng hỗ trợ!",
				hotline: "0901 234 567",
				email: "info@anhemmotor.vn",
			},
			video: {
				title: "Yamaha - Revs Your Heart",
				subtitle: "Khám phá thế giới xe máy Yamaha đầy cảm hứng",
				url: "https://www.youtube.com/embed/HMpEe4_Gnd4",
			},
		};
	},

	getLocations: async () => {
		return [
			{
				title: "Cơ Sở 1 - TP.HCM",
				address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
			},
			{
				title: "Cơ Sở 2 - Hà Nội",
				address: "456 Giải Phóng, Hai Bà Trưng, Hà Nội",
			},
			{
				title: "Cơ Sở 3 - Đà Nẵng",
				address: "789 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng",
			},
			{
				title: "Cơ Sở 4 - Cần Thơ",
				address: "321 3 Tháng 2, Ninh Kiều, Cần Thơ",
			},
			{
				title: "Cơ Sở 5 - Nha Trang",
				address: "654 Trần Phú, Nha Trang, Khánh Hòa",
			},
			{
				title: "Cơ Sở 6 - Hải Phòng",
				address: "147 Lê Hồng Phong, Ngô Quyền, Hải Phòng",
			},
		];
	},
};
