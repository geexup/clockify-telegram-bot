import { IMenuItem } from '../interface';

export const settingsBtn: IMenuItem = {
  key: '⚙️',
  text: 'MENU_MAIN_SETTINGS',
  middlewares: [],
  callback(ctx) {
    // @ts-ignore
    ctx.scene.enter('settings')
  }
}
