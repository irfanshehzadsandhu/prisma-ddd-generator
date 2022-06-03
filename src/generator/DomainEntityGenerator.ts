import { DMMF } from '@prisma/generator-helper';
let ejs = require('ejs');


export function generateEntity(model: DMMF.Model): string {
  let people = ['geddy', 'neil', 'alex'];
  return ejs.render('<%= people.join(", "); %>', {people: people});
}




