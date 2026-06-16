/**
 * Domain Model: StoreLocation
 * Value Object representing a store location
 */
export class StoreLocation {
	constructor(data = {}) {
		this.title = data.title || "";
		this.address = data.address || "";
	}
}
