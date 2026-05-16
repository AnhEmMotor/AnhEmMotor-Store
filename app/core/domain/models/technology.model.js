/**
 * Entity for Technology Feature
 */
export class TechFeature {
    constructor(data = {}) {
        this.title = data.title || "";
        this.description = data.description || "";
        this.icon = data.icon || "lucide:cpu";
    }
}

/**
 * Entity for Engine Technology
 */
export class EngineTech {
    constructor(data = {}) {
        this.name = data.name || "";
        this.detail = data.detail || "";
    }
}

/**
 * Entity for Interaction Card
 */
export class InteractionCard {
    constructor(data = {}) {
        this.title = data.title || "";
        this.description = data.description || "";
        this.image = data.image || "";
        this.icon = data.icon || "lucide:box";
    }
}

/**
 * Entity for Management Feature
 */
export class ManagementFeature {
    constructor(data = {}) {
        this.title = data.title || "";
        this.desc = data.desc || "";
        this.icon = data.icon || "fa6-solid:circle-check";
    }
}
