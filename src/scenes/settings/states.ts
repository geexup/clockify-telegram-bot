import { ContextMessageUpdate } from 'telegraf';
import { getSession } from '../../utils';
import { languageAction } from './language';

export enum STATE_NAME {
  SELECT_LANGUAGE
}

export async function selectActionMiddleware(ctx: ContextMessageUpdate, next: Function) {
  const stateName = getSession(ctx).state ? getSession(ctx).state.stateName : undefined;
  if (stateName === undefined) return await next();

  switch (stateName) {
    case STATE_NAME.SELECT_LANGUAGE:
      await languageAction(ctx as any);
      break;

    default:
      await next();
  }
}
