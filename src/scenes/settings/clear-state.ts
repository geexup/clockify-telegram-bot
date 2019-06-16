import { MongoSessionContext } from 'telegraf-session-mongodb-fork';
import { getSession } from '../../utils';

export async function clearState(ctx: MongoSessionContext) {
  if (getSession(ctx).state) getSession(ctx).state.stateName = undefined;
  else {
    getSession(ctx).state = { };
  }

  await ctx.saveSession();
}
