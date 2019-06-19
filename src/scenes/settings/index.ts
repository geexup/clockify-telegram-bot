import { ContextMessageUpdate } from 'telegraf';
import { MongoSessionContext } from 'telegraf-session-mongodb-fork';
import { registerMenu } from '../../menu';
import { backButton } from '../../menu/buttons';
import { IMenuItem } from '../../menu/interface';
import { sendMainMenu, sendMenu } from '../../menu/send-menu';
import { blockLeaveMiddleware } from '../../utils/block-leave';
import { leaveScene } from '../../utils/leave-scene';
import { clearState } from './clear-state';
import { languageButton } from './language';
import { selectActionMiddleware } from './states';

const Scene = require('telegraf/scenes/base');

const settingsButtons: Array<IMenuItem> = [
  languageButton,
  backButton
];

export const settingsScene = new Scene('settings');

settingsScene.enter(async (ctx: ContextMessageUpdate) => {
  await clearState(ctx as any);
  await sendMenu(ctx, settingsButtons);
});

settingsScene.leave(blockLeaveMiddleware, sendMainMenu);
settingsScene.hears(/↩️/i, leaveScene);
settingsScene.use(selectActionMiddleware);
registerMenu(settingsScene, settingsButtons);
