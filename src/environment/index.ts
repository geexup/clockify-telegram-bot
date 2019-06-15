import presets from './presets';
import { IBotEnvironment } from './environment.interface';

export const CURRENT_PRESET_ENV = 'BOT_CURRENT_PRESET';

export class EnvironmentManager {
  static get current() {
    return EnvironmentManager.getCurrent();
  }

  static get currentName(): string {
    return process.env[CURRENT_PRESET_ENV];
  }

  static getByName(name: string): IBotEnvironment {
    const preset = (presets as any)[name];
    if (!preset) throw new Error('No such preset');

    return preset as IBotEnvironment;
  }

  static getCurrent(): IBotEnvironment {
    const name = EnvironmentManager.currentName;
    if (!name) throw new Error('Current preset not set');

    return EnvironmentManager.getByName(name);
  }

  static setCurrent(name: string): void {
    if (!(presets as any)[name]) throw new Error('No such preset');
    process.env[CURRENT_PRESET_ENV] = name;
  }
}
