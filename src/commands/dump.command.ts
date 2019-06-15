import { Middleware, ContextMessageUpdate } from 'telegraf';
import { getSession } from '../utils';
import { adminMiddleware } from '../middlewares';
import { I18nManager } from '../i18n';

export const dumpCmd: Array<Middleware<ContextMessageUpdate>> = [
  adminMiddleware,
  async (ctx) => {
    const data = JSON.stringify(getSession(ctx), null, 2);

    await I18nManager.replyWithSticker(ctx, 'CMD_DUMP_STICKER');
    await ctx.replyWithDocument({ source: Buffer.from(data, 'utf-8'), filename: 'dump.json' });
  }
];
