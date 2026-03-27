export const categoryMapper = {
	toUI(category) {
		return {
			href: `/products?${category.query}`,
			imgSrc: category.image,
			alt: category.name,
			title: category.name,
		};
	},

	toUIList(categories) {
		return categories.map((c) => this.toUI(c));
	},
};
