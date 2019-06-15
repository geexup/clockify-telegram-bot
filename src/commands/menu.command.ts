import { Middleware, ContextMessageUpdate } from 'telegraf';
import { sendMenu, sendMainMenu } from '../menu/send-menu';

export const menuCmd: Array<Middleware<ContextMessageUpdate>> = [
  async (ctx) => {
    sendMainMenu(ctx);
  }
];
