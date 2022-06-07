import params from "hygen/dist/params"
import render from "hygen/dist/render"
import injectOp from "hygen/dist/ops/inject"
import * as path from "path";
import {promises} from 'fs';

const {writeFile} = promises;


const runParams = async () => {
  // const response =  await params(
  //   {templates: path.join(__dirname, '_templates')},
  //   ['scaffold', 'actions'],
  // )
  const renderedFiles = await render({
    actionfolder: path.join(__dirname, '_templates'),
    parameters: "firstName:string lastName:string",
    name: "Post"
  }, {});
  for (let renderedFile of renderedFiles) {
    console.log("&&&&&&&&&&&&&&", renderedFile)
    //await injectOp(renderedFile, {dry: false}, {cwd: path.join(__dirname, '_templates')});
    await writeFile(renderedFile.attributes.to, renderedFile.body)
  }


}
runParams();
