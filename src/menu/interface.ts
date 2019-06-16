import { I18n } from '../i18n/interface';
import { ContextMessageUpdate, Middleware } from 'telegraf';

export interface IMenuItem {
  key: string;
  text: keyof I18n | ((ctx: ContextMessageUpdate) => string);
  rollMenuBack?: boolean;
  middlewares: Array<Middleware<ContextMessageUpdate>>;
  callback(ctx: ContextMessageUpdate): any;
  hidden?(ctx: ContextMessageUpdate): boolean;
}
