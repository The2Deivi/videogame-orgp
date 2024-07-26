

import { Request, Response } from "express"
import { CustomError, JoinMember } from "../../domain"
import { ClanService } from "../services/clan.service"


export class ClanController {

  constructor(
    private readonly clanService: ClanService,
  ) { }

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    console.log(error)
    return res.status(500).json({ message: 'Something went very wrong' })
  }

  addMemberClan = async (req: Request, res: Response) => {
    const { playerReceiverId } = req.params
    const [error, joinMemberDTO] = JoinMember.create(req.body)
    if (error) return res.status(422).json({ message: error })

    this.clanService.addMemberToClan(+playerReceiverId, joinMemberDTO!)
      .then(resp => res.status(200).json(resp))
      .catch(error => this.handleError(error, res))
  }
}