import { readdirSync } from 'fs';
import { basename } from 'path';
import { IBotEnvironment } from '../environment.interface';

const presets: { [presetName: string]: IBotEnvironment } = {};
const fileNames = readdirSync(__dirname).filter(
  (item) =>
    item !== basename(__filename)
    && (item.includes('.ts') || item.includes('.js'))
);

for (const fileName of fileNames) {
  const presetObj = require(`./${fileName}`);
  Object.assign(presets, presetObj);
}

export default presets;
