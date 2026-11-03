import { Link } from "react-router-dom";
import { useLanguage } from "../useLanguage";

function Header() {
  const { t, language, changeLanguage } = useLanguage();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-3xl mx-auto flex flex-wrap gap-2 justify-between">
        <h1 className="font-bold text-xl">{t("siteName")}</h1>
        <nav className="flex flex-wrap gap-4 items-center">
          <Link to="/">{t("home")}</Link>
          <Link to="/posts">{t("allPosts")}</Link>
          <button
            onClick={() => changeLanguage("en")}
            className={language === "en" ? "font-bold underline" : ""}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage("no")}
            className={language === "no" ? "font-bold underline" : ""}
          >
            NO
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
