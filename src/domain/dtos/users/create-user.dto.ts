

export class CreateUserDTO {
  private constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
  ) { }

  static create(objetc: { [key: string]: any }): [string?, CreateUserDTO?] {
    const { email, password, username } = objetc;

    if (!username) return ['Missing username']
    if (!email) return ['Missing email']
    if (!password) return ['Missing password']

    return [undefined, new CreateUserDTO(username, email, password)];
  }
}