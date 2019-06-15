import { Middleware, ContextMessageUpdate } from 'telegraf';
import { isAdmin } from '../utils';
import { I18nManager } from '../i18n';

export const adminMiddleware: Middleware<ContextMessageUpdate> = (ctx, next) => {
  if (isAdmin(ctx)) return next ? next() : null;

  I18nManager.reply(ctx, 'MIDDLEWARE_ADMIN_DENIED');
};
