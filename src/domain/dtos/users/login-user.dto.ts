
export class LoginUserDTO {
  private constructor(
    public readonly username: string | undefined,
    public readonly email: string | undefined,
    public readonly password: string
  ) { }

  static create(objetc: { [key: string]: any }): [string?, LoginUserDTO?] {
    const { email, password, username } = objetc;

    if (!username && !email) return ['Missing email or username']
    if (!password) return ['Missing password']

    return [undefined, new LoginUserDTO(username, email, password)];
  }
}