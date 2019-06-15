import { ru_ru } from './ru';
import { I18n } from '../interface';

export type TLocales = 'ru';
export const locals: { [key in TLocales]: I18n } = {
  ru: ru_ru
};
