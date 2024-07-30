import { Resource } from "../../data";
import { CreateResourceDTO, CustomError } from "../../domain";



export class ResourceService {

  async createResource(createResourceDTO: CreateResourceDTO) {
    const resource = new Resource();
    resource.name = createResourceDTO.name;
    resource.description = createResourceDTO.description;

    try {
      return await resource.save()
    } catch (error) {
      throw CustomError.internalServer("Something went wrong")
    }
  }

  async findOneResourceById(id: number) {
    const resource = await Resource.findOne({
      where: {
        id: id
      }
    })

    if (!resource) throw CustomError.notFound('Resource not found 😭')

    return resource;
  }

  async getAllResources() {
    const resources = await Resource.find();

    return resources;
  }
}