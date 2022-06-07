import BaseDTO from "../Utils/BaseDTO";

class FetchCategoryByIdDTO extends BaseDTO {
  public categoryId: string;

  constructor(request) {
    super(request);
    this.allowedRoles = []
    this.categoryId = request.params.categoryId
  }
}

export default FetchCategoryByIdDTO;