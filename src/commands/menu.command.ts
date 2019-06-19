import { ContextMessageUpdate, Middleware } from 'telegraf';
import { sendMainMenu } from '../menu/send-menu';

export const menuCmd: Array<Middleware<ContextMessageUpdate>> = [
  async (ctx) => {
    sendMainMenu(ctx);
  }
];
