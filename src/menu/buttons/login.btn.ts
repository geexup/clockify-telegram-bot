import { IMenuItem } from '../interface';
import { isLogined } from '../../utils';
import { cmdToMenuButtonCb } from '../../utils/cmd-menu-btn';
import { loginCmd } from '../../commands/login.command';

export const loginBtn: IMenuItem = {
  key: '🔑',
  text: 'MENU_MAIN_LOGIN',
  hidden: (ctx) => isLogined(ctx),
  ...cmdToMenuButtonCb(loginCmd)
}
