
export const aboutRepository = {
	
	getAboutContent: async () => {
		
		
		
		
		return {
			mission: {
				title: "Sứ Mệnh Của Chúng Tôi",
				description: "Tại AnhEm Moto, chúng tôi không chỉ đơn thuần là một cửa hàng xe máy – chúng tôi là người bạn đồng hành tin cậy trên mỗi chặng đường. Sứ mệnh của chúng tôi là mang đến cho khách hàng những phương tiện di chuyển an toàn, bền bỉ và phù hợp nhất với nhu cầu cá nhân, đồng thời xây dựng một cộng đồng người yêu xe mạnh mẽ và gắn kết.",
			},
			services: {
				title: "Dịch Vụ Tại AnhEm Moto",
				items: [
					{ label: "Bán xe mới và xe đã qua sử dụng:", desc: "Đầy đủ giấy tờ, chất lượng kiểm định kỹ càng, giá cạnh tranh." },
					{ label: "Dịch vụ bảo trì – sửa chữa:", desc: "Đội ngũ kỹ thuật viên chuyên nghiệp, phụ tùng chính hãng, quy trình minh bạch." },
					{ label: "Thu mua – đổi xe:", desc: "Hỗ trợ định giá nhanh chóng, thủ tục đơn giản, hỗ trợ sang tên." },
					{ label: "Tư vấn và hỗ trợ trả góp:", desc: "Hợp tác cùng nhiều đơn vị tài chính uy tín, thủ tục dễ dàng, lãi suất ưu đãi." },
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
					{ text: "Hơn 10 năm kinh nghiệm trong lĩnh vực xe máy tại TP.HCM", isStrong: true },
					{ text: "Hàng ngàn khách hàng hài lòng và quay lại mua xe lần 2, lần 3", isStrong: true },
					{ text: "Không gian cửa hàng hiện đại, dễ tiếp cận, đội ngũ nhân viên thân thiện, hỗ trợ nhiệt tình", isStrong: false },
					{ text: "Cập nhật liên tục các dòng xe mới nhất trên thị trường", isStrong: false },
				],
			},
			contact: {
				title: "Liên Hệ Với Chúng Tôi",
				description: "Hãy ghé thăm cửa hàng AnhEm Moto để trải nghiệm thực tế và nhận tư vấn chi tiết về chiếc xe phù hợp nhất với bạn. Chúng tôi luôn sẵn sàng hỗ trợ!",
				hotline: "0901 234 567",
				email: "info@anhemmotor.vn",
			},
			video: {
				title: "Hành Trình AnhEm Motor",
				subtitle: "Khám phá câu chuyện và tâm huyết đằng sau mỗi chiếc xe",
				url: "https://www.youtube.com/embed/1a0uk9yl3GA", 
			}
		};
	},

	
	getLocations: async () => {
		return [
			{ title: "Cơ Sở 2 - TP. Đồng Nai", address: "193 Đỗ Văn Thi, Trấn Biên, Đồng Nai 76126, Việt Nam" },
		];
	},
};
