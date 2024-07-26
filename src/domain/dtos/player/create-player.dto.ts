

export class CreatePlayerDTO {
  private constructor(
    public readonly name: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, CreatePlayerDTO?] {

    const { name } = object;

    if (!name) return ['Name is required ❗'];

    return [undefined, new CreatePlayerDTO(name)];
  }
}