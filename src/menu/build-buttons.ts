import { ContextMessageUpdate, Buttons } from 'telegraf';
import { IMenuItem } from './interface';
import { I18nManager } from '../i18n';

export function buildButtons(ctx: ContextMessageUpdate, items: Array<IMenuItem>): Array<Buttons> {
  return items
    .filter(item => item.hidden ? !item.hidden(ctx) : true)
    .map(item => ({ text: `${item.key} ${I18nManager.getString(ctx, item.text)}` }));
}
