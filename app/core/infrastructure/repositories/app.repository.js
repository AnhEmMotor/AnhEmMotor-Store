
export const appRepository = {
	getAppContent: async () => {
		
		return {
			title: "ANHEMMOTO APP",
			subtitle: "Trải nghiệm hoàn toàn mới",
			description: "Đặt lịch bảo dưỡng siêu tốc, quản lý lịch trình chăm sóc xế yêu, tích lũy điểm thưởng đổi quà đặc quyền và khám phá thế giới xe máy chính hãng ngay trên chiếc điện thoại của bạn.",
			downloadLinks: {
				appStore: "https://apps.apple.com/vn/app/anhemmoto",
				googlePlay: "https://play.google.com/store/apps/details?id=com.anhemmoto"
			},
			stats: [
				{ value: "100,000+", label: "Lượt Tải Xuống", description: "Trên các nền tảng di động" },
				{ value: "4.9★", label: "Đánh Giá Ứng Dụng", description: "Từ người dùng thực tế" },
				{ value: "98%", label: "Khách Hàng Hài Lòng", description: "Về dịch vụ đặt lịch hẹn" },
				{ value: "30 Giây", label: "Đặt Lịch Nhanh Chóng", description: "Tiết kiệm tối đa thời gian" }
			],
			features: [
				{ icon: "ph:calendar-check-fill", title: "Đặt Lịch 30 Giây", description: "Chủ động lựa chọn thời gian, chi nhánh dịch vụ và thợ sửa chữa yêu thích của bạn mà không phải xếp hàng chờ đợi khi đến nơi." },
				{ icon: "ph:wrench-fill", title: "Sổ Bảo Dưỡng Điện Tử", description: "Theo dõi toàn bộ lịch sử sửa chữa, bảo dưỡng định kỳ và các hạng mục phụ tùng đã thay thế của xe cực kỳ dễ dàng trực quan." },
				{ icon: "ph:gift-fill", title: "Tích Điểm Hội Viên", description: "Tự động tích lũy điểm khi sửa chữa xe tại cửa hàng và quy đổi sang các phần quà, mã giảm giá dịch vụ hay dầu nhớt chất lượng cao." },
				{ icon: "ph:tag-fill", title: "Ưu Đãi Độc Quyền", description: "Nhận các thông báo đẩy về chương trình khuyến mãi hàng tháng, voucher giảm giá phụ tùng chỉ áp dụng duy nhất trên nền tảng di động." },
				{ icon: "ph:shopping-cart-fill", title: "Mua Sắm Phụ Tùng", description: "Tìm kiếm và đặt mua phụ tùng, đồ chơi xe máy chính hãng ngay trên App với chính sách bảo hành điện tử rõ ràng, uy tín." },
				{ icon: "ph:first-aid-kit-fill", title: "Cứu Hộ Khẩn Cấp 24/7", description: "Gặp sự cố trên đường? Chỉ với một nút bấm gửi định vị, đội ngũ kỹ thuật viên lưu động sẽ liên hệ cứu hộ bạn trong thời gian ngắn nhất." }
			],
			faqs: [
				{ question: "Ứng dụng AnhEmMoto có hoàn toàn miễn phí không?", answer: "Hoàn toàn miễn phí! Bạn có thể tải app trên cả App Store (iOS) và Google Play (Android) mà không tốn bất kỳ chi phí nào để sử dụng các tính năng cơ bản như đặt lịch, theo dõi bảo dưỡng." },
				{ question: "Làm thế nào để tích điểm và đổi quà trên App?", answer: "Mỗi khi bạn sử dụng dịch vụ tại hệ thống cửa hàng AnhEm Motor hoặc mua sắm phụ tùng trực tuyến qua App, hệ thống sẽ tự động cộng điểm tích lũy dựa trên giá trị hóa đơn. Bạn có thể dùng điểm này để đổi voucher giảm giá hoặc quà tặng hấp dẫn ngay trong mục 'Đổi quà'." },
				{ question: "Sổ bảo dưỡng điện tử hoạt động như thế nào?", answer: "Toàn bộ lịch sử bảo dưỡng, thay dầu, sửa chữa xe của bạn tại hệ thống cửa hàng AnhEm Motor sẽ được đồng bộ trực tiếp lên App. Ứng dụng cũng sẽ tự động nhắc nhở khi đến chu kỳ bảo dưỡng định kỳ tiếp theo để bảo vệ xe của bạn tốt nhất." }
			]
		};
	}
};
