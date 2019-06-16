import { ru_ru } from './ru';
import { I18n } from '../interface';
import { en_us } from './en';

export type TLocales = 'ru' | 'en';
export const locals: { [key in TLocales]: I18n } = {
  ru: ru_ru,
  en: en_us
};
