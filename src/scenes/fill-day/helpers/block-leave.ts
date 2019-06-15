import { ContextMessageUpdate } from 'telegraf';

export async function blockLeaveMiddleware(ctx: ContextMessageUpdate, next: Function): Promise<void> {
  // @ts-ignore
  if (ctx.state.noLeave) return;
  await next()
}

export function makeLeaveBloked(ctx: any): void {
  // @ts-ignore
  ctx.state.noLeave = true;
}
