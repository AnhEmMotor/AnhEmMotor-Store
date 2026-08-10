export const technologyRepository = {
  async getConnectivityFeatures() {
    return [
      {
        title: 'Dự báo bảo dưỡng thông minh',
        description:
          'Không chỉ nhắc lịch, hệ thống phân tích dữ liệu thực tế để dự báo chính xác thời điểm cần thay thế linh kiện, giúp xe luôn trong trạng thái hoàn hảo.',
        icon: 'ph:cpu-fill',
      },
      {
        title: 'Nhật ký hành trình & Hành vi',
        description:
          'Phân tích thói quen lái xe, quãng đường và mức tiêu thụ nhiên liệu để tối ưu hóa chi phí vận hành cho người dùng.',
        icon: 'ph:chart-line-up-fill',
      },
      {
        title: 'Cứu hộ khẩn cấp 24/7',
        description:
          'Yên tâm tuyệt đối với mạng lưới cứu hộ phủ rộng toàn quốc. Chỉ với một chạm trên ứng dụng, đội ngũ kỹ thuật chuyên nghiệp sẽ có mặt hỗ trợ bạn mọi lúc, mọi nơi.',
        icon: 'ph:first-aid-kit-fill',
      },
    ];
  },

  async getEngineTechs() {
    return [
      {
        name: 'eSP+',
        detail:
          'Thế hệ động cơ mới tăng công suất, giảm ma sát tối đa và siêu tiết kiệm nhiên liệu.',
      },
      {
        name: 'Blue Core',
        detail: 'Tối ưu hóa hiệu suất đốt cháy và làm mát, mang lại sự vận hành êm ái vượt trội.',
      },
      {
        name: 'PFI System',
        detail:
          'Hệ thống phun xăng điện tử chính xác đến từng micro-giây, tối ưu hóa mọi giọt nhiên liệu.',
      },
    ];
  },

  async getSafetyFeatures() {
    return [
      {
        title: 'Phanh ABS vs CBS',
        description:
          'ABS chống bó cứng phanh khi phanh gấp; CBS phân bổ lực phanh đều giữa hai bánh. Cả hai phối hợp bảo vệ bạn tối đa.',
        icon: 'ph:shield-check-fill',
      },
      {
        title: 'Kiểm soát lực kéo (HSTC)',
        description:
          'Hệ thống kiểm soát mô-men xoắn giúp ngăn chặn tình trạng trượt bánh khi tăng tốc trên đường trơn trượt.',
        icon: 'ph:lightning-fill',
      },
      {
        title: 'Hỗ trợ đỗ xe (Parking Assist)',
        description:
          'Cảm biến và hệ thống trợ lực giúp việc dừng đỗ xe trong không gian hẹp trở nên dễ dàng và an toàn hơn.',
        icon: 'ph:park-fill',
      },
    ];
  },

  async getInteractionCards() {
    const interactionCardsData = [
      {
        title: 'Phân phối xe máy chính hãng',
        slug: 'phan-phoi-xe-may',
        description:
          'Cung cấp đa dạng các dòng xe máy mới nhất từ các thương hiệu hàng đầu như Honda, Yamaha, Suzuki với giá cả cạnh tranh.',
        content: `
					<p class="lead" style="font-size: 1.25rem; font-style: italic; color: #a1a1aa; margin-bottom: 2rem;">AnhEm Motor tự hào là đại lý phân phối chính thức của các thương hiệu xe máy hàng đầu, mang đến cho khách hàng sự đa dạng trong lựa chọn và sự an tâm tuyệt đối về chất lượng.</p>
					
					<h3 style="color: white; margin-top: 2rem; font-size: 1.5rem;">Đa dạng dòng xe, đáp ứng mọi nhu cầu</h3>
					<p>Tại hệ thống cửa hàng của chúng tôi, khách hàng có thể dễ dàng tìm thấy các mẫu xe mới nhất trên thị trường, từ xe số phổ thông, xe tay ga thời trang, đến các dòng xe côn tay thể thao mạnh mẽ. Dù bạn là sinh viên, nhân viên văn phòng hay những người đam mê tốc độ, AnhEm Motor luôn có chiếc xe phù hợp dành cho bạn.</p>
					
					<h3 style="color: white; margin-top: 2rem; font-size: 1.5rem;">Cam kết của chúng tôi</h3>
					<ul>
						<li><strong>100% Chính hãng:</strong> Mọi chiếc xe bán ra đều có nguồn gốc xuất xứ rõ ràng, đầy đủ giấy tờ và chế độ bảo hành từ nhà sản xuất.</li>
						<li><strong>Giá cả cạnh tranh:</strong> Chúng tôi luôn nỗ lực tối ưu hoá quy trình nhập khẩu và phân phối để mang đến mức giá tốt nhất cho khách hàng.</li>
						<li><strong>Hỗ trợ trả góp linh hoạt:</strong> Liên kết với nhiều ngân hàng và tổ chức tín dụng uy tín, hỗ trợ duyệt hồ sơ nhanh chóng với lãi suất ưu đãi.</li>
						<li><strong>Tư vấn tận tâm:</strong> Đội ngũ nhân viên bán hàng được đào tạo bài bản, sẵn sàng lắng nghe và tư vấn giúp bạn chọn được chiếc xe ưng ý nhất.</li>
					</ul>
					
					<p>Đến với AnhEm Motor, việc sở hữu một chiếc xe máy mới chưa bao giờ dễ dàng và an tâm đến thế.</p>
				`,
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600',
        icon: 'ph:motorcycle-fill',
      },
      {
        title: 'Phụ tùng & Đồ chơi xe',
        slug: 'phu-tung-do-choi-xe',
        description:
          'Chuyên cung cấp sỉ và lẻ các loại phụ tùng, đồ chơi xe máy, dầu nhớt và phụ kiện chính hãng chất lượng cao.',
        content: `
					<p class="lead" style="font-size: 1.25rem; font-style: italic; color: #a1a1aa; margin-bottom: 2rem;">Bên cạnh việc phân phối xe máy, AnhEm Motor còn là điểm đến tin cậy cho những ai đang tìm kiếm phụ tùng thay thế và phụ kiện nâng cấp cho "xế cưng" của mình.</p>
					
					<h3 style="color: white; margin-top: 2rem; font-size: 1.5rem;">Kho phụ tùng phong phú, chính hãng</h3>
					<p>Chúng tôi cung cấp đầy đủ các loại phụ tùng thay thế định kỳ và sửa chữa cho hầu hết các dòng xe phổ biến trên thị trường. Từ nhông sên dĩa, bố thắng, lọc gió, ắc quy đến các bộ phận động cơ phức tạp, tất cả đều được nhập khẩu chính hãng, đảm bảo độ bền và hiệu suất hoạt động tốt nhất cho xe của bạn.</p>
					
					<h3 style="color: white; margin-top: 2rem; font-size: 1.5rem;">Đa dạng đồ chơi và phụ kiện</h3>
					<ul>
						<li><strong>Nâng cấp ngoại hình:</strong> Các loại tem xe, ốc titan, bao tay, gương chiếu hậu thời trang giúp xe bạn trở nên cá tính và nổi bật hơn.</li>
						<li><strong>Nâng cấp hiệu suất:</strong> Phuộc nhún thể thao, pô độ, mâm đúc hợp kim siêu nhẹ,... dành cho những tay lái đam mê trải nghiệm.</li>
						<li><strong>Dầu nhớt & Chăm sóc xe:</strong> Các dòng dầu nhớt tổng hợp cao cấp, dung dịch làm sạch động cơ, xịt dưỡng sên từ các thương hiệu nổi tiếng thế giới.</li>
						<li><strong>Đồ bảo hộ:</strong> Mũ bảo hiểm đạt chuẩn, găng tay, áo khoác giáp bảo vệ an toàn tối đa cho người lái.</li>
					</ul>
					
					<p>AnhEm Motor cam kết mang đến những sản phẩm phụ trợ tốt nhất, giúp tối ưu hoá trải nghiệm lái xe của bạn trên mọi hành trình.</p>
				`,
        image: '/images/technology/engine_xray.webp',
        icon: 'ph:gear-fill',
      },
      {
        title: 'Bảo dưỡng & Sửa chữa',
        slug: 'bao-duong-sua-chua',
        description:
          'Đội ngũ kỹ thuật viên giàu kinh nghiệm cùng trang thiết bị hiện đại, mang đến dịch vụ chăm sóc, bảo dưỡng xe chuyên nghiệp.',
        content: `
					<p class="lead" style="font-size: 1.25rem; font-style: italic; color: #a1a1aa; margin-bottom: 2rem;">Trung tâm Dịch vụ AnhEm Motor sở hữu đội ngũ kỹ thuật viên tay nghề cao và hệ thống máy móc chuẩn quốc tế, cam kết mang lại sự chăm sóc tốt nhất cho chiếc xe của bạn.</p>
					
					<h3 style="color: white; margin-top: 2rem; font-size: 1.5rem;">Dịch vụ chuyên nghiệp, tận tâm</h3>
					<p>Chúng tôi hiểu rằng một chiếc xe vận hành êm ái là chìa khoá cho những chuyến đi an toàn. Tại AnhEm Motor, quy trình bảo dưỡng và sửa chữa được thực hiện nghiêm ngặt theo tiêu chuẩn của nhà sản xuất. Mỗi chiếc xe khi đưa vào trung tâm đều được kiểm tra tổng quát kỹ lưỡng bằng máy chẩn đoán lỗi hiện đại trước khi tiến hành xử lý.</p>
					
					<h3 style="color: white; margin-top: 2rem; font-size: 1.5rem;">Các gói dịch vụ chính</h3>
					<ul>
						<li><strong>Bảo dưỡng định kỳ:</strong> Kiểm tra, vệ sinh và thay mới các chi tiết hao mòn theo số kilomet, giúp xe duy trì phong độ tốt nhất.</li>
						<li><strong>Sửa chữa nặng & Phục hồi:</strong> Xử lý các sự cố về động cơ, hệ thống phun xăng điện tử, hệ thống điện, và phục hồi xe sau tai nạn.</li>
						<li><strong>Rửa xe & Detailing:</strong> Dịch vụ chăm sóc làm đẹp xe cao cấp, phủ nano, đánh bóng phục hồi màu sơn.</li>
						<li><strong>Phòng chờ VIP:</strong> Trong thời gian chờ đợi, khách hàng có thể thư giãn tại phòng chờ tiện nghi với nước uống miễn phí và theo dõi trực tiếp quá trình sửa chữa xe qua màn hình camera.</li>
					</ul>
					
					<p>Với tiêu chí "Chất lượng làm nên thương hiệu", dịch vụ hậu mãi của AnhEm Motor luôn sẵn sàng phục vụ và đồng hành cùng bạn dài lâu.</p>
				`,
        image: '/images/technology/safety_blueprint.webp',
        icon: 'ph:wrench-fill',
      },
      {
        title: 'Trả góp & Tài chính',
        slug: 'tra-gop-tai-chinh',
        description:
          'Mua xe dễ dàng với các gói hỗ trợ tài chính linh hoạt, lãi suất thấp và thủ tục phê duyệt siêu tốc.',
        content: `
					<p class="lead" style="font-size: 1.25rem; font-style: italic; color: #a1a1aa; margin-bottom: 2rem;">Thấu hiểu nhu cầu sở hữu xe sớm của khách hàng, AnhEm Motor hợp tác cùng các đối tác tài chính hàng đầu để mang đến giải pháp trả góp linh hoạt, tiết kiệm.</p>
					
					<h3 style="color: white; margin-top: 2rem; font-size: 1.5rem;">Sở hữu xe ngay, trả tiền từ từ</h3>
					<p>Giờ đây, bạn không cần phải chuẩn bị toàn bộ số tiền lớn ngay lập tức. Với dịch vụ Hỗ trợ Trả góp tại cửa hàng, chỉ cần trả trước từ 10% - 20% giá trị xe, bạn đã có thể rinh ngay chiếc xe yêu thích về nhà. Số tiền còn lại sẽ được chia nhỏ và thanh toán dễ dàng hàng tháng.</p>
					
					<h3 style="color: white; margin-top: 2rem; font-size: 1.5rem;">Ưu điểm của dịch vụ Tài chính tại AnhEm Motor</h3>
					<ul>
						<li><strong>Thủ tục siêu tốc:</strong> Đăng ký trực tuyến hoặc tại cửa hàng, chỉ cần Căn cước công dân. Thời gian xét duyệt chỉ từ 15 - 30 phút.</li>
						<li><strong>Lãi suất cạnh tranh:</strong> Nhiều gói ưu đãi lãi suất thấp, thậm chí 0% qua thẻ tín dụng hoặc các kỳ hạn đặc biệt.</li>
						<li><strong>Kỳ hạn linh hoạt:</strong> Lựa chọn trả góp từ 6, 9, 12 đến 24 tháng tuỳ theo khả năng tài chính cá nhân.</li>
						<li><strong>Bảo mật thông tin:</strong> Mọi thông tin cá nhân và hồ sơ vay của khách hàng đều được cam kết bảo mật tuyệt đối bởi các ngân hàng đối tác.</li>
					</ul>
					
					<p>Hãy để vấn đề tài chính không còn là rào cản ngăn bạn chạm tay vào chiếc xe mơ ước. Trải nghiệm dịch vụ trả góp thông minh cùng AnhEm Motor!</p>
				`,
        image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=600',
        icon: 'ph:wallet-fill',
      },
    ];
    return interactionCardsData;
  },

  async getInteractionCardBySlug(slug) {
    const cards = await this.getInteractionCards();
    const card = cards.find((c) => c.slug === slug);
    if (!card) throw new Error('Interaction card not found');
    return card;
  },

  async getManagementFeatures() {
    return [
      {
        title: 'Quản lý Đơn hàng & Kho xe',
        desc: 'Theo dõi tồn kho thực tế, quy trình xử lý đơn hàng tự động hóa hoàn toàn.',
        icon: 'ph:package-fill',
      },
      {
        title: 'Báo cáo Tài chính Tự động',
        desc: 'Hệ thống tự động tổng hợp doanh thu, chi phí và lợi nhuận theo thời gian thực.',
        icon: 'ph:chart-pie-slice-fill',
      },
      {
        title: 'CRM thông minh',
        desc: 'Quản lý và chăm sóc khách hàng dựa trên lịch sử mua sắm và thói quen sử dụng dịch vụ.',
        icon: 'ph:user-gear-fill',
      },
      {
        title: 'Thanh toán App Mobile',
        desc: 'Tích hợp thanh toán dịch vụ, phụ tùng trực tiếp qua App vô cùng tiện lợi.',
        icon: 'ph:credit-card-fill',
      },
    ];
  },
};
