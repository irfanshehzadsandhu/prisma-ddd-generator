---
to: App/Domain/Entities/<%- name%>/I<%= name%>Repository.ts
---
import <%- name%>Entity from "./<%- name%>Entity";

export const I<%- name%>RepositoryId = Symbol.for("I<%- name%>Repository")

export interface I<%- name%>Repository {
  add<%- name%>(<%- name.toLowerCase()%>: <%- name%>Entity): Promise<boolean>;

  fetchById(<%- name.toLowerCase()%>Id: string): Promise<<%- name%>Entity>;

  update(<%- name.toLowerCase()%>: <%- name%>Entity): Promise<boolean>;

  remove(<%- name.toLowerCase()%>Id: string): Promise<boolean>;
}