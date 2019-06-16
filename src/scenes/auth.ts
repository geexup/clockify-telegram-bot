import { ClockifyApi } from 'clockify-api';
import { ContextMessageUpdate } from 'telegraf';
import { MongoSessionContext } from 'telegraf-session-mongodb-fork';
import { bot } from '../bot';
import { I18nManager } from '../i18n';
import { sendMainMenu } from '../menu/send-menu';
import { getSession } from '../utils';
import { leaveScene } from '../utils/leave-scene';

const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

export const authScene = new Scene('auth');
authScene.enter((ctx: ContextMessageUpdate) => I18nManager.replyWithMarkdown(ctx, 'SCENE_AUTH_WELCOME_MD'));
authScene.leave((ctx: ContextMessageUpdate) => sendMainMenu(ctx));

// TODO: make menu button to cancel
authScene.command('cancel', leaveScene);

authScene.on('message', async (ctx: MongoSessionContext) => {
  const chatId = ctx.chat !== undefined ? ctx.chat.id : '';

  // Дружко - "Чтож проверим"
  const waitMessage = await I18nManager.replyWithSticker(ctx, 'SCENE_AUTH_CHECK_STICKER');
  await ctx.replyWithChatAction('typing');

  if (ctx.message === undefined) return;

  const key = ctx.message.text as string;
  const clockify = new ClockifyApi(key);
  try {
    const user = await clockify.user.get();
    if (user) {
      getSession(ctx).clockifyKey = key;
      getSession(ctx).clockifyUser = user;

      await bot.telegram.deleteMessage(chatId, waitMessage.message_id);
      await I18nManager.replyWithSticker(ctx, 'SCENE_AUTH_CHECK_APPROVED_STICKER');
      await I18nManager.reply(ctx, 'SCENE_AUTH_CHECK_APPROVED', { user });
      await leaveScene(ctx);
    }
  } catch (error) {
    await bot.telegram.deleteMessage(chatId, waitMessage.message_id);
    // А жаль
    await I18nManager.replyWithSticker(ctx, 'SCENE_AUTH_CHECK_DENIED_STICKER');
    await I18nManager.reply(ctx, 'SCENE_AUTH_CHECK_DENIED', { error });
  }
});
