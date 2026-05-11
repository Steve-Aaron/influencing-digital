import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import es from './locales/es.json';
import it from './locales/it.json';
import bg from './locales/bg.json';
import fr from './locales/fr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      it: { translation: it },
      bg: { translation: bg },
      fr: { translation: fr },
    },
    // Default to English; only respect an explicit user selection stored in localStorage
    fallbackLng: 'en',
    lng: undefined, // resolved via detection below
    supportedLngs: ['en', 'es', 'it', 'bg', 'fr'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    detection: {
      // Only use localStorage — never pick up browser/OS language automatically
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
