

export class CreateResourceDTO {
  constructor(
    public readonly name: string,
    public readonly description: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, CreateResourceDTO?] {

    const { name, description } = object;

    if (!name) return ['Missing name']
    if (!description) return ['Missing description']

    return [undefined, new CreateResourceDTO(name, description)];
  }
}