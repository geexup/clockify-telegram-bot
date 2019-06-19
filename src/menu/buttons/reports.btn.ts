import { MongoSessionContext } from 'telegraf-session-mongodb-fork';
import { loginedMiddleware } from '../../middlewares';
import { IMenuItem } from '../interface';

export const reportsButton: IMenuItem = {
  key: '📈',
  async callback(ctx: MongoSessionContext) {
    // @ts-ignore
    await ctx.scene.enter('report');
    await ctx.saveSession();
  },
  middlewares: [loginedMiddleware],
  text: 'MENU_MAIN_REPORTS'
};
