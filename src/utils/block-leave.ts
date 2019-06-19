import { ContextMessageUpdate } from 'telegraf';

export async function blockLeaveMiddleware(ctx: ContextMessageUpdate, next: Function): Promise<void> {
  // @ts-ignore
  if (ctx.state.noLeave) {
    // @ts-ignore
    ctx.state.noLeave = false;
    return;
  }

  await next();
}

export function makeLeaveBloked(ctx: any): void {
  // @ts-ignore
  ctx.state.noLeave = true;
}
