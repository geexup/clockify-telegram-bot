import { IMenuItem } from '../interface';
import { isLogined } from '../../utils';
import { cmdToMenuButtonCb } from '../../utils/cmd-menu-btn';
import { logoutCmd } from '../../commands/logout.command';

export const logoutBtn: IMenuItem = {
  key: '🔒',
  text: 'MENU_MAIN_LOGOUT',
  rollMenuBack: true,
  hidden: (ctx) => !isLogined(ctx),
  ...cmdToMenuButtonCb(logoutCmd)
}
