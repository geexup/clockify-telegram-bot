import { I18n } from '../interface';
import { en_us } from './en';
import { ru_ru } from './ru';

export type TLocales = 'ru' | 'en';
export const locals: { [key in TLocales]: I18n } = {
  en: en_us,
  ru: ru_ru
};
