import { Telegraf, ContextMessageUpdate } from 'telegraf';
import { sendMenu, sendMainMenu } from './send-menu';
import { IMenuItem } from './interface';

export function registerMenu(bot: Telegraf<ContextMessageUpdate>, buttonSet: Array<IMenuItem>) {
  buttonSet.forEach(item => {
    const callbacks = [...item.middlewares];

    if (item.rollMenuBack) {
      callbacks.push(async (ctx) => {
        const result = item.callback(ctx);
        if (result instanceof Promise) await result;

        sendMainMenu(ctx);
      });
    } else callbacks.push(item.callback);

    bot.hears(
      new RegExp(item.key + ' ', ''),
      // @ts-ignore
      ...callbacks
    );
  });
}
