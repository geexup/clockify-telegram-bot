import { ContextMessageUpdate } from 'telegraf';
import { getSession } from './session';

export function getClockifyWorkspace(ctx: ContextMessageUpdate): string {
  const session = getSession(ctx);

  if (session.clockifyWorkspaceId) return session.clockifyWorkspaceId;
  if (session.clockifyUser) return session.clockifyUser.activeWorkspace;

  return '';
}
