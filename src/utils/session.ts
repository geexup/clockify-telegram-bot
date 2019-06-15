import { CLKUser } from 'clockify-api/dist/interfaces/user.interface';

export interface ISessionData {
  clockifyKey?: string;
  isAdmin?: boolean;
  locale?: string;
  clockifyUser?: CLKUser;
  clockifyWorkspaceId?: string;
  state?: any;
}

export function getSession(ctx: any): ISessionData {
  return ctx.session;
}

export function clearSession(ctx: any): void {
  ctx.session = {};
}
