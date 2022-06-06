---
to: App/Application/<%= name%>/<%= name%>Service.ts
---
import Create<%- name -%>DTO from "./Create<%- name -%>DTO";
import {I<%- name -%>Repository, I<%- name -%>RepositoryId} from "../../Domain/Entities/<%- name -%>/<%- name -%>RepositoryInterface";
import {inject, injectable} from "inversify";
import FetchAll<%- name -%>DTO from "./FetchAll<%- name -%>DTO";
import Update<%- name -%>DTO from "./Update<%- name -%>DTO";
import IResponseMessage from "../Utils/IResponseMessage";
import IResponseData from "../Utils/IResponseData";
import Fetch<%- name -%>ByIdDTO from "./Fetch<%- name -%>ByIdDTO";
import <%- name -%>Entity from "../../Domain/Entities/<%- name -%>/<%- name -%>Entity";
import PaginationData from "../../Infrastructure/Utils/PaginationData";

@injectable()
class <%- name -%>Service {
  constructor(
    @inject(I<%- name -%>RepositoryId) private <%- name.toLowerCase() -%>Repository: I<%- name -%>Repository) {
  }

  async create<%- name -%>(create<%- name -%>DTO: Create<%- name -%>DTO): Promise<IResponseMessage> {
    create<%- name -%>DTO.hasAccess();
    const <%- name.toLowerCase() -%>: <%- name -%>Entity = create<%- name -%>DTO.<%- name.toLowerCase() -%>;
    await this.<%- name.toLowerCase() -%>Repository.add<%- name -%>(<%- name.toLowerCase() -%>);
    return {status: "success", message: "<%- name -%> created successfully"}
  }

  async fetchAll<%- name -%>(fetchAll<%- name -%>DTO: FetchAll<%- name -%>DTO): Promise<IResponseData> {
    const {paginationOptions, search} = fetchAll<%- name -%>DTO;
    fetchAll<%- name -%>DTO.hasAccess();
    const response: PaginationData = await this.<%- name.toLowerCase() -%>Repository.fetchAll<%- name -%>({paginationOptions, search});
    return {status: "success", data: response.getPaginatedData()}
  }

  async update<%- name -%>(update<%- name -%>DTO: Update<%- name -%>DTO): Promise<IResponseMessage> {
    update<%- name -%>DTO.hasAccess();
    const <%- name.toLowerCase() -%>: <%- name -%>Entity = update<%- name -%>DTO.<%- name.toLowerCase() -%>;
    await this.<%- name.toLowerCase() -%>Repository.update(<%- name.toLowerCase() -%>.toObject());
    return {status: "success", message: "<%- name -%> updated successfully"}
  }

  async fetch<%- name -%>ById(fetch<%- name -%>ByIdDTO: Fetch<%- name -%>ByIdDTO): Promise<any> {
    const {<%- name.toLowerCase() -%>Id} = fetch<%- name -%>ByIdDTO;
    fetch<%- name -%>ByIdDTO.hasAccess();
    const response: <%- name -%>Entity = await this.<%- name.toLowerCase() -%>Repository.fetchById(<%- name.toLowerCase() -%>Id);
    return {status: "success", data: response}
  }
}

export default <%- name -%>Service


