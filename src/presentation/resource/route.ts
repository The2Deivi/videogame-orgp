import { Router } from "express";
import { ResourceService } from "../services/resource.service";
import { ResourceController } from "./controller";



export class ResourceRoutes {

  static get routes(): Router {
    const router = Router();

    const resourceService = new ResourceService();
    const resourceController = new ResourceController(resourceService);

    router.post('/', resourceController.createResource);
    router.get('/', resourceController.getAllResources);
    router.get('/:id', resourceController.findOneResourceById);


    return router;
  }
}