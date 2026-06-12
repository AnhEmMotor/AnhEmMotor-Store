export const categoryMapper = {
	toUI(category) {
		return {
			id: category.id,
			name: category.name,
			description: category.description || "Khám phá các sản phẩm chất lượng cao tại AnhEm Motor.",
			image: category.imageUrl || "/assets/image/categories/default.webp",
			path: `/products?category_ids=${category.id}`,
			slug: category.slug
		};
	},

	toUIList(categories) {
		if (!categories) return [];
		return categories.map((c) => this.toUI(c));
	},
};
