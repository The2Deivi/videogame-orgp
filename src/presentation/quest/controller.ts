
import { Request, Response } from "express"
import { AddQuestPlayerDTO, CreateQuestDTO, CustomError } from "../../domain"
import { QuestService } from "../services/quest.service"


export class QuestController {

  constructor(
    private readonly questService: QuestService,
  ) { }

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    console.log(error)
    return res.status(500).json({ message: 'Something went very wrong' })
  }

  createQuest = async (req: Request, res: Response) => {
    const [error, createQuest] = CreateQuestDTO.create(req.body)
    if (error) return res.status(422).json({ message: error })

    this.questService.createQuest(createQuest!)
      .then((resp) => res.status(200).json({ resp, message: 'Quest created 🙌' }))
      .catch((error) => this.handleError(error, res))
  }

  addQuestToPlayer = async (req: Request, res: Response) => {
    const { playerId } = req.params
    const [error, addQuestToPlayer] = AddQuestPlayerDTO.create(req.body)
    if (error) return res.status(422).json({ message: error })

    this.questService.addQuestToPlayer(+playerId, addQuestToPlayer!)
      .then((resp) => res.status(200).json({ resp, message: 'Quest added to player ✅' }))
      .catch((error) => this.handleError(error, res))
  }
}