import { Middleware, ContextMessageUpdate } from 'telegraf';
import { isLogined } from '../utils/is-logined';
import { I18nManager } from '../i18n';

export const loginedMiddleware: Middleware<ContextMessageUpdate> = (ctx, next) => {
  if (isLogined(ctx)) return next ? next() : null;

  I18nManager.reply(ctx, 'MIDDLEWARE_LOGINED_DENIED');
};
