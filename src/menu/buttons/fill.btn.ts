import { loginedMiddleware } from '../../middlewares';
import { isLogined } from '../../utils';
import { IMenuItem } from '../interface';

export const fillBtn: IMenuItem = {
  hidden: (ctx) => !isLogined(ctx),
  key: '📝',
  middlewares: [loginedMiddleware],
  text: 'MENU_MAIN_FILL_DAY',
  callback(ctx) {
    // @ts-ignore
    ctx.scene.enter('fill-day');
  }
};
