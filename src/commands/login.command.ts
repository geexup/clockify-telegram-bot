import { ContextMessageUpdate, Middleware } from 'telegraf';

export const loginCmd: Array<Middleware<ContextMessageUpdate>> = [
  (ctx: any) => ctx.scene.enter('auth')
];
