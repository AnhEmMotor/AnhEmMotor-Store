/**
 * Infrastructure Layer - Recruitment Repository
 * Handles data fetching and application submissions
 */
export const recruitmentRepository = {
	/**
	 * Fetches available job positions
	 */
	getJobs: async () => {
		// Mock data - In production, this would be an API call
		return [
			{
				id: 1,
				title: 'Nhân viên Tư vấn Bán hàng',
				salary: '8 – 15 Triệu',
				type: 'Full-time',
				location: 'Biên Hòa, Đồng Nai',
				experience: 'Ưu tiên có kinh nghiệm',
				icon: 'i-lucide-user-check',
				details: [
					{
						title: 'Mô tả công việc',
						points: [
							'Chào đón và tư vấn các dòng xe phù hợp với nhu cầu khách hàng.',
							'Giới thiệu các chương trình khuyến mãi, hậu mãi của cửa hàng.',
							'Hướng dẫn khách hàng hoàn tất thủ tục mua xe và đăng ký giấy tờ.',
							'Chăm sóc khách hàng sau bán hàng để xây dựng mối quan hệ lâu dài.'
						]
					},
					{
						title: 'Yêu cầu công việc',
						points: [
							'Kỹ năng giao tiếp tốt, tự tin, thân thiện.',
							'Yêu thích lĩnh vực xe máy và dịch vụ khách hàng.',
							'Trung thực, có trách nhiệm và tinh thần học hỏi cao.',
							'Ngoại hình ưa nhìn là một lợi thế.'
						]
					},
					{
						title: 'Quyền lợi',
						points: [
							'Lương cứng + Hoa hồng theo doanh số hấp dẫn.',
							'Được đào tạo bài bản về kiến thức sản phẩm và kỹ năng bán hàng.',
							'Môi trường làm việc năng động, trẻ trung.',
							'Chế độ nghỉ lễ, Tết và team building hàng năm.'
						]
					}
				]
			},
			{
				id: 2,
				title: 'Kỹ thuật viên Sửa chữa & Bảo dưỡng',
				salary: '10 – 18 Triệu',
				type: 'Full-time',
				location: 'Biên Hòa, Đồng Nai',
				experience: '1 năm+ kinh nghiệm',
				icon: 'i-lucide-wrench',
				details: [
					{
						title: 'Mô tả công việc',
						points: [
							'Thực hiện bảo dưỡng định kỳ các dòng xe máy (xe ga, xe số, xe côn tay).',
							'Chẩn đoán và sửa chữa các lỗi kỹ thuật, hệ thống điện, động cơ.',
							'Tư vấn cho khách hàng về tình trạng xe và các phụ tùng cần thay thế.',
							'Đảm bảo chất lượng sửa chữa và vệ sinh khu vực làm việc.'
						]
					},
					{
						title: 'Yêu cầu công việc',
						points: [
							'Có kiến thức sâu về kỹ thuật xe máy.',
							'Cẩn thận, tỉ mỉ và có đạo đức nghề nghiệp.',
							'Sử dụng thành thạo các thiết bị chẩn đoán hiện đại.',
							'Có sức khỏe tốt, chịu được áp lực công việc.'
						]
					},
					{
						title: 'Quyền lợi',
						points: [
							'Mức lương cạnh tranh tương xứng với tay nghề.',
							'Hỗ trợ ăn trưa và trang bị đồng phục bảo hộ cao cấp.',
							'Cơ hội đào tạo nâng cao tay nghề từ các chuyên gia của hãng.',
							'Thưởng chuyên cần và thưởng năng suất hàng tháng.'
						]
					}
				]
			},
			{
				id: 3,
				title: 'Nhân viên Chăm sóc Khách hàng',
				salary: '7 – 10 Triệu',
				type: 'Full-time',
				location: 'Biên Hòa, Đồng Nai',
				experience: 'Không yêu cầu kinh nghiệm',
				icon: 'i-lucide-headset',
				details: [
					{
						title: 'Mô tả công việc',
						points: [
							'Tiếp nhận cuộc gọi và giải đáp thắc mắc của khách hàng.',
							'Nhắc lịch bảo dưỡng định kỳ và gửi lời chúc mừng sinh nhật khách.',
							'Quản lý dữ liệu khách hàng trên hệ thống CRM.',
							'Phối hợp với bộ phận Sales để nâng cao chất lượng dịch vụ.'
						]
					},
					{
						title: 'Yêu cầu công việc',
						points: [
							'Giọng nói truyền cảm, không ngọng, không nói ngọng địa phương.',
							'Kỹ năng lắng nghe và giải quyết vấn đề tốt.',
							'Sử dụng thành thạo máy tính văn phòng.',
							'Kiên nhẫn và luôn giữ thái độ tích cực.'
						]
					}
				]
			}
		];
	},

	/**
	 * Fetches recruitment FAQs
	 */
	getFaqs: async () => {
		return [
			{
				label: 'Công ty có đào tạo cho người chưa có kinh nghiệm không?',
				content: 'Có, AnhEm Motor luôn sẵn sàng đào tạo bài bản cho các ứng viên chưa có kinh nghiệm nhưng có thái độ tốt và đam mê học hỏi, đặc biệt là ở vị trí Tư vấn bán hàng và CSKH.'
			},
			{
				label: 'Mức lương và chế độ đãi ngộ như thế nào?',
				content: 'Chúng tôi cung cấp mức lương cạnh tranh kèm theo hoa hồng doanh số hấp dẫn. Ngoài ra, nhân viên còn được hưởng các chế độ như thưởng lễ Tết, du lịch hàng năm và BHXH theo quy định.'
			},
			{
				label: 'Mất bao lâu để nhận được phản hồi sau khi ứng tuyển?',
				content: 'Thông thường bộ phận nhân sự sẽ liên hệ với bạn trong vòng 24h - 48h làm việc kể từ khi nhận được hồ sơ ứng tuyển trực tuyến.'
			},
			{
				label: 'Có yêu cầu bằng cấp chuyên môn cho vị trí kỹ thuật viên không?',
				content: 'Đối với kỹ thuật viên sửa chữa, chúng tôi ưu tiên các ứng viên có chứng chỉ nghề hoặc bằng cấp liên quan. Tuy nhiên, tay nghề thực tế và kinh nghiệm vẫn là yếu tố quyết định quan trọng nhất.'
			}
		];
	},

	/**
	 * Submits a recruitment application
	 * @param {Object} formData 
	 */
	submitApplication: async (formData) => {
		// Mock submission delay
		await new Promise(resolve => setTimeout(resolve, 2000));
		
		// In production:
		// const axios = useAxios();
		// return await axios.post('/api/recruitment/apply', formData);
		
		return { success: true, message: 'Application submitted successfully' };
	}
};
