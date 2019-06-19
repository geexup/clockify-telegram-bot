import { ContextMessageUpdate, Telegraf } from 'telegraf';
import { IMenuItem } from './interface';
import { sendMainMenu } from './send-menu';

export function registerMenu(bot: Telegraf<ContextMessageUpdate>, buttonSet: Array<IMenuItem>) {
  buttonSet.forEach((item) => {
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
