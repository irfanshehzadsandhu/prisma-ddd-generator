---
to: App/Infrastructure/Database/Models/<%= name%>.ts
---
<% const parametersArray = parameters.split(' ')-%>
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class <%- name-%> extends Model {
      static associate(models) {
            
      }
    }

    <%- name-%>.init(
      {
         <%for(let i=0;i<parametersArray.length;i++){-%>
<%- `${parametersArray[i].split(':')[0]}: DataTypes.${parametersArray[i].split(':')[1].toUpperCase()},`%>
         <% } -%>   
      },
      {
        sequelize,
        modelName: '<%- name-%>',
        timestamps: true,
        paranoid: true
      },
    );
    return <%- name-%>;
};


