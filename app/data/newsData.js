export const newsData = [
  {
    id: 1,
    title: "KHAI TRƯƠNG YAMAHA TOWN THANH VƯƠNG PHÁT 8 TẠI TP. HỒ CHÍ MINH",
    slug: "khai-truong-yamaha-town-thanh-vuong-phat-8",
    category: "TIN TỨC SỰ KIỆN",
    date: "03.08.2025",
    image: "https://yamaha-motor.com.vn/wp/wp-content/uploads/2025/07/522738521_1082519664023136_5925928157789263882_n.jpeg",
    excerpt: "Yamaha tiếp tục tăng tốc, rộn ràng chào đón đại lý mới khai trương tại Thành phố Hồ Chí Minh với hàng ngàn ưu đãi hấp dẫn...",
    content: `
      <p>Chúng tôi tiếp tục tăng tốc, rộn ràng chào đón đại lý mới khai trương tại Thành phố Hồ Chí Minh với hàng ngàn ưu đãi hấp dẫn.</p>
      <p>Ngày 18/08/2025, Đại lý Yamaha Town Thanh Vương Phát 8 chính thức khai trương...</p>
    `,
    featured: false
  },
  {
    id: 2,
    title: "Ra mắt dòng xe thể thao mới với công nghệ đột phá",
    slug: "ra-mat-dong-xe-the-thao-moi",
    category: "SẢN PHẨM MỚI",
    date: "15.08.2025",
    image: "https://yamaha-motor.com.vn/wp/wp-content/uploads/2025/08/Thumb-Post-1.jpg",
    excerpt: "Chúng tôi tự hào giới thiệu mẫu xe thể thao mới, hứa hẹn mang đến trải nghiệm lái xe tuyệt vời nhất...",
    content: `
      <p>Chúng tôi tự hào giới thiệu mẫu xe thể thao mới...</p>
    `,
    featured: true
  },
  {
    id: 3,
    title: "Kết quả giải đua xe vô địch quốc gia 2025: Đội AnhEm Motor vô địch",
    slug: "ket-qua-giai-dua-xe-vo-dich-quoc-gia-2025",
    category: "THỂ THAO",
    date: "12.08.2025",
    image: "https://yamaha-motor.com.vn/wp/wp-content/uploads/2025/05/WTGP-slogan_01-1.png",
    excerpt: "Đội đua của chúng tôi đã xuất sắc giành vị trí dẫn đầu trong giải đấu năm nay...",
    content: `
      <p>Đội đua của chúng tôi đã xuất sắc giành vị trí dẫn đầu...</p>
    `,
    featured: true
  },
  {
    id: 4,
    title: "NEO's – Dòng xe điện dẫn đầu xu hướng di chuyển xanh tại Việt Nam",
    slug: "neos-dong-xe-dien-dan-dau-xu-huong",
    category: "XE ĐIỆN",
    date: "17.07.2025",
    image: "https://yamaha-motor.com.vn/wp/wp-content/uploads/2025/07/xe-dien-yamaha-neos.jpg",
    excerpt: "Khám phá mẫu xe điện tiên phong của Yamaha, kết hợp thiết kế thời thượng...",
    content: `
      <p>Khám phá mẫu xe điện tiên phong của Yamaha...</p>
    `,
    featured: true
  },
  {
    id: 5,
    title: "TOP XE TAY GA GIÁ RẺ, CHẤT LƯỢNG CAO NÊN MUA HIỆN NAY",
    slug: "top-xe-tay-ga-gia-re-chat-luong-cao",
    category: "REVIEW SẢN PHẨM",
    date: "10.08.2025",
    image: "https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/10/xe-tay-ga-gia-re-ua-chuong-nhat-1-768x384.jpg",
    excerpt: "Thị trường xe tay ga giá rẻ tại Việt Nam rất sôi động với sự góp mặt của nhiều thương hiệu...",
    content: `
      <p>Thị trường xe tay ga giá rẻ tại Việt Nam rất sôi động...</p>
    `,
    featured: false
  }
];

export const getFeaturedNews = () => newsData.filter(news => news.featured);
export const getAllNews = () => newsData;
export const getNewsById = (id) => newsData.find(news => news.id === parseInt(id));
export const getNewsBySlug = (slug) => newsData.find(news => news.slug === slug);