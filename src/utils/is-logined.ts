import { ContextMessageUpdate } from 'telegraf';
import { getSession } from './session';

export function isLogined(ctx: ContextMessageUpdate): boolean {
  return !!getSession(ctx).clockifyKey;
}
