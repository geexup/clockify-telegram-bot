import { Middleware, ContextMessageUpdate } from 'telegraf';
import { createCommandList } from './commands';

export const onHelp: Middleware<ContextMessageUpdate> = (ctx) => {
  ctx.reply(createCommandList());
};
