import { leaveScene } from '../../utils/leave-scene';
import { IMenuItem } from '../interface';

export const backButton: IMenuItem = {
  callback: leaveScene,
  key: '↩️',
  middlewares: [],
  text: 'MENU_BACK'
};
