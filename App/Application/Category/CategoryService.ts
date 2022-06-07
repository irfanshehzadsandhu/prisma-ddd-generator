import CreateCategoryDTO from "./CreateCategoryDTO";
import {ICategoryRepository, ICategoryRepositoryId} from "../../Domain/Entities/Category/CategoryRepositoryInterface";
import {inject, injectable} from "inversify";
import FetchAllCategoryDTO from "./FetchAllCategoryDTO";
import UpdateCategoryDTO from "./UpdateCategoryDTO";
import IResponseMessage from "../Utils/IResponseMessage";
import IResponseData from "../Utils/IResponseData";
import FetchCategoryByIdDTO from "./FetchCategoryByIdDTO";
import CategoryEntity from "../../Domain/Entities/Category/CategoryEntity";
import PaginationData from "../../Infrastructure/Utils/PaginationData";

@injectable()
class CategoryService {
  constructor(
    @inject(ICategoryRepositoryId) private categoryRepository: ICategoryRepository) {
  }

  async createCategory(createCategoryDTO: CreateCategoryDTO): Promise<IResponseMessage> {
    createCategoryDTO.hasAccess();
    const category: CategoryEntity = createCategoryDTO.category;
    await this.categoryRepository.addCategory(category);
    return {status: "success", message: "Category created successfully"}
  }

  async fetchAllCategory(fetchAllCategoryDTO: FetchAllCategoryDTO): Promise<IResponseData> {
    const {paginationOptions, search} = fetchAllCategoryDTO;
    fetchAllCategoryDTO.hasAccess();
    const response: PaginationData = await this.categoryRepository.fetchAllCategory({paginationOptions, search});
    return {status: "success", data: response.getPaginatedData()}
  }

  async updateCategory(updateCategoryDTO: UpdateCategoryDTO): Promise<IResponseMessage> {
    updateCategoryDTO.hasAccess();
    const category: CategoryEntity = updateCategoryDTO.category;
    await this.categoryRepository.update(category.toObject());
    return {status: "success", message: "Category updated successfully"}
  }

  async fetchCategoryById(fetchCategoryByIdDTO: FetchCategoryByIdDTO): Promise<any> {
    const {categoryId} = fetchCategoryByIdDTO;
    fetchCategoryByIdDTO.hasAccess();
    const response: CategoryEntity = await this.categoryRepository.fetchById(categoryId);
    return {status: "success", data: response}
  }
}

export default CategoryService


