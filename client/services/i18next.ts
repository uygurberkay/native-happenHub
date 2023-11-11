import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

/* Languages */
import EnglishJSON from '../locales/en.json';
import TurkishJSON from '../locales/tr.json';

export const languageResources = {
    en:{translation: EnglishJSON },
    tr:{translation: TurkishJSON },
};


i18next
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        lng: 'tr', // Change this later
        fallbackLng: 'en',
        resources: languageResources,
    });

export default i18next;