import { GeneratorOptions } from '@prisma/generator-helper';
import { promises } from 'fs';
import { join } from 'path';
import { generateEntity } from '../generator/DomainEntityGenerator';

const { mkdir, writeFile } = promises;


export async function generate(options: GeneratorOptions) {

  try {
    await mkdir(`App/Domain`, { recursive: true });
    for (let model of options.dmmf.datamodel.models) {
      const entity = generateEntity(model);
      await writeFile(join(`App/Domain`, `${model.name}Entity.ts`), entity);
    }

  } catch (e) {
    console.error('Error: unable to write files for Prisma DBML Generator');
    throw e;
  }
}
