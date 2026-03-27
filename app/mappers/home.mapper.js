const homeMapper = {
	mapHeroStats(stats) {
		return stats.map((stat) => ({
			number: stat.number,
			label: stat.label,
		}));
	},

	mapBrands(brands) {
		return brands.map((brand) => ({
			img: brand.img,
			alt: brand.alt,
			text: brand.text,
		}));
	},
};

export default homeMapper;
