import { ContextMessageUpdate, Middleware } from 'telegraf';
import { I18nManager } from '../i18n';
import { isLogined } from '../utils/is-logined';

export const loginedMiddleware: Middleware<ContextMessageUpdate> = (ctx, next) => {
  if (isLogined(ctx)) return next ? next() : null;

  I18nManager.reply(ctx, 'MIDDLEWARE_LOGINED_DENIED');
};
