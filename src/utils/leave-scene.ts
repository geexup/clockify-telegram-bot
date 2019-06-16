import { MongoSessionContext } from 'telegraf-session-mongodb-fork';
const Stage = require('telegraf/stage');

export async function leaveScene(ctx: MongoSessionContext) {
  await Stage.leave()(ctx);
  return await ctx.saveSession();
}
