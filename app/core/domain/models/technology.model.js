export class TechFeature {
  constructor(data = {}) {
    this.title = data.title || '';
    this.description = data.description || '';
    this.icon = data.icon || 'lucide:cpu';
  }
}

export class EngineTech {
  constructor(data = {}) {
    this.name = data.name || '';
    this.detail = data.detail || '';
  }
}

export class InteractionCard {
  constructor(data = {}) {
    this.title = data.title || '';
    this.slug = data.slug || '';
    this.description = data.description || '';
    this.content = data.content || '';
    this.image = data.image || '';
    this.icon = data.icon || 'lucide:box';
  }
}

export class ManagementFeature {
  constructor(data = {}) {
    this.title = data.title || '';
    this.desc = data.desc || '';
    this.icon = data.icon || 'fa6-solid:circle-check';
  }
}
