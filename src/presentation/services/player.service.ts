import { Player } from "../../data/postgres/models/player.model";
import { CustomError } from "../../domain";
import { CreatePlayerDTO } from "../../domain/dtos/player/create-player.dto";
import { UserService } from "./user.service";


export class PlayerService {

  constructor(
    private readonly userService: UserService,
  ) { }

  async createPlayer(createPlayerDTO: CreatePlayerDTO, userId: number) {
    const userPromise = this.userService.findOneUser(userId); //busca y verifica el usuario
    const playerPromise = this.findOnePlayerByName(createPlayerDTO.name); //verifica el jugador que no haya otro igual

    const [userData, _] = await Promise.all([userPromise, playerPromise]);

    const player = new Player();
    player.user = userData;
    player.name = createPlayerDTO.name.toLocaleLowerCase().trim();

    try {
      return await player.save();
    } catch (error) {
      throw CustomError.internalServer('Something went wrong 😭');
    }
  }

  async findOnePlayer(id: number) {
    const player = await Player.findOne({
      where: {
        id
      },
      relations: ['user', 'clanMembers'],
      select: {
        user: {
          id: true,
          username: true,
          email: true
        }
      }
    })

    if (!player) throw CustomError.notFound('Player not found 😭');

    return player;
  }

  async findOnePlayerByName(name: string) {
    const player = await Player.findOne({
      where: {
        name
      }
    })

    if (player) throw CustomError.badRequest('This name is already taken 😭');

    return player;
  }

}