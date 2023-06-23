class Translator {
  constructor() {
    this.translations = {
      'en': require('./en/translation.json'),
      'pt': require('./pt-br/translation.json')
    };
    this.currentLanguage = null;
    this.initializeLanguage();
  }

  initializeLanguage() {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      this.currentLanguage = storedLanguage;
    } else {
      this.currentLanguage = 'en';
      localStorage.setItem('language', this.currentLanguage);
    }
  }

  setLanguage(language) {
    this.currentLanguage = language;
    localStorage.setItem('language', language);
  }

  translate(key, options = {}) {
    const [context, message] = key.split('.');
    return this.translations[this.currentLanguage][context][message];
  }
}

export const translator = new Translator();
