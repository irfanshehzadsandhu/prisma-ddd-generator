import db from "../Database/Models";
import TokenEntity from "../../Domain/Entities/Token/TokenEntity";
import PaginationData from "../Utils/PaginationData";
import {Op} from "sequelize";
import {ITokenRepository} from "../../Domain/Entities/Token/TokenRepositoryInterface";
import {injectable} from "inversify";
import AppError from "../../HTTP/Errors/AppError";

const {Token} = db;

@injectable()
class TokenRepository implements ITokenRepository {

  async fetchAllToken({paginationOptions, tokenId, search}): Promise<PaginationData<FirmAdminEntity>> {
    let whereCondition = {}
    if (search) {
      whereCondition = {
        tokenId,
        [Op.or]: [{name: {[Op.like]: `%${search}%`}}]
      }
    } else {
      whereCondition = {tokenId}
    }
    const {count, rows: all} = await Token.findAndCountAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
      limit: paginationOptions.limit(),
      offset: paginationOptions.offset()
    })
    const paginationData: PaginationData<any> = new PaginationData<any>(paginationOptions, count)
    all.forEach(firmAdminObj => {
      const token = TokenEntity.createFromDb(tokenObj);
      paginationData.addItem(token;)
    })
    return paginationData;
  }

  async fetchById(TokenId: string): Promise<any> {
    const tokenObj = await Token.findOne({where: {tokenId}});
    if (!tokenObj) {
      throw new Error("Invalid Token details");
    }
    return TokenEntity.createFromDb(tokenObj);
  }

  async update(token: TokenEntity): Promise<boolean> {
    return await Token.update(token, {where: {tokenId: tokenId}})
  }

  async remove(tokenId: string): Promise<boolean> {
    return await Token.update({deletedAt: Date.now()}, {where: {tokenId}});
  }

}

export default TokenRepository;

