import { ContextMessageUpdate, Markup } from 'telegraf';
import { I18nManager } from '../i18n';
import { buildButtons } from './build-buttons';
import { mainMenuButtonSet } from './buttons';
import { IMenuItem } from './interface';

export function sendMenu(ctx: ContextMessageUpdate, buttonSet: Array<IMenuItem>) {
  const keyboard = Markup
    .keyboard(buildButtons(ctx, buttonSet))
    // @ts-ignore
    .resize()
    .extra();

  return ctx.replyWithMarkdown(I18nManager.getString(ctx, 'MENU_MAIN_TITLE_MD'), keyboard);
}

export function sendMainMenu(ctx: ContextMessageUpdate) {
  return sendMenu(ctx, mainMenuButtonSet);
}
