import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

function NotFound() {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t("pageNotFound")}</h1>
      <p>{t("pageNotFoundText")}</p>
      <Link to="/" className="text-blue-600">
        {t("goHome")}
      </Link>
    </div>
  );
}

export default NotFound;
