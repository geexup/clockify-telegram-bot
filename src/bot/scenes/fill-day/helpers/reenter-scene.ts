import { ContextMessageUpdate } from 'telegraf';
import { makeLeaveBloked } from './block-leave';

export function reenterScene(ctx: ContextMessageUpdate): void {
  makeLeaveBloked(ctx);

  // @ts-ignore
  ctx.scene.reenter();
}
