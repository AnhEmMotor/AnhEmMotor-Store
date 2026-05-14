export class Category {
	constructor(data = {}) {
		this.id = data.id || null;
		this.name = data.name || "";
		this.slug = data.slug || "";
		this.icon = data.icon || "";
	}
}
