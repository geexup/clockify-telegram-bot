import { ClockifyApi } from 'clockify-api';
import { ContextMessageUpdate } from 'telegraf';
import { getSession } from './session';

export function getClockify(ctx: ContextMessageUpdate): ClockifyApi {
  return new ClockifyApi(getSession(ctx).clockifyKey || '');
}
