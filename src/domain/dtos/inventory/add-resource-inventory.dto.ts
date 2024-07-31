

export class AddResourceToInventory {
  constructor(
    public readonly resourceId: number,
    public readonly quantity: number,
  ) { }

  static create(object: { [key: string]: any }): [string?, AddResourceToInventory?] {
    const { resourceId, quantity } = object;
    if (!resourceId) return ['Missing resourceId']
    if (!quantity) return ['Missing quantity']
    return [undefined, new AddResourceToInventory(resourceId, quantity)];
  }
}