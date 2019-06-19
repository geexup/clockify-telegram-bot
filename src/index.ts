require('dotenv').config();

import { CURRENT_PRESET_ENV, EnvironmentManager } from './environment';

const DEFAULT_PRESET = 'dev';
if (!EnvironmentManager.currentName) {
  console.log(`[WARN] ${CURRENT_PRESET_ENV} is not set, using ${DEFAULT_PRESET}`);
  EnvironmentManager.setCurrent(DEFAULT_PRESET);
}

import { startBot } from './bot';
startBot();
