import { EnvironmentManager } from './environment';
import { sendBuhatSticker } from './utils/send-buhat-sticker';

import Telegraf from 'telegraf';
import { TelegrafMongoSession } from 'telegraf-session-mongodb-fork';
import { registerCommands } from './commands';
import { registerMenu } from './menu';
import { mainMenuButtonSet } from './menu/buttons';
import { onHelp } from './on-help';
import { onStart } from './on-start';
import { registerScenes } from './scenes';
import { getProxyAgent } from './proxy';

const Stage = require('telegraf/stage');

export const bot = new Telegraf(EnvironmentManager.current.BOT_TOKEN, {
  telegram: { agent: getProxyAgent(EnvironmentManager.current.PROXY) }
});

// Mongo session
TelegrafMongoSession.setup(bot, EnvironmentManager.current.MONGODB_URI);

// Create scene manager
const stage = new Stage();

bot.use(stage.middleware());
bot.catch((err: any) => console.log('Ooops', err));

bot.on('sticker', (ctx) => {
  console.log(ctx.message !== undefined ? ctx.message.sticker : '');
});

// Life-cycle
bot.start(onStart);
bot.help(onHelp);
bot.hears(/бухать/i, sendBuhatSticker);

// Scenes
registerScenes(stage);

// Commands
registerCommands(bot);

// Menu
registerMenu(bot, mainMenuButtonSet);

export async function startBot() {
  await bot.launch({});
  console.log('Bot started');
}
