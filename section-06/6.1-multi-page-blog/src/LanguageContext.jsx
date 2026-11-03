import { createContext, useContext, useState } from "react";
import translations from "./translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const saved = localStorage.getItem("language");
  const [language, setLanguage] = useState(saved === "no" ? "no" : "en");

  function changeLanguage(newLanguage) {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage); // remember after refresh
  }

  // t("home") gives the text for the current language.
  // If a key is missing in Norwegian, it falls back to English.
  function t(key) {
    return translations[language][key] || translations.en[key] || key;
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
