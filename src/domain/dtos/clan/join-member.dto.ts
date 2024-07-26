

export class JoinMember {

  private constructor(
    // agregar las propiedaes a evaluar
    public readonly senderMemberId: number,
  ) { }

  static create(object: { [key: string]: any }): [string?, JoinMember?] {
    const { senderMemberId } = object

    if (!senderMemberId) return ['senderMemberId is required']
    // Evaluar los datos

    return [undefined, new JoinMember(senderMemberId)]
  }
}