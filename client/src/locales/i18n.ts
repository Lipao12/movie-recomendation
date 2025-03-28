import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enFooter from "./en/footer.json";
import enMoodSelector from "./en/mood-selector.json";
import enMoods from "./en/moods.json";
import ptFooter from "./pt/footer.json";
import ptMoodSelector from "./pt/mood-selector.json";
import ptMoods from "./pt/moods.json";


const resources = {
  pt: {
    mood_selector: ptMoodSelector,
    moods: ptMoods,
    footer: ptFooter,
  },
  en: {
    mood_selector: enMoodSelector,
    moods: enMoods,
    footer: enFooter,
  }
};


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
