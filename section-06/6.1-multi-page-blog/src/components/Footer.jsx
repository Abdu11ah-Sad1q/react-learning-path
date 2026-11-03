import { useLanguage } from "../LanguageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-200 text-center p-4 mt-8">
      <p>{t("footerText")}</p>
    </footer>
  );
}

export default Footer;
