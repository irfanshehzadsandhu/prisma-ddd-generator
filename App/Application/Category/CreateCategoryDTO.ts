import BaseDTO from "../Utils/BaseDTO";
import CategoryEntity from "../../Domain/Entities/Category/CategoryEntity";

class CreateCategoryDTO extends BaseDTO {
  public categoryId: string;
  public category: CategoryEntity;
  
  constructor(request) {
    super(request);
    this.allowedRoles = []
    const params = request.body;
    params.categoryId = CategoryEntity.generateId();
    this.category = CategoryEntity.createFromInput(params);
  }

}

export default CreateCategoryDTO;