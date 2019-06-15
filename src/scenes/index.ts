import { authScene } from './auth';
import { fillDayScene } from './fill-day';

interface TelegrafStage {
  register(scene: any): void;
}

export function registerScenes(stage: TelegrafStage) {
  stage.register(authScene);
  stage.register(fillDayScene);
}
