export const layoutRepository = {
  async getNavItems() {
    return [
      { name: 'Trang Chủ', path: '/' },
      { name: 'Sản Phẩm', path: '/products' },
      { name: 'Giới Thiệu', path: '/about' },
      { name: 'Tin Tức', path: '/news' },
      { name: 'Khuyến Mãi', path: '/promotion' },
      { name: 'Liên Hệ', path: '/support' },
      { name: 'Dịch Vụ', path: '/service' },
    ];
  },

  async getFooterData() {
    return {
      contact: {
        address: '193 Đỗ Văn Thi, Phường Trấn Biên, TP. Biên Hoà, Tỉnh Đồng Nai',
        phone: '0901.234.567',
        email: 'anhemmotor@gmail.com',
        socials: [
          { name: 'facebook', icon: 'fa6-brands:facebook-f', url: 'https://www.facebook.com' },
          { name: 'youtube', icon: 'fa6-brands:youtube', url: 'https://www.youtube.com' },
          { name: 'instagram', icon: 'fa6-brands:instagram', url: 'https://www.instagram.com' },
          { name: 'tiktok', icon: 'fa6-brands:tiktok', url: 'https://www.tiktok.com' },
        ],
      },
      sections: [
        {
          title: 'Sản Phẩm',
          links: [
            { name: 'Xe máy Honda', url: '/products?category_ids=8' },
            { name: 'Xe máy Yamaha', url: '/products?category_ids=8' },
            { name: 'Xe máy Suzuki', url: '/products?category_ids=8' },
            { name: 'Xe máy Kawasaki', url: '/products?category_ids=8' },
            { name: 'Phụ kiện xe máy', url: '/products?category_ids=12,13&page=1' },
          ],
        },
        {
          title: 'Dịch Vụ',
          links: [
            { name: 'Bảo dưỡng định kỳ', url: '/service' },
            { name: 'Sửa chữa xe máy', url: '/service' },
            { name: 'Đăng ký xe', url: '/support' },
            { name: 'Bảo hiểm xe máy', url: '/support' },
            { name: 'Tư vấn mua xe', url: '/support' },
          ],
        },
        {
          title: 'Hỗ Trợ',
          links: [
            { name: 'Chính sách bảo mật', url: '/privacy' },
            { name: 'Điều khoản dịch vụ', url: '/terms' },
            { name: 'Yêu cầu xóa dữ liệu', url: '/privacy#data-deletion' },
          ],
        },
      ],
    };
  },
};
