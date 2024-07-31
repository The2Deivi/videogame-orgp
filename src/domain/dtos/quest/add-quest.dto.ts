




export class AddQuestPlayerDTO {

  private constructor(
    public readonly questId: number,
  ) { }

  static create(object: { [key: string]: any }): [string?, AddQuestPlayerDTO?] {
    const { questId } = object

    // Evaluar los datos
    if (!questId) return ['Missing questId ❗']

    return [undefined, new AddQuestPlayerDTO(questId)]
  }
}