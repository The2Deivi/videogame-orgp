
import { Router } from "express";
import { ClanController } from "./controller";
import { ClanService } from "../services/clan.service";
import { PlayerService } from "../services/player.service";
import { UserService } from "../services/user.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class ClanRoute {

  static get routes(): Router {
    const router = Router()

    const userService = new UserService()
    const playerService = new PlayerService(userService)
    const clanService = new ClanService(playerService)
    const clanController = new ClanController(clanService)

    router.post('/', clanController.createClan)
    router.post('/:playerReceiverId/join', AuthMiddleware.protect, clanController.addMemberClan)

    return router
  }
}