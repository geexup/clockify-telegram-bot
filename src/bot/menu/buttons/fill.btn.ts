import { IMenuItem } from '../interface';
import { isLogined } from '../../utils';
import { cmdToMenuButtonCb } from '../../utils/cmd-menu-btn';
import { infoCmd } from '../../commands/info.command';
import { loginedMiddleware } from '../../middlewares';

export const fillBtn: IMenuItem = {
  key: '📝',
  text: 'MENU_MAIN_FILL_DAY',
  hidden: (ctx) => !isLogined(ctx),
  middlewares: [loginedMiddleware],
  callback(ctx) {
    // @ts-ignore
    ctx.scene.enter('fill-day')
  }
}
