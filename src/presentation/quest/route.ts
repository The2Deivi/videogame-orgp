

import { Router } from "express";
import { QuestService } from "../services/quest.service";
import { QuestController } from "./controller";
import { PlayerService } from "../services/player.service";
import { UserService } from "../services/user.service";


export class QuestRoute {

  static get routes(): Router {
    const router = Router()

    const userService = new UserService()
    const playerService = new PlayerService(userService)
    const questService = new QuestService(playerService)
    const controller = new QuestController(questService)

    router.post('/', controller.createQuest)
    router.post('/:playerId/assing', controller.addQuestToPlayer)

    return router
  }
}