export class StoreLocation {
	constructor(data = {}) {
		this.title = data.title || "";
		this.address = data.address || "";
	}
}
