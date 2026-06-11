
export class AboutContent {
	constructor(data = {}) {
		this.mission = {
			title: data.mission?.title || "",
			description: data.mission?.description || "",
		};
		this.services = {
			title: data.services?.title || "",
			items: (data.services?.items || []).map(item => ({
				label: item.label || "",
				desc: item.desc || "",
			})),
		};
		this.commitment = {
			title: data.commitment?.title || "",
			list: data.commitment?.list || [],
		};
		this.whyChooseUs = {
			title: data.whyChooseUs?.title || "",
			items: (data.whyChooseUs?.items || []).map(item => ({
				text: item.text || "",
				isStrong: !!item.isStrong,
			})),
		};
		this.contact = {
			title: data.contact?.title || "",
			description: data.contact?.description || "",
			hotline: data.contact?.hotline || "",
			email: data.contact?.email || "",
		};
		this.video = {
			title: data.video?.title || "",
			subtitle: data.video?.subtitle || "",
			url: data.video?.url || "",
		};
	}
}

/**
 * Entity for Store Location
 */
export class StoreLocation {
	constructor(data = {}) {
		this.title = data.title || "";
		this.address = data.address || "";
	}
}
