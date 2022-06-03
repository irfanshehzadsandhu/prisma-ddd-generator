import { generatorHandler } from '@prisma/generator-helper';

import { generate } from './ddd-generator';

generatorHandler({
  onManifest: () => ({
    defaultOutput: './dbml',
    prettyName: 'DBML Schema',
  }),
  onGenerate: generate,
});
