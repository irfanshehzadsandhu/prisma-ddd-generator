import { DMMF } from '@prisma/generator-helper';
const ejs = require('ejs');
import {readFileSync} from "fs";


export function generateEntity(model: DMMF.Model): string {
  const entityContent = readFileSync(__dirname + '/templates/Domain/Entity.ejs', 'utf8');
  return ejs.render(entityContent, {name: model.name});
}




