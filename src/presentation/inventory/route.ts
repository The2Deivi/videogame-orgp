import { Router } from 'express';
import { InventoryService } from '../services/inventory.service';
import { InventoryController } from './controller';
import { ResourceService } from '../services/resource.service';
import { ItemService } from '../services/item.service';


export class InventoryRoutes {

  static get routes(): Router {
    const router = Router();

    const resourceService = new ResourceService();
    const itemService = new ItemService();
    const inventoryService = new InventoryService(itemService, resourceService);
    const inventoryController = new InventoryController(inventoryService);

    router.post('/:playerId/resources', inventoryController.addResourceToInventory);

    return router;
  }

}