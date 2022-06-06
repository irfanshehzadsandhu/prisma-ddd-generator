---
to: App/Domain/<%- name%>/<%= name%>Entity.ts
---
<% let constructorParams = ""-%>
<% let methodParams = "" -%>
<%const parametersArray = parameters.split(' ')-%>
import BaseEntity from "./BaseEntity";
class <%- name%>Entity extends BaseEntity {
<%for(let i=0;i<parametersArray.length;i++){-%>
 <% if(parametersArray[i].includes(':')) { -%>
  <%- `public ${parametersArray[i].split(':')[0]}: ${parametersArray[i].split(':')[1]};` -%>
  <% constructorParams = constructorParams.concat(`${parametersArray[i].split(':')[0]}: ${parametersArray[i].split(':')[1]}`) -%>
  <% methodParams = methodParams.concat(`obj.${parametersArray[i].split(':')[0]}`) -%>
  <% if (i!==parametersArray.length-1) { -%>
   <% constructorParams=constructorParams.concat(', ') -%>
   <% methodParams=methodParams.concat(', ') -%>
  <% } -%> 
 <% } -%>
<%}-%>

   constructor(<%- constructorParams -%>) {
     super();   
 <%for(let i=0;i<parametersArray.length;i++){-%>
    <%- `this.${parametersArray[i].split(':')[0]} = ${parametersArray[i].split(':')[0]};` -%>   
 <% } -%>
  }

   static createFromInput(obj): <%- name%>Entity {
     const <%- name.toLowerCase() -%>  = new <%- name%>Entity(<%- methodParams -%>);
     return <%- name.toLowerCase() -%>; 
   }
   
   static createFromDb(obj): <%- name%>Entity {
     const <%- name.toLowerCase() -%>  = new <%- name%>Entity(<%- methodParams -%>);
     <%- name.toLowerCase() -%>.setDates(obj.createdAt, obj.updatedAt);
     return <%- name.toLowerCase() -%>; 
   }


}
export default <%- name%>Entity;