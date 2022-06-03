import { generatorHandler } from '@prisma/generator-helper';

import { generate } from './ddd-generator';

generatorHandler({
  onManifest: () => ({
    defaultOutput: '../App',
    prettyName: 'DDD',
  }),
  onGenerate: generate,
});
