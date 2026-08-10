export const categoryMapper = {
  toUI(category) {
    const slug = (category.slug || '').toLowerCase();
    let customImage = '/assets/image/categories/default.webp';
    let customDesc = 'Khám phá các sản phẩm chất lượng cao tại AnhEm Motor.';

    if (slug.includes('xe-may') || slug.includes('motor')) {
      customImage = '/assets/image/categories/xe.webp';
      customDesc = 'Các dòng xe máy chính hãng từ các thương hiệu hàng đầu.';
    } else if (slug.includes('phu-kien')) {
      customImage = '/assets/image/categories/accessories.webp';
      customDesc = 'Nâng cấp và làm đẹp xe với phụ kiện chính hãng.';
    } else if (slug.includes('phu-tung')) {
      customImage = '/assets/image/categories/spare-parts.webp';
      customDesc = 'Phụ tùng thay thế đảm bảo vận hành an toàn và bền bỉ.';
    }

    return {
      id: category.id,
      name: category.name,
      description: category.description || customDesc,
      image: category.imageUrl || customImage,
      path: `/products?category_ids=${category.id}`,
      slug: category.slug,
    };
  },

  toUIList(categories) {
    if (!categories) return [];
    return categories.map((c) => this.toUI(c));
  },
};
