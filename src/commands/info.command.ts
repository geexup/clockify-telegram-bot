import { ContextMessageUpdate, Middleware } from 'telegraf';
import { I18nManager } from '../i18n';
import { loginedMiddleware } from '../middlewares';
import { getClockify } from '../utils/get-clockify';

export const infoCmd: Array<Middleware<ContextMessageUpdate>> = [
  loginedMiddleware,
  async (ctx) => {
    await ctx.replyWithChatAction('typing');

    let activeWorkspaceName = '';
    const clockify = getClockify(ctx);
    const user = await clockify.user.get();

    if (user.activeWorkspace) {
      const workspaces = await clockify.workspaces.get();
      const active = workspaces.find((item) => item.id === user.activeWorkspace);
      if (active) activeWorkspaceName = active.name;
    }

    await I18nManager.replyWithMarkdown(ctx, 'CMD_INFO_TEXT', {
      activeWorkspaceName,
      user
    });
  }
];
