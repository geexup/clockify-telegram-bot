import { ContextMessageUpdate, Middleware } from 'telegraf';
import { IMenuItem } from '../menu/interface';

export function cmdToMenuButtonCb(cmd: Array<Middleware<ContextMessageUpdate>>): {
  middlewares: IMenuItem['middlewares'],
  callback: IMenuItem['callback']
} {
  return {
    callback: cmd[cmd.length - 1],
    middlewares: cmd.slice(0, cmd.length - 1)
  };
}
