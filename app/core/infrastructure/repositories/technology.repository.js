import { newsData } from "../../domain/constants/news";

/**
 * Infrastructure Layer - Technology Repository
 */
export const technologyRepository = {
    async getConnectivityFeatures() {
        // Mocking API response for now
        return [
            {
                title: 'Dự báo bảo dưỡng thông minh',
                description: 'Không chỉ nhắc lịch, hệ thống phân tích dữ liệu thực tế để dự báo chính xác thời điểm cần thay thế linh kiện, giúp xe luôn trong trạng thái hoàn hảo.',
                icon: 'ph:cpu-fill'
            },
            {
                title: 'Nhật ký hành trình & Hành vi',
                description: 'Phân tích thói quen lái xe, quãng đường và mức tiêu thụ nhiên liệu để tối ưu hóa chi phí vận hành cho người dùng.',
                icon: 'ph:chart-line-up-fill'
            },
            {
                title: 'Cứu hộ khẩn cấp 24/7',
                description: 'Yên tâm tuyệt đối với mạng lưới cứu hộ phủ rộng toàn quốc. Chỉ với một chạm trên ứng dụng, đội ngũ kỹ thuật chuyên nghiệp sẽ có mặt hỗ trợ bạn mọi lúc, mọi nơi.',
                icon: 'ph:first-aid-kit-fill'
            }
        ];
    },

    async getEngineTechs() {
        return [
            { name: 'eSP+', detail: 'Thế hệ động cơ mới tăng công suất, giảm ma sát tối đa và siêu tiết kiệm nhiên liệu.' },
            { name: 'Blue Core', detail: 'Tối ưu hóa hiệu suất đốt cháy và làm mát, mang lại sự vận hành êm ái vượt trội.' },
            { name: 'PFI System', detail: 'Hệ thống phun xăng điện tử chính xác đến từng micro-giây, tối ưu hóa mọi giọt nhiên liệu.' }
        ];
    },

    async getSafetyFeatures() {
        return [
            {
                title: 'Phanh ABS vs CBS',
                description: 'ABS chống bó cứng phanh khi phanh gấp; CBS phân bổ lực phanh đều giữa hai bánh. Cả hai phối hợp bảo vệ bạn tối đa.',
                icon: 'ph:shield-check-fill'
            },
            {
                title: 'Kiểm soát lực kéo (HSTC)',
                description: 'Hệ thống kiểm soát mô-men xoắn giúp ngăn chặn tình trạng trượt bánh khi tăng tốc trên đường trơn trượt.',
                icon: 'ph:lightning-fill'
            },
            {
                title: 'Hỗ trợ đỗ xe (Parking Assist)',
                description: 'Cảm biến và hệ thống trợ lực giúp việc dừng đỗ xe trong không gian hẹp trở nên dễ dàng và an toàn hơn.',
                icon: 'ph:parking-fill'
            }
        ];
    },

    async getInteractionCards() {
        return [
            {
                title: 'Virtual Showroom 360°',
                description: 'Trải nghiệm không gian trưng bày ảo, xoay 360 độ để khám phá mọi chi tiết thiết kế tinh xảo của các dòng xe mới nhất.',
                image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=600',
                icon: 'ph:cube-fill'
            },
            {
                title: 'AI Health Monitor',
                description: 'Hệ thống AI sử dụng học máy để phân tích tiếng động cơ và dữ liệu cảm biến, đưa ra cảnh báo "sức khỏe" xe theo thời gian thực.',
                image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=600',
                icon: 'ph:heartbeat-fill'
            },
            {
                title: 'Chuyên gia ảo AI',
                description: 'Tư vấn kỹ thuật 24/7. Nhập tình trạng xe, AI sẽ chẩn đoán lỗi và gợi ý giải pháp khắc phục hoặc đặt lịch sửa chữa tức thì.',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600',
                icon: 'ph:robot-fill'
            },
            {
                title: 'Cộng đồng Rider Connect',
                description: 'Không gian kết nối những người đam mê xe, chia sẻ hành trình, kinh nghiệm bảo dưỡng và cùng nhau tổ chức những chuyến đi xa.',
                image: '/images/technology/rider_community.png',
                icon: 'ph:users-three-fill'
            }
        ];
    },

    async getManagementFeatures() {
        return [
            { title: 'Quản lý Đơn hàng & Kho xe', desc: 'Theo dõi tồn kho thực tế, quy trình xử lý đơn hàng tự động hóa hoàn toàn.', icon: 'ph:package-fill' },
            { title: 'Báo cáo Tài chính Tự động', desc: 'Hệ thống tự động tổng hợp doanh thu, chi phí và lợi nhuận theo thời gian thực.', icon: 'ph:chart-pie-slice-fill' },
            { title: 'CRM thông minh', desc: 'Quản lý và chăm sóc khách hàng dựa trên lịch sử mua sắm và thói quen sử dụng dịch vụ.', icon: 'ph:user-gear-fill' },
            { title: 'Thanh toán App Mobile', desc: 'Tích hợp thanh toán dịch vụ, phụ tùng trực tiếp qua App vô cùng tiện lợi.', icon: 'ph:credit-card-fill' }
        ];
    }
};
