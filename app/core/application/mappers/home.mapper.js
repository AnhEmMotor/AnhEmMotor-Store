

const homeMapper = {
	mapHeroStats(stats) {
		return stats.map((stat) => ({
			number: stat.number,
			label: stat.label,
		}));
	},

	mapBrands(brands) {
		return brands.map((brand) => ({
			id: brand.id,
			img: getImageUrl(brand.logoUrl),
			alt: brand.name,
			text: brand.description || "",
			name: brand.name,
			origin: brand.origin || "",
		}));
	},

	mapProducts(products) {
		return products.map((product) => ({
			id: product.id,
			name: product.name,
			slug: product.slug,
			price: product.price,
			originalPrice: product.originalPrice,
			discount: product.discount,
			image: getImageUrl(product.thumbnailUrl),
			brand: product.brandName,
			category: product.categoryName,
			inventoryStatus: product.inventoryStatus,
			rating: product.rating || 5,
			reviews: product.reviewsCount || 0,
		}));
	},

	mapBanners(banners) {
		return banners.map((banner) => ({
			id: banner.id,
			image: getImageUrl(banner.imageUrl),
			title: banner.title,
			description: banner.description,
			link: banner.linkUrl,
			type: banner.type,
		}));
	},
};

export default homeMapper;

