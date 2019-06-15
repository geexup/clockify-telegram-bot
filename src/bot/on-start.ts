import { Middleware, ContextMessageUpdate } from 'telegraf';
import { clearSession } from './utils';
import { I18nManager } from './i18n';
import { sendMenu } from './menu/send-menu';
import { mainMenuButtonSet } from './menu/buttons';

export const onStart: Middleware<ContextMessageUpdate> = async (ctx) => {
  const userName = ctx.from !== undefined ? ctx.from.first_name : '';
  clearSession(ctx);

  await I18nManager.replyWithMarkdown(ctx, 'LIFECYCLE_ON_START', { userName });
  await sendMenu(ctx, mainMenuButtonSet);
};
