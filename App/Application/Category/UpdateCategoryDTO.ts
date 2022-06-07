import BaseDTO from "../Utils/BaseDTO";
import CategoryEntity from "../../Domain/Entities/Category/CategoryEntity";

class UpdateCategoryDTO extends BaseDTO {
  public category: CategoryEntity;

  constructor(request) {
    super(request);
    this.allowedRoles = []
    const params = request.body;
    params.categoryId = request.params.categoryId
    this.category = CategoryEntity.createFromInput(params)
  }
}

export default UpdateCategoryDTO;