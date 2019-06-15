import handlebars from 'handlebars';
import { ContextMessageUpdate } from 'telegraf';
import { getSession } from '../utils';
import { I18n } from './interface';
import { TLocales, locals } from './locals';

const DEFAULT_LOCALE: TLocales = 'ru';

export class I18nManager {
  static getLocale(ctx: ContextMessageUpdate): TLocales {
    if (!getSession(ctx).locale) I18nManager.setLocale(ctx, DEFAULT_LOCALE);

    return getSession(ctx).locale as TLocales;
  }

  static setLocale(ctx: ContextMessageUpdate, locale: TLocales): TLocales {
    getSession(ctx).locale = locale;

    return locale;
  }

  static getContextString(ctx: ContextMessageUpdate, key: keyof I18n, context: any = {}) {
    const localeName = I18nManager.getLocale(ctx);
    const locale = locals[localeName];
    const templateText = locale[key];
    const template = handlebars.compile(templateText);

    return template(context);
  }

  static getString(ctx: ContextMessageUpdate, key: keyof I18n): string {
    const localeName = I18nManager.getLocale(ctx);
    const locale = locals[localeName];
    const result = locale[key];

    // Special sticker case, when string can be array (the result will be a random string from this array)
    if (Array.isArray(result)) return result[Math.floor(Math.random()* result.length)];
    return result;
  }

  static replyWithSticker(ctx: ContextMessageUpdate, key: keyof I18n) {
    const str = I18nManager.getString(ctx, key);
    return ctx.replyWithSticker(str);
  }

  static reply(ctx: ContextMessageUpdate, key: keyof I18n, context?: any) {
    const str = I18nManager.getContextString(ctx, key, context);
    return ctx.reply(str);
  }

  static replyWithMarkdown(ctx: ContextMessageUpdate, key: keyof I18n, context?: any) {
    const str = I18nManager.getContextString(ctx, key, context);
    return ctx.replyWithMarkdown(str, { parse_mode: 'Markdown' });
  }
}
