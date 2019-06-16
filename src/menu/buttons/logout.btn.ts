import { logoutCmd } from '../../commands/logout.command';
import { isLogined } from '../../utils';
import { cmdToMenuButtonCb } from '../../utils/cmd-menu-btn';
import { IMenuItem } from '../interface';

export const logoutBtn: IMenuItem = {
  key: '🔒',
  rollMenuBack: true,
  text: 'MENU_MAIN_LOGOUT',
  ...cmdToMenuButtonCb(logoutCmd),
  hidden: (ctx) => !isLogined(ctx)
};
