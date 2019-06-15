import { ContextMessageUpdate } from 'telegraf';
import { getSession } from '../../../utils';
import { IFillDayState } from './states';

export function getFillDayState(ctx: ContextMessageUpdate): IFillDayState | null {
  return getSession(ctx).state || null;
}
