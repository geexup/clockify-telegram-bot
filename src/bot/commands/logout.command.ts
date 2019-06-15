import { Middleware, ContextMessageUpdate } from 'telegraf';
import { getSession } from '../utils';
import { loginedMiddleware } from '../middlewares';
import { I18nManager } from '../i18n';

export const logoutCmd: Array<Middleware<ContextMessageUpdate>> = [
  loginedMiddleware,
  async (ctx) => {
    getSession(ctx).clockifyKey = undefined;
    await I18nManager.replyWithSticker(ctx, 'CMD_LOGOUT_STICKER');
    await I18nManager.reply(ctx, 'CMD_LOGOUT');
  }
];
