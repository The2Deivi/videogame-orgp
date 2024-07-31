import { Router } from "express";
import { PlayerRoutes } from "./player/routes";
import { UserRoutes } from "./user/routes";
import { InventoryRoutes } from "./inventory/route";
import { ClanRoute } from "./clan/route";
import { ResourceRoutes } from "./resource/route";
import { ConstructionRoute } from "./construction/route";
import { QuestRoute } from "./quest/route";



export class AppRoutes {

  static get routes(): Router {
    const router = Router();

    router.use('/api/v1/player', PlayerRoutes.routes);
    router.use('/api/v1/user', UserRoutes.routes);
    router.use('/api/v1/inventory', InventoryRoutes.routes);
    router.use('/api/v1/resource', ResourceRoutes.routes);
    router.use('/api/v1/construction', ConstructionRoute.routes);
    router.use('/api/v1/clan', ClanRoute.routes);
    router.use('/api/v1/quest', QuestRoute.routes);

    return router;
  }
}