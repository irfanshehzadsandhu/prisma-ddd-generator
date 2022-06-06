---
to: App/HTTP/Controllers/Api/V1/<%= name%>/<%= name%>/<%= name%>.ts
---
import <%- name -%>Service from "../../../../../Application/<%- name -%>/<%- name -%>Service";
import Create<%- name -%>DTO from "../../../../../Application/<%- name -%>/Create<%- name -%>DTO";
import {injectable} from "inversify";
import FetchAll<%- name -%>DTO from "../../../../../Application/<%- name -%>/FetchAll<%- name -%>DTO";
import Update<%- name -%>DTO from "../../../../../Application/<%- name -%>/Update<%- name -%>DTO";
import Fetch<%- name -%>ByIdDTO from "../../../../../Application/<%- name -%>/Fetch<%- name -%>ByIdDTO";

@injectable()
class <%- name -%>Controller {

  constructor(private <%- name -%>Service: <%- name -%>Service) {
  }

  create<%- name -%> = async (request) => {
    const input = new Create<%- name -%>DTO(request);
    return await this.<%- name -%>Service.create<%- name -%>(input);
  }

  fetchAll<%- name -%> = async (request) => {
    const input = new FetchAll<%- name -%>DTO(request);
    return await this.<%- name -%>Service.fetchAll<%- name -%>(input);
  }

  update<%- name -%> = async (request) => {
    const input = new Update<%- name -%>DTO(request);
    return await this.<%- name -%>Service.update<%- name -%>(input)
}
  fetch<%- name -%>ById = async (request) => {
    const input = new Fetch<%- name -%>ByIdDTO(request);
    return await this.<%- name -%>Service.fetch<%- name -%>ById(input);
  }

}

export default <%- name -%>Controller