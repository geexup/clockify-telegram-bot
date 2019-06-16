import { IMenuItem } from '../interface';
import { fillBtn } from './fill.btn';
import { infoBtn } from './info.btn';
import { loginBtn } from './login.btn';
import { logoutBtn } from './logout.btn';
import { settingsBtn } from './settings.btn';

export const mainMenuButtonSet: Array<IMenuItem> = [
  fillBtn,
  infoBtn,
  settingsBtn,
  loginBtn,
  logoutBtn
];
