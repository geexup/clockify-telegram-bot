import { Markup } from 'telegraf';
import { MongoSessionContext } from 'telegraf-session-mongodb-fork';

import { I18nManager } from '../../../i18n';
import { getClockify } from '../../../utils/get-clockify';
import { getSession } from '../../../utils/session';
import { getProjects } from './get-projects';
import { IFillDayState } from './states';

export async function sendProjectsMenu(ctx: MongoSessionContext) {
  const user = await getClockify(ctx).user.get();
  const state: IFillDayState = getSession(ctx).state;
  const { previous, next, projects } = await getProjects(ctx, user.activeWorkspace, state.page);

  state.projects = projects;

  const navigationButtons = [];
  if (previous) navigationButtons.push('◀️ ' + I18nManager.getString(ctx, 'MENU_PREVIOUS'));
  if (next) navigationButtons.push('▶️ ' + I18nManager.getString(ctx, 'MENU_NEXT'));

  await ctx.saveSession();
  await ctx.reply(
    I18nManager.getString(ctx, 'SCENE_FILL_DAY_WELCOME'),
    Markup.keyboard([
      ...projects.map((item) => item.name),
      ...navigationButtons,
      '↩️ ' + I18nManager.getString(ctx, 'MENU_BACK')
    ], { columns: projects.length >= 2 ? 3 : 2 })
      // @ts-ignore
      .resize()
      .extra()
  );
}
