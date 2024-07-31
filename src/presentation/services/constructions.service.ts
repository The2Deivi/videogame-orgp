import { Construction } from "../../data";
import { CustomError } from "../../domain";
import { CreateConstructionDTO } from "../../domain/dtos/constructions/create-contruction.dto";
import { PlayerService } from "./player.service";


export class ConstructionsService {

  constructor(
    private readonly playerService: PlayerService,
  ) { }


  async createConstruction(createConstructionDTO: CreateConstructionDTO) {

    const construction = new Construction();
    construction.name = createConstructionDTO.name;
    construction.type = createConstructionDTO.type;
    construction.level = createConstructionDTO.level;
    construction.location = createConstructionDTO.location;


    try {
      return await construction.save()
    } catch (error) {
      throw CustomError.internalServer("Something went wrong 😕")
    }
  }

  async findOneConstructionById(id: number) {
    const contruction = await Construction.findOne({
      where: {
        id
      },
      relations: ['players']
    })

    if (!contruction) throw CustomError.notFound("Construction not found 😭")

    return contruction;
  }
}