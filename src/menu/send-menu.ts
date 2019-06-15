import { ContextMessageUpdate, Markup } from 'telegraf';
import { buildButtons } from './build-buttons';
import { I18nManager } from '../i18n';
import { IMenuItem } from './interface';
import { mainMenuButtonSet } from './buttons';

export function sendMenu(ctx: ContextMessageUpdate, buttonSet: Array<IMenuItem>) {
  const keyboard = Markup
    .keyboard(buildButtons(ctx, buttonSet))
    // @ts-ignore
    .resize()
    .extra()

  ctx.replyWithMarkdown(I18nManager.getString(ctx, 'MENU_MAIN_TITLE_MD'), keyboard);
}

export function sendMainMenu(ctx: ContextMessageUpdate) {
  return sendMenu(ctx, mainMenuButtonSet);
}
