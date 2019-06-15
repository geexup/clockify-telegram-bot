import { IMenuItem } from '../menu/interface';
import { Middleware, ContextMessageUpdate } from 'telegraf';

export function cmdToMenuButtonCb(cmd: Array<Middleware<ContextMessageUpdate>>): {
  middlewares: IMenuItem['middlewares'],
  callback: IMenuItem['callback']
} {
  return {
    middlewares: cmd.slice(0, cmd.length - 1),
    callback: cmd[cmd.length - 1]
  };
}
