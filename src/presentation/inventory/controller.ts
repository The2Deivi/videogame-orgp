import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { InventoryService } from "../services/inventory.service";
import { AddResourceToInventory } from "../../domain/dtos/inventory/add-resource-inventory.dto";



export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: 'Something went very wrong! 😭' });
  }

  addResourceToInventory = async (req: Request, res: Response) => {
    const { playerId } = req.params;
    const [error, addResourceToInventoryDTO] = AddResourceToInventory.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.inventoryService.addResourceToInventory(+playerId, addResourceToInventoryDTO!)
      .then((resp) => res.status(200).json(resp))
      .catch(error => this.handleError(error, res));
  }
}