const {getDMMF} = require('@prisma/sdk');
const {getSchemaPathAndPrint} = require('@prisma/migrate');
const fs = require('fs').promises;
const path = require('path');

const parameters = "firstName:string lastName:string";

const entitiesParams = {

}



const readSchema = async () => {
  schemaRelativePath = path.join(__dirname,"../../../prisma/schema.prisma");
  const schemaPath = await getSchemaPathAndPrint(schemaRelativePath);
  const schema = await fs.readFile(schemaPath,'utf-8');
  const localDmmf = await getDMMF({ datamodel: schema });

  for (let model of localDmmf.datamodel.models) {

    const fields = model.fields;

    for (let field of fields) {
      if(Object.keys(castDataType).includes(field.type)){
        const type = castDataType[field.type];
        //parameters.push(`${field.name}:${type}`);
        console.log("***************",`${field.name}:${type}`,model.name);
      }
    }
  }
}

//readSchema();


module.exports = {
  params: ({args}) => {
    console.log("##################",args);
    return {parameters: parameters, name: "Post"}
  }
}
