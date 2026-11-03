import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { useAuth } from "../AuthContext";

function Header() {
  const { t, language, changeLanguage } = useLanguage();
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-3xl mx-auto flex flex-wrap gap-2 justify-between">
        <h1 className="font-bold text-xl">{t("siteName")}</h1>
        <nav className="flex flex-wrap gap-4 items-center">
          <Link to="/">{t("home")}</Link>
          <Link to="/posts">{t("allPosts")}</Link>
          <Link to="/reading-list">{t("readingList")}</Link>

          {user ? (
            <>
              <span>
                {t("hello")}, {user}
              </span>
              <button onClick={logout}>{t("logout")}</button>
            </>
          ) : (
            <Link to="/login">{t("login")}</Link>
          )}

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
