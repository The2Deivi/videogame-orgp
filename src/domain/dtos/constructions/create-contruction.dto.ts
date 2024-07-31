



export class CreateConstructionDTO {

  private constructor(
    // agregar las propiedaes a evaluar
    public readonly name: string,
    public readonly type: string,
    public readonly level: number,
    public readonly location: string
  ) { }

  static create(object: { [key: string]: any }): [string?, CreateConstructionDTO?] {
    const { name, type, level, location } = object;

    // Evaluar los datos
    if (!name) return ['Name is required ❗']
    if (!type) return ['Type is required ❗']
    if (!level) return ['Level is required ❗']
    if (!location) return ['Location is required ❗']

    return [undefined, new CreateConstructionDTO(name, type, level, location)]
  }
}