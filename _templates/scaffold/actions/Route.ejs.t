---
to: App/HTTP/Routes/Api/V1/<%= name%>/<%= name%>.ts
---
import * as express from "express";
import {WithErrorHandling} from "../../../../Errors/WithErrorHandling";
import <%- name -%>Controller from "../../../../Controllers/Api/V1/<%- name -%>/<%- name -%>";
import container from "../../../../../Infrastructure/IocContainer/container";
import auth from "../../../../Middleware/auth";
import server from "../../../../../Infrastructure/Config/server";


const <%- name.toLowerCase() -%>Controller = container.get(<%- name -%>Controller);
const router = express.Router({mergeParams: true});

router.post("/<%- name.toLowerCase() -%>", auth, WithErrorHandling(<%- name.toLowerCase() -%>Controller.create<%- name -%>))
router.get(`/<%- name.toLowerCase() -%>/all`, auth, WithErrorHandling(<%- name.toLowerCase() -%>Controller.fetchAll<%- name -%>))
router.put("/<%- name.toLowerCase() -%>/:<%- name.toLowerCase() -%>Id", auth, WithErrorHandling(<%- name.toLowerCase() -%>Controller.update<%- name -%>))
router.get("/<%- name.toLowerCase() -%>/:<%- name.toLowerCase() -%>Id", auth, WithErrorHandling(<%- name.toLowerCase() -%>Controller.fetch<%- name -%>ById))


export default router;