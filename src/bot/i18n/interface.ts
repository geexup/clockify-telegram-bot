export interface I18n {
  /** User not an admin */
  MIDDLEWARE_ADMIN_DENIED: string;

  /** User not logined in clockify */
  MIDDLEWARE_LOGINED_DENIED: string;

  /** Bot started welcome message */
  LIFECYCLE_ON_START: string;

  /** (Menu) Main Title */
  MENU_MAIN_TITLE_MD: string;
  /** (Menu) Main -> Info */
  MENU_MAIN_INFO: string;
  /** (Menu) Main -> Fill Day */
  MENU_MAIN_FILL_DAY: string;
  /** (Menu) Main -> Login */
  MENU_MAIN_LOGIN: string;
  /** (Menu) Main -> Logout */
  MENU_MAIN_LOGOUT: string;

  /** (Menu) <- Back */
  MENU_BACK: string;

  /** /admin */
  CMD_ADMIN_PROF: string;

  /** /admin: false enter */
  CMD_ADMIN_DENIED: string;
  /** /admin: false enter sticker */
  CMD_ADMIN_DENIED_STICKER: string;

  /** /admin: true enter sticker */
  CMD_ADMIN_APPROVED_STICKER: string;

  /** /dump */
  CMD_DUMP_STICKER: string;

  /** /logout */
  CMD_LOGOUT: string;
  /** /logout: sticker sticker */
  CMD_LOGOUT_STICKER: string;

  /** /info */
  CMD_INFO_TEXT: string;

  /** (auth) Welcome title in markdown */
  SCENE_AUTH_WELCOME_MD: string;

  /** (auth) API Key check in progress reply */
  SCENE_AUTH_CHECK_STICKER: string;
  /** (auth) API Key check return an error */
  SCENE_AUTH_CHECK_DENIED: string;
  /** (auth) API Key check return an error */
  SCENE_AUTH_CHECK_DENIED_STICKER: string;
  /** (auth) API Key check was successful */
  SCENE_AUTH_CHECK_APPROVED: string;
  /** (auth) API Key check was successful */
  SCENE_AUTH_CHECK_APPROVED_STICKER: string;

  /** (fill-day) Welcome title */
  SCENE_FILL_DAY_WELCOME: string;
  /** (fill-day) How many hours text */
  SCENE_FILL_DAY_TIME_SELECT: string;
  /** (fill-day) Success stickers */
  SCENE_FILL_DAY_SUCCESS_STICKERS: Array<string>;
}
