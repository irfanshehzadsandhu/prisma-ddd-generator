import CategoryService from "../../../../../Application/Category/CategoryService";
import CreateCategoryDTO from "../../../../../Application/Category/CreateCategoryDTO";
import {injectable} from "inversify";
import FetchAllCategoryDTO from "../../../../../Application/Category/FetchAllCategoryDTO";
import UpdateCategoryDTO from "../../../../../Application/Category/UpdateCategoryDTO";
import FetchCategoryByIdDTO from "../../../../../Application/Category/FetchCategoryByIdDTO";

@injectable()
class CategoryController {

  constructor(private CategoryService: CategoryService) {
  }

  createCategory = async (request) => {
    const input = new CreateCategoryDTO(request);
    return await this.CategoryService.createCategory(input);
  }

  fetchAllCategory = async (request) => {
    const input = new FetchAllCategoryDTO(request);
    return await this.CategoryService.fetchAllCategory(input);
  }

  updateCategory = async (request) => {
    const input = new UpdateCategoryDTO(request);
    return await this.CategoryService.updateCategory(input)
}
  fetchCategoryById = async (request) => {
    const input = new FetchCategoryByIdDTO(request);
    return await this.CategoryService.fetchCategoryById(input);
  }

}

export default CategoryController