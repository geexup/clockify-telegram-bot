import { IMenuItem } from '../interface';
import { isLogined } from '../../utils';
import { cmdToMenuButtonCb } from '../../utils/cmd-menu-btn';
import { infoCmd } from '../../commands/info.command';

export const infoBtn: IMenuItem = {
  key: 'ℹ️',
  text: 'MENU_MAIN_INFO',
  rollMenuBack: true,
  hidden: (ctx) => !isLogined(ctx),
  ...cmdToMenuButtonCb(infoCmd)
}
