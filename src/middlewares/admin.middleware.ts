import { ContextMessageUpdate, Middleware } from 'telegraf';
import { I18nManager } from '../i18n';
import { isAdmin } from '../utils';

export const adminMiddleware: Middleware<ContextMessageUpdate> = (ctx, next) => {
  if (isAdmin(ctx)) return next ? next() : null;

  I18nManager.reply(ctx, 'MIDDLEWARE_ADMIN_DENIED');
};
