import { ContextMessageUpdate } from 'telegraf';
import { getSession } from './session';

export function isAdmin(ctx: ContextMessageUpdate): boolean {
  return !!getSession(ctx).isAdmin;
}
