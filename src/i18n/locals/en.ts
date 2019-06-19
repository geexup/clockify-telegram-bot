import { I18n } from '../interface';

// tslint:disable: object-literal-sort-keys
// tslint:disable-next-line: variable-name
export const en_us: I18n = {
  LOCALE_FLAG: '🇺🇸',
  LOCALE_NAME: 'English',

  MIDDLEWARE_ADMIN_DENIED: 'You must be an admin',
  MIDDLEWARE_LOGINED_DENIED: 'You are not logged in. To do this use /login',

  LIFECYCLE_ON_START:
    'Hello, {{ userName }}!\n' +
    'First of all you need to log in /login',

  MENU_BACK: 'Back',

  MENU_MAIN_TITLE_MD: '*Select action*:',
  MENU_MAIN_INFO: 'User info',
  MENU_MAIN_FILL_DAY: 'Fill work hours for today',
  MENU_MAIN_SETTINGS: 'Settings',
  MENU_MAIN_LOGIN: 'Login Clockify',
  MENU_MAIN_LOGOUT: 'Logout',
  MENU_MAIN_REPORTS: 'Reports',

  CMD_ADMIN_PROF:
    'If you\'re really an admin, proof it:\n' +
    'Enter /admin <secret phrase>',

  CMD_ADMIN_APPROVED_STICKER: 'CAADAgADWoMAAmOLRgy4d-dkFCTMJwI',

  CMD_ADMIN_DENIED: 'IMPOSTOR!',
  CMD_ADMIN_DENIED_STICKER: 'CAADAgADQ4MAAmOLRgw_ehryZfUb6QI',

  CMD_DUMP_STICKER: 'CAADAgADtAcAAhhC7gglJeJbsh0cegI',

  CMD_INFO_TEXT:
    '*Current user*\n' +
    '*Email:* {{user.email }}\n' +
    '*Name:* {{ user.name }}\n' +
    '*Active Workspace:* {{ activeWorkspaceName }}',

  CMD_LOGOUT: 'Well ok, i\'ll forgive you this time',
  CMD_LOGOUT_STICKER: 'CAADAQADNwADxcx7DexcBdIwL9PGAg',

  SCENE_AUTH_WELCOME_MD:
    'For Clockify authentication you need to:\n\n' +
    '1. Login in your profile here - [clockify.me](https://clockify.me/login)\n' +
    '2. Open [My profile](https://clockify.me/user/settings) page\n' +
    '3. Copy `API key` (If there isn\'t one, click - `GENERATE`)\n' +
    '4. Paste key here in chat\n\n',
  SCENE_AUTH_CHECK_STICKER: 'CAADBAADcwEAArCi_wbf2U_CoZf5IQI',
  SCENE_AUTH_CHECK_DENIED:
    'Error: {{ error.message }}\n' +
    'Try again',
  SCENE_AUTH_CHECK_DENIED_STICKER: 'CAADBAADZwEAArCi_wZo2A4SBlzfcgI',
  SCENE_AUTH_CHECK_APPROVED:
    'Excellent, {{ user.name }}! Bot can be proud of you!\n' +
    'To logout use /logout',
  SCENE_AUTH_CHECK_APPROVED_STICKER: 'CAADBAADpAEAArCi_wZZ2Y3y6XTgCAI',

  SCENE_FILL_DAY_WELCOME: 'Select project',
  SCENE_FILL_DAY_TIME_SELECT: 'Select or write amount of hours',
  SCENE_FILL_DAY_SUCCESS_STICKERS: [
    'CAADBAADrAEAArCi_wb-Bxpxtt8_rwI'
  ],

  SCENE_SETTINGS_SELECT_LANGUAGE_BTN: 'Change language',
  SCENE_SETTINGS_SELECT_LANGUAGE: 'Select language:',
  SCENE_SETTINGS_SELECT_LANGUAGE_SUCCESS: 'Language changed!',

  SCENE_REPORTS_MENU_WEEK: 'Week report',
  SCENE_REPORTS_MENU_WEEK_PROJECTS: 'Projects',

  SCENE_REPORTS_MONDAY: 'Monday',
  SCENE_REPORTS_TUESDAY: 'Tuesday',
  SCENE_REPORTS_WEDNESDAY: 'Wednesday',
  SCENE_REPORTS_THURSDAY: 'Thursday',
  SCENE_REPORTS_FRIDAY: 'Friday',
  SCENE_REPORTS_SATURDAY: 'Saturday',
  SCENE_REPORTS_SUNDAY: 'Sunday'
};
