import { ContextMessageUpdate } from 'telegraf';
import { registerMenu } from '../../menu';
import { backButton } from '../../menu/buttons';
import { IMenuItem } from '../../menu/interface';
import { sendMainMenu, sendMenu } from '../../menu/send-menu';
import { weekReport } from './reports/week';

const Scene = require('telegraf/scenes/base');
const buttons: Array<IMenuItem> = [
  {
    callback: weekReport,
    key: '7️⃣',
    middlewares: [],
    text: 'SCENE_REPORTS_MENU_WEEK'
  },
  backButton
];

export const reportScene = new Scene('report');
reportScene.enter((ctx: ContextMessageUpdate) => sendMenu(ctx, buttons));
reportScene.leave((ctx: ContextMessageUpdate) => sendMainMenu(ctx));
registerMenu(reportScene, buttons);
