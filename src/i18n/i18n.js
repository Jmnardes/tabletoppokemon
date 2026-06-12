import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ptBR from './locales/pt-BR.json'
import en from './locales/en.json'

const LANGUAGE_KEY = 'language'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { translation: ptBR },
      'en': { translation: en },
    },
    lng: localStorage.getItem(LANGUAGE_KEY) || 'pt-BR',
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false,
    },
  })

export const changeLanguage = (lang) => {
  localStorage.setItem(LANGUAGE_KEY, lang)
  i18n.changeLanguage(lang)
}

export const getCurrentLanguage = () => i18n.language

export default i18n
