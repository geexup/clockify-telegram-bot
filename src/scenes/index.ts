import { authScene } from './auth';
import { fillDayScene } from './fill-day';
import { settingsScene } from './settings';

interface ITelegrafStage {
  register(scene: any): void;
}

export function registerScenes(stage: ITelegrafStage) {
  stage.register(authScene);
  stage.register(fillDayScene);
  stage.register(settingsScene);
}
