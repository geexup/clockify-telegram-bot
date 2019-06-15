import crypto from 'crypto';
import { getSession, getArguments } from '../utils';
import { Middleware, ContextMessageUpdate } from 'telegraf';
import { I18nManager } from '../i18n';

let lastSecretPhrase: string;

function newSecretPhrase(): string {
  lastSecretPhrase = crypto.randomBytes(20).toString('hex');
  console.log('New secret phrase:', lastSecretPhrase);
  return lastSecretPhrase;
}

export const adminCmd: Array<Middleware<ContextMessageUpdate>> = [
  async (ctx) => {
    const args = getArguments(ctx);

    if (args.length === 0) {
      newSecretPhrase();
      I18nManager.reply(ctx, 'CMD_ADMIN_PROF');

      return;
    }

    // if never assigned
    if (lastSecretPhrase === undefined) return;
    const phrase = args[0];

    if (lastSecretPhrase === phrase) {
      getSession(ctx).isAdmin = true;
      await I18nManager.replyWithSticker(ctx, 'CMD_ADMIN_APPROVED_STICKER');
    } else {
      await I18nManager.replyWithSticker(ctx, 'CMD_ADMIN_DENIED_STICKER');
      I18nManager.reply(ctx, 'CMD_ADMIN_DENIED');
    }
  }
];
