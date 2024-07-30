import { Request, Response } from "express";
import { CreateResourceDTO, CustomError } from "../../domain";
import { ResourceService } from "../services/resource.service";



export class ResourceController {
  constructor(
    private readonly resourceService: ResourceService
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: 'Something went very wrong! 😭' });
  }

  createResource = async (req: Request, res: Response) => {
    const [error, createResourceDTO] = CreateResourceDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.resourceService.createResource(createResourceDTO!)
      .then((resource) => res.status(200).json(resource))
      .catch(error => this.handleError(error, res));
  }

  getAllResources = async (req: Request, res: Response) => {

    this.resourceService.getAllResources()
      .then((resp) => res.status(200).json(resp))
      .catch(error => this.handleError(error, res));
  }

  findOneResourceById = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.resourceService.findOneResourceById(+id)
      .then((resp) => res.status(200).json(resp))
      .catch(error => this.handleError(error, res));
  }
}