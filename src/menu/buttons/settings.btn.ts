import { IMenuItem } from '../interface';

export const settingsBtn: IMenuItem = {
  key: '⚙️',
  middlewares: [],
  text: 'MENU_MAIN_SETTINGS',
  callback(ctx) {
    // @ts-ignore
    ctx.scene.enter('settings');
  }
};
