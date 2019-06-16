import { ContextMessageUpdate, Markup } from 'telegraf';
import { IMenuItem } from '../../menu/interface';
import { getSession } from '../../utils';
import { STATE_NAME } from './states';
import { sendMenu } from '../../menu/send-menu';
import { I18nManager } from '../../i18n';
import { clearState } from './clear-state';
import { reenterScene } from '../../utils/reenter-scene';
import { MongoSessionContext } from 'telegraf-session-mongodb-fork';

async function sendLanguageSelectMenu(ctx) {
  getSession(ctx).state.stateName = STATE_NAME.SELECT_LANGUAGE;
  const current = I18nManager.getLocale(ctx);
  const keyboard = Markup
    .keyboard(I18nManager.getAllLocales().map(item => ({
      text: `${item.flag} ${item.name}` + (item.key === current ? ' •' : '')
    })))
    // @ts-ignore
    .resize()
    .extra()

  await ctx.reply(I18nManager.getString(ctx, 'SCENE_SETTINGS_SELECT_LANGUAGE'), keyboard);
}

export const languageButton: IMenuItem = {
  key: '🇺🇸',
  text: (ctx) => {
    return I18nManager.getString(ctx, 'SCENE_SETTINGS_SELECT_LANGUAGE_BTN')
      + ` (${I18nManager.getString(ctx, 'LOCALE_NAME')})`
  },
  middlewares: [],
  callback: sendLanguageSelectMenu
};

export async function languageAction(ctx: MongoSessionContext) {
  await clearState(ctx as any);

  const messageText = ctx.message.text;
  const language = I18nManager.getAllLocales().find(locale => messageText.includes(locale.flag));

  if (!language) return await sendLanguageSelectMenu(ctx);

  I18nManager.setLocale(ctx, language.key);
  await ctx.saveSession();
  await I18nManager.reply(ctx, 'SCENE_SETTINGS_SELECT_LANGUAGE_SUCCESS');

  reenterScene(ctx);
}
