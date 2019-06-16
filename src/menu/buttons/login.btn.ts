import { loginCmd } from '../../commands/login.command';
import { isLogined } from '../../utils';
import { cmdToMenuButtonCb } from '../../utils/cmd-menu-btn';
import { IMenuItem } from '../interface';

export const loginBtn: IMenuItem = {
  key: '🔑',
  text: 'MENU_MAIN_LOGIN',
  ...cmdToMenuButtonCb(loginCmd),
  hidden: (ctx) => isLogined(ctx)
};
