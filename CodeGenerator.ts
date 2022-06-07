const {getDMMF} = require('@prisma/sdk');
const {getSchemaPathAndPrint} = require('@prisma/migrate');
import render from "hygen/dist/render"
import * as path from "path";

const fs = require('fs').promises;
const fse = require('fs-extra');

const castDataType = {
  "Int": "number",
  "String": "string",
  "Bool": "Boolean",
  "DateTime": "Date"
}

const generateFile = async (parameters: string[], name: string) => {
  const renderedFiles = await render({
    actionfolder: path.join(__dirname, '_templates'),
    parameters: parameters,
    name: name
  }, {});
  for (let renderedFile of renderedFiles) {
    await fse.outputFile(renderedFile.attributes.to, renderedFile.body);
  }
}

const runGenerator = async () => {

  let schemaRelativePath = path.join(__dirname, "prisma/schema.prisma");
  const schemaPath = await getSchemaPathAndPrint(schemaRelativePath);
  const schema = await fs.readFile(schemaPath, 'utf-8');
  const localDmmf = await getDMMF({datamodel: schema});

  for (let model of localDmmf.datamodel.models) {
    let parameters = []
    const fields = model.fields;

    for (let field of fields) {
      if (Object.keys(castDataType).includes(field.type)) {
        // @ts-ignore
        const type = castDataType[field.type];
        parameters.push(`${field.name}:${type}`);
        console.log("***************", `${field.name}:${type}`, model.name);
        generateFile(parameters, model.name);
      }
    }
  }


}
runGenerator();
