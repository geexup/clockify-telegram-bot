import { IMenuItem } from '../interface';
import { infoBtn } from './info.btn';
import { loginBtn } from './login.btn';
import { logoutBtn } from './logout.btn';
import { fillBtn } from './fill.btn';

export const mainMenuButtonSet: Array<IMenuItem> = [
  fillBtn,
  infoBtn,
  loginBtn,
  logoutBtn,
];
