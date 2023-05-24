import { I18n } from 'i18n-js';
const translations = {
  'en':require('./en/translation.json'),
  pt:require('./pt-br/translation.json')
}
const i18n = new I18n(translations);
i18n.defaultLocale = 'en';
i18n.fallbacks = true;

export function translate(key, options = {}) {
  return i18n.t(key, options);
}

export default i18n
