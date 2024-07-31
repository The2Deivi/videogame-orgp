import { Request, Response } from "express";
import { CreateConstructionDTO, CustomError } from "../../domain";
import { ConstructionsService } from "../services/constructions.service";
import { PlayerService } from "../services/player.service";



export class ConstructionController {
  constructor(
    private readonly constructionService: ConstructionsService,
  ) { }

  private handleError = (error: any, res: any) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    console.log(error)
    return res.status(500).json({ message: 'Something went very wrong' })
  }

  createConstruction = async (req: Request, res: Response) => {
    const [error, createConstructionDTO] = CreateConstructionDTO.create(req.body)
    if (error) return res.status(422).json({ message: error })

    this.constructionService.createConstruction(createConstructionDTO!)
      .then(resp => res.status(200).json(resp))
      .catch(error => this.handleError(error, res))
  }

  findOneConstruction = async (req: Request, res: Response) => {
    const { id } = req.params

    this.constructionService.findOneConstructionById(+id)
      .then(resp => res.status(200).json(resp))
      .catch(error => this.handleError(error, res))
  }
}