



export class CreateQuestDTO {

  private constructor(
    // agregar las propiedaes a evaluar
    public readonly name: string,
    public readonly description: string,
    public readonly reward: string,
    public readonly exp: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, CreateQuestDTO?] {
    const { name, description, reward, exp } = object;

    // Evaluar los datos
    if (!name) return ['Name is required ❗'];
    if (!description) return ['Description is required ❗'];
    if (!reward) return ['Reward is required ❗'];
    if (!exp) return ['Exp is required ❗'];

    return [undefined, new CreateQuestDTO(name, description, reward, exp)];
  }
}