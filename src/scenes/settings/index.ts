import { ContextMessageUpdate } from 'telegraf';
import { sendMainMenu, sendMenu } from '../../menu/send-menu';
import { IMenuItem } from '../../menu/interface';
import { registerMenu } from '../../menu';
import { selectActionMiddleware } from './states';
import { languageButton } from './language';
import { clearState } from './clear-state';
import { blockLeaveMiddleware } from '../../utils/block-leave';

const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const settingsButtons: Array<IMenuItem> = [
  languageButton,
  {
    key: '↩️',
    text: 'MENU_BACK',
    middlewares: [],
    callback(ctx) { Stage.leave()(ctx); }
  }
];

export const settingsScene = new Scene('settings');

settingsScene.enter(async (ctx: ContextMessageUpdate) => {
  await clearState(ctx as any);
  await sendMenu(ctx, settingsButtons);
});

settingsScene.leave(blockLeaveMiddleware, sendMainMenu);
settingsScene.hears(/↩️/i, Stage.leave());
settingsScene.use(selectActionMiddleware);
registerMenu(settingsScene, settingsButtons);
