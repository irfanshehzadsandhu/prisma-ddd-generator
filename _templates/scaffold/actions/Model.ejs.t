---
to: App/Infrastructure/Database/Models/<%= name%>.ts
---
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class <%- name-%> extends Model {
      static associate(models) {
            
      }
    }

    <%- name-%>.init(
      {
         <%for(let i=0;i<parameters.length;i++){-%>
<%- `${parameters[i].split(':')[0]}: DataTypes.${parameters[i].split(':')[1].toUpperCase()},`%>
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


