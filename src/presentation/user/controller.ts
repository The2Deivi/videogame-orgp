import { Request, Response } from "express";
import { LoginUserDTO } from "../../domain/dtos/users/login-user.dto";
import { CreateUserDTO } from "../../domain/dtos/users/create-user.dto";
import { CustomError } from "../../domain/errors/custom.errors";
import { UserService } from "../services/user.service";



export class UserController {

  constructor(
    private readonly userService: UserService
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: 'Something went very wrong! 😭' });
  }

  findOneUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.userService.findOneUser(+id)
      .then((user) => res.status(200).json(user))
      .catch(error => this.handleError(error, res));
  }

  login = async (req: Request, res: Response) => {
    const [error, loginUserDTO] = LoginUserDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.userService.login(loginUserDTO!)
      .then((user) => res.status(200).json(user))
      .catch(error => this.handleError(error, res));
  }

  register = async (req: Request, res: Response) => {
    const [error, createUserDTO] = CreateUserDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });
    this.userService.register(createUserDTO!)
      .then((user) => res.status(200).json(user))
      .catch(error => this.handleError(error, res));
  }
}