const {getDMMF} = require('@prisma/sdk');
const {getSchemaPathAndPrint} = require('@prisma/migrate');
import render from "hygen/dist/render"
import * as path from "path";

const {Confirm} = require('enquirer');


const fs = require('fs').promises;
const fse = require('fs-extra');


const castDataType = {
  "Int": "number",
  "String": "string",
  "Bool": "Boolean",
  "DateTime": "Date"
}

const generateFiles = async (parameters: string[], name: string) => {
  const renderedFiles = await render({
    actionfolder: path.join(__dirname, '_templates', 'scaffold', 'actions'),
    parameters: parameters,
    name: name
  }, {});
  for (let renderedFile of renderedFiles) {
    const fileExists = await fse.pathExists(renderedFile.attributes.to);

    if (fileExists) {
      const prompt = new Confirm({
        name: 'question',
        message: `${renderedFile.attributes.to} already exists do you want to override?`
      });
      const questionResponse = await prompt.run();
      if (questionResponse) {
        await fse.outputFile(renderedFile.attributes.to, renderedFile.body);
      }
    } else {
      await fse.outputFile(renderedFile.attributes.to, renderedFile.body);
    }
  }
}

const generatePredefinedFiles = async (parameters: string[], name: string) => {
  const renderedFiles = await render({
    actionfolder: path.join(__dirname, '_templates', 'predefined', 'actions'),
    parameters: parameters,
    name: name
  }, {});
  for (let renderedFile of renderedFiles) {
    const fileExists = await fse.pathExists(renderedFile.attributes.to);

    if (fileExists) {
      const prompt = new Confirm({
        name: 'question',
        message: `${renderedFile.attributes.to} already exists do you want to override?`
      });
      const questionResponse = await prompt.run();
      if (questionResponse) {
        await fse.outputFile(renderedFile.attributes.to, renderedFile.body);
      }
    } else {
      await fse.outputFile(renderedFile.attributes.to, renderedFile.body);
    }
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
      }
    }
    await generateFiles(parameters, model.name);
  }
  await generatePredefinedFiles([], "");
}
runGenerator();
