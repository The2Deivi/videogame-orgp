

import { Router } from "express";
import { ConstructionController } from "./controller";
import { PlayerService } from "../services/player.service";
import { UserService } from "../services/user.service";
import { ConstructionsService } from "../services/constructions.service";


export class ConstructionRoute {

  static get routes(): Router {
    const router = Router()

    const userService = new UserService()
    const playerService = new PlayerService(userService)
    const constructionService = new ConstructionsService(playerService)
    const constructionController = new ConstructionController(constructionService)

    router.post('/', constructionController.createConstruction)
    router.get('/:id', constructionController.findOneConstruction)

    return router
  }
}