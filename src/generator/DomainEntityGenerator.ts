import { DMMF } from '@prisma/generator-helper';
const ejs = require('ejs');
import {readFileSync} from "fs";

const castDataType = {
  "Int": "number",
  "String": "string",
  "Bool": "Boolean"
}


export function generateEntity(model: DMMF.Model): string {
  const fields = model.fields;
  const parameters = [];
  for (let field of fields) {
    if(Object.keys(castDataType).includes(field.type)){
      // @ts-ignore
      const type = castDataType[field.type];
      parameters.push(`${field.name}:${type}`);
    }
  }
  const entityContent = readFileSync(__dirname + '/templates/Domain/Entity.ejs', 'utf8');
  return ejs.render(entityContent, {name: model.name,parameters: parameters});
}




