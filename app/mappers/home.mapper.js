import { getImageUrl } from "~/utils/image";

const apiMediaPathPrefix = "/api/v1/mediafile/view-image/";

const normalizeBannerImagePath = (path) => {
	if (!path || typeof path !== "string" || !/^https?:\/\//i.test(path)) {
		return path;
	}
	try {
		const parsedUrl = new URL(path);
		if (parsedUrl.pathname.toLowerCase().startsWith(apiMediaPathPrefix)) {
			return `${parsedUrl.pathname}${parsedUrl.search}`;
		}
	} catch {
		return path;
	}
	return path;
};

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
			desktopImageUrl: getImageUrl(
				normalizeBannerImagePath(banner.desktopImageUrl),
			),
			mobileImageUrl: getImageUrl(
				normalizeBannerImagePath(
					banner.mobileImageUrl || banner.desktopImageUrl,
				),
			),
			title: banner.title,
			description: banner.description,
			ctaLink: banner.ctaLink,
			ctaLabel: banner.ctaLabel,
			placement: banner.placement,
		}));
	},
};

export default homeMapper;
