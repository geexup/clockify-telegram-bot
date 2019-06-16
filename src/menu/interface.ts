import { ContextMessageUpdate, Middleware } from 'telegraf';
import { I18n } from '../i18n/interface';

export interface IMenuItem {
  key: string;
  text: keyof I18n | ((ctx: ContextMessageUpdate) => string);
  rollMenuBack?: boolean;
  middlewares: Array<Middleware<ContextMessageUpdate>>;
  callback(ctx: ContextMessageUpdate): any;
  hidden?(ctx: ContextMessageUpdate): boolean;
}
