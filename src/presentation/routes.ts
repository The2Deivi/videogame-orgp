import { Router } from "express";
import { PlayerRoutes } from "./player/routes";
import { UserRoutes } from "./user/routes";
import { InventoryRoutes } from "./inventory/route";



export class AppRoutes {

  static get routes(): Router {
    const router = Router();

    router.use('/api/v1/player', PlayerRoutes.routes);
    router.use('/api/v1/user', UserRoutes.routes);
    router.use('/api/v1/inventory', InventoryRoutes.routes);

    return router;
  }
}