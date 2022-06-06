---
to: App/Infrastructure/MySQLRepository/<%= name%>Repository.ts
---
import db from "../Database/Models";
import <%- name -%>Entity from "../../Domain/Entities/<%- name -%>/<%- name -%>Entity";
import PaginationData from "../Utils/PaginationData";
import {Op} from "sequelize";
import {I<%- name -%>Repository} from "../../Domain/Entities/<%- name -%>/<%- name -%>RepositoryInterface";
import {injectable} from "inversify";
import AppError from "../../HTTP/Errors/AppError";

const {<%- name -%>} = db;

@injectable()
class <%- name -%>Repository implements I<%- name -%>Repository {

  async fetchAll<%- name -%>({paginationOptions, <%- name.toLowerCase() -%>Id, search}): Promise<PaginationData<FirmAdminEntity>> {
    let whereCondition = {}
    if (search) {
      whereCondition = {
        <%- name.toLowerCase() -%>Id,
        [Op.or]: [{name: {[Op.like]: `%${search}%`}}]
      }
    } else {
      whereCondition = {<%- name.toLowerCase() -%>Id}
    }
    const {count, rows: all} = await <%- name -%>.findAndCountAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
      limit: paginationOptions.limit(),
      offset: paginationOptions.offset()
    })
    const paginationData: PaginationData<any> = new PaginationData<any>(paginationOptions, count)
    all.forEach(firmAdminObj => {
      const <%- name.toLowerCase() -%> = <%- name -%>Entity.createFromDb(<%- name.toLowerCase() -%>Obj);
      paginationData.addItem(<%- name.toLowerCase() -%>;)
    })
    return paginationData;
  }

  async fetchById(<%- name -%>Id: string): Promise<any> {
    const <%- name.toLowerCase() -%>Obj = await <%- name -%>.findOne({where: {<%- name.toLowerCase() -%>Id}});
    if (!<%- name.toLowerCase() -%>Obj) {
      throw new Error("Invalid <%- name -%> details");
    }
    return <%- name -%>Entity.createFromDb(<%- name.toLowerCase() -%>Obj);
  }

  async update(<%- name.toLowerCase() -%>: <%- name -%>Entity): Promise<boolean> {
    return await <%- name -%>.update(<%- name.toLowerCase() -%>, {where: {<%- name.toLowerCase() -%>Id: <%- name.toLowerCase() -%>Id}})
  }

  async remove(<%- name.toLowerCase() -%>Id: string): Promise<boolean> {
    return await <%- name -%>.update({deletedAt: Date.now()}, {where: {<%- name.toLowerCase() -%>Id}});
  }

}

export default <%- name -%>Repository;

