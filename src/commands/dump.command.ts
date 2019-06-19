import { ContextMessageUpdate, Middleware } from 'telegraf';
import { I18nManager } from '../i18n';
import { adminMiddleware } from '../middlewares';
import { getSession } from '../utils';

export const dumpCmd: Array<Middleware<ContextMessageUpdate>> = [
  adminMiddleware,
  async (ctx) => {
    const data = JSON.stringify(getSession(ctx), null, 2);

    await I18nManager.replyWithSticker(ctx, 'CMD_DUMP_STICKER');
    await ctx.replyWithDocument({ source: Buffer.from(data, 'utf-8'), filename: 'dump.json' });
  }
];
