import { I18n } from '../interface';

export const ru_ru: I18n = {
  MIDDLEWARE_ADMIN_DENIED: 'Вы должны быть админом',
  MIDDLEWARE_LOGINED_DENIED: 'Вы не вошли. Чтобы войти используйте команду /login',

  LIFECYCLE_ON_START:
    'Привет, Линивец AKA {{ userName }}!\n' +
    'Чтобы работать с ботом, нужно залогиниться /login',

  MENU_BACK: 'Назад',

  MENU_MAIN_TITLE_MD: '*Выберете действие*:',
  MENU_MAIN_INFO: 'Информация о пользователе',
  MENU_MAIN_FILL_DAY: 'Заполнить день',
  MENU_MAIN_LOGIN: 'Войти в Clockify',
  MENU_MAIN_LOGOUT: 'Выход',

  CMD_ADMIN_PROF:
    'Если ты и правда Админ, докажи это:\n' +
    'Выполни команду /admin <секретная фраза>',

  CMD_ADMIN_APPROVED_STICKER: 'CAADAgAD_AcAApkvSwrqgUIPiH3KhgI',

  CMD_ADMIN_DENIED: 'САМОЗВАНЕЦ!',
  CMD_ADMIN_DENIED_STICKER: 'CAADAgADVAMAApkvSwo2S40k6XqcYQI',

  CMD_DUMP_STICKER: 'CAADAgADDXcAAmOLRgydmMdwuCoAAToC',

  CMD_INFO_TEXT:
    '*Текущий пользователь*\n' +
    '*Email:* {{user.email }}\n' +
    '*Name:* {{ user.name }}\n' +
    '*Active Workspace:* {{ activeWorkspaceName }}',

  CMD_LOGOUT: 'Ладно, на этот раз все забудем',
  CMD_LOGOUT_STICKER: 'CAADAgAD9AIAApkvSwp2a37F4b3R7AI',

  SCENE_AUTH_WELCOME_MD:
    'Для аутентификации в Clockify необходимо:\n\n' +
    '1. Войти в свой аккаунт на [clockify.me](https://clockify.me/login)\n' +
    '2. Перейти в [My profile](https://clockify.me/user/settings)\n' +
    '3. Скопировать `API key` (Если его нет, необходимо нажать на кнопку `GENERATE`)\n' +
    '4. Вставте ключ в чат\n\n',
  SCENE_AUTH_CHECK_STICKER: 'CAADAgADbgcAApkvSwq8S9lJIIDpsAI',
  SCENE_AUTH_CHECK_DENIED:
    'Ошибочка: {{ error.message }}\n' +
    'Попробуйте еще раз',
  SCENE_AUTH_CHECK_DENIED_STICKER: 'CAADAgADCgUAApkvSwqfIKhRxUh1BwI',
  SCENE_AUTH_CHECK_APPROVED:
    'Отлично, {{ user.name }}! Бот гордиться Вами!\n' +
    'Чтобы выйти, используй /logout',
  SCENE_AUTH_CHECK_APPROVED_STICKER: 'CAADAgADFAMAApkvSwpbtssWzTYWdwI',

  SCENE_FILL_DAY_WELCOME: 'Выберете проект',
  SCENE_FILL_DAY_TIME_SELECT: 'Выберете кол-во часов для проекта',
  SCENE_FILL_DAY_SUCCESS_STICKERS: [
    'CAADAgADiwMAApkvSwpZNNng_zRXPAI',
    'CAADAgADYAIAApkvSwqC9YMUJnEXbwI',
    'CAADAgADJgUAApkvSwpzAxyiCwNoKwI',
    'CAADAgADfwIAApkvSwpYY0yPUCF8XgI',
    'CAADAgADEAUAApkvSwoHFO4R6fTsdgI'
  ]
};