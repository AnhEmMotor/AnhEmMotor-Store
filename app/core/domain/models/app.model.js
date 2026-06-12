
export class AppFeature {
	constructor(data = {}) {
		this.icon = data.icon || "ph:sparkle-fill";
		this.title = data.title || "";
		this.description = data.description || "";
	}
}

export class AppStat {
	constructor(data = {}) {
		this.label = data.label || "";
		this.value = data.value || "";
		this.description = data.description || "";
	}
}

export class AppFaq {
	constructor(data = {}) {
		this.question = data.question || "";
		this.answer = data.answer || "";
	}
}

export class AppContent {
	constructor(data = {}) {
		this.title = data.title || "ANHEMMOTO APP";
		this.subtitle = data.subtitle || "";
		this.description = data.description || "";
		this.downloadLinks = {
			appStore: data.downloadLinks?.appStore || "#",
			googlePlay: data.downloadLinks?.googlePlay || "#"
		};
		this.stats = (data.stats || []).map(s => new AppStat(s));
		this.features = (data.features || []).map(f => new AppFeature(f));
		this.faqs = (data.faqs || []).map(faq => new AppFaq(faq));
	}
}
