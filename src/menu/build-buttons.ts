import { ContextMessageUpdate, Buttons } from 'telegraf';
import { IMenuItem } from './interface';
import { I18nManager } from '../i18n';

export function buildButtons(ctx: ContextMessageUpdate, items: Array<IMenuItem>): Array<Buttons> {
  return items
    .filter(item => item.hidden ? !item.hidden(ctx) : true)
    .map(item => {
      const text = typeof item.text === 'function' ?
        item.text(ctx)
        : I18nManager.getString(ctx, item.text);

      return { text: `${item.key} ${text}` };
    });
}
