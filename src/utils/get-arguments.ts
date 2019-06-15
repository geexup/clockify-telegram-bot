import { ContextMessageUpdate } from 'telegraf';

export function getArguments(ctx: ContextMessageUpdate): Array<string> {
  if (ctx.message === undefined) return [];
  if (ctx.message.entities === undefined) return [];
  if (ctx.message.entities.length === 0) return [];

  const text = ctx.message.text || '';
  const commandLength = ctx.message.entities.length
   ? ctx.message.entities[ctx.message.entities.length - 1].length
   : 0;

  const beforeSplit = text.slice(commandLength).trim();
  return beforeSplit === '' ? [] : beforeSplit.split(' ');
}
