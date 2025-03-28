import { useTranslation } from "react-i18next";
import { ButtonLocale } from "./button-locale";

export const Footer = () => {
  const { t, i18n } = useTranslation("footer");

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "pt" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <footer className="mt-12 text-center text-white text-sm flex items-center justify-between relative px-4">
      <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
        <p>{t("made_by")}</p>
        <p>{t("inspired_by")}</p>
      </div>

      <div className="ml-auto">
        <ButtonLocale toggleLanguage={toggleLanguage} />
      </div>
    </footer>
  );
};
