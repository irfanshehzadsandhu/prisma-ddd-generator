import db from "../Database/Models";
import UserEntity from "../../Domain/Entities/User/UserEntity";
import PaginationData from "../Utils/PaginationData";
import {Op} from "sequelize";
import {IUserRepository} from "../../Domain/Entities/User/UserRepositoryInterface";
import {injectable} from "inversify";
import AppError from "../../HTTP/Errors/AppError";

const {User} = db;

@injectable()
class UserRepository implements IUserRepository {

  async fetchAllUser({paginationOptions, userId, search}): Promise<PaginationData<FirmAdminEntity>> {
    let whereCondition = {}
    if (search) {
      whereCondition = {
        userId,
        [Op.or]: [{name: {[Op.like]: `%${search}%`}}]
      }
    } else {
      whereCondition = {userId}
    }
    const {count, rows: all} = await User.findAndCountAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
      limit: paginationOptions.limit(),
      offset: paginationOptions.offset()
    })
    const paginationData: PaginationData<any> = new PaginationData<any>(paginationOptions, count)
    all.forEach(firmAdminObj => {
      const user = UserEntity.createFromDb(userObj);
      paginationData.addItem(user;)
    })
    return paginationData;
  }

  async fetchById(UserId: string): Promise<any> {
    const userObj = await User.findOne({where: {userId}});
    if (!userObj) {
      throw new Error("Invalid User details");
    }
    return UserEntity.createFromDb(userObj);
  }

  async update(user: UserEntity): Promise<boolean> {
    return await User.update(user, {where: {userId: userId}})
  }

  async remove(userId: string): Promise<boolean> {
    return await User.update({deletedAt: Date.now()}, {where: {userId}});
  }

}

export default UserRepository;

