const layoutMapper = {
	mapNavItems(items) {
		return items.map((item) => ({
			name: item.name,
			path: item.path,
		}));
	},

	mapFooterData(data) {
		return {
			contact: {
				address: data.contact.address,
				phone: data.contact.phone,
				email: data.contact.email,
				socials: data.contact.socials.map((s) => ({
					name: s.name,
					icon: s.icon,
					url: s.url,
				})),
			},
			sections: data.sections.map((section) => ({
				title: section.title,
				links: section.links.map((link) => ({
					name: link.name,
					url: link.url,
				})),
			})),
		};
	},
};

export default layoutMapper;
