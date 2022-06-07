import db from "../Database/Models";
import CategoryEntity from "../../Domain/Entities/Category/CategoryEntity";
import PaginationData from "../Utils/PaginationData";
import {Op} from "sequelize";
import {ICategoryRepository} from "../../Domain/Entities/Category/CategoryRepositoryInterface";
import {injectable} from "inversify";
import AppError from "../../HTTP/Errors/AppError";

const {Category} = db;

@injectable()
class CategoryRepository implements ICategoryRepository {

  async fetchAllCategory({paginationOptions, categoryId, search}): Promise<PaginationData<FirmAdminEntity>> {
    let whereCondition = {}
    if (search) {
      whereCondition = {
        categoryId,
        [Op.or]: [{name: {[Op.like]: `%${search}%`}}]
      }
    } else {
      whereCondition = {categoryId}
    }
    const {count, rows: all} = await Category.findAndCountAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
      limit: paginationOptions.limit(),
      offset: paginationOptions.offset()
    })
    const paginationData: PaginationData<any> = new PaginationData<any>(paginationOptions, count)
    all.forEach(firmAdminObj => {
      const category = CategoryEntity.createFromDb(categoryObj);
      paginationData.addItem(category;)
    })
    return paginationData;
  }

  async fetchById(CategoryId: string): Promise<any> {
    const categoryObj = await Category.findOne({where: {categoryId}});
    if (!categoryObj) {
      throw new Error("Invalid Category details");
    }
    return CategoryEntity.createFromDb(categoryObj);
  }

  async update(category: CategoryEntity): Promise<boolean> {
    return await Category.update(category, {where: {categoryId: categoryId}})
  }

  async remove(categoryId: string): Promise<boolean> {
    return await Category.update({deletedAt: Date.now()}, {where: {categoryId}});
  }

}

export default CategoryRepository;

