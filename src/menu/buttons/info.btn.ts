import { infoCmd } from '../../commands/info.command';
import { isLogined } from '../../utils';
import { cmdToMenuButtonCb } from '../../utils/cmd-menu-btn';
import { IMenuItem } from '../interface';

export const infoBtn: IMenuItem = {
  key: 'ℹ️',
  rollMenuBack: true,
  text: 'MENU_MAIN_INFO',
  ...cmdToMenuButtonCb(infoCmd),
  hidden: (ctx) => !isLogined(ctx)
};
