import db from "../Database/Models";
import ProfileEntity from "../../Domain/Entities/Profile/ProfileEntity";
import PaginationData from "../Utils/PaginationData";
import {Op} from "sequelize";
import {IProfileRepository} from "../../Domain/Entities/Profile/ProfileRepositoryInterface";
import {injectable} from "inversify";
import AppError from "../../HTTP/Errors/AppError";

const {Profile} = db;

@injectable()
class ProfileRepository implements IProfileRepository {

  async fetchAllProfile({paginationOptions, profileId, search}): Promise<PaginationData<FirmAdminEntity>> {
    let whereCondition = {}
    if (search) {
      whereCondition = {
        profileId,
        [Op.or]: [{name: {[Op.like]: `%${search}%`}}]
      }
    } else {
      whereCondition = {profileId}
    }
    const {count, rows: all} = await Profile.findAndCountAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
      limit: paginationOptions.limit(),
      offset: paginationOptions.offset()
    })
    const paginationData: PaginationData<any> = new PaginationData<any>(paginationOptions, count)
    all.forEach(firmAdminObj => {
      const profile = ProfileEntity.createFromDb(profileObj);
      paginationData.addItem(profile;)
    })
    return paginationData;
  }

  async fetchById(ProfileId: string): Promise<any> {
    const profileObj = await Profile.findOne({where: {profileId}});
    if (!profileObj) {
      throw new Error("Invalid Profile details");
    }
    return ProfileEntity.createFromDb(profileObj);
  }

  async update(profile: ProfileEntity): Promise<boolean> {
    return await Profile.update(profile, {where: {profileId: profileId}})
  }

  async remove(profileId: string): Promise<boolean> {
    return await Profile.update({deletedAt: Date.now()}, {where: {profileId}});
  }

}

export default ProfileRepository;

