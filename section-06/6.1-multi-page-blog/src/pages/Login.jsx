import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useLanguage } from "../LanguageContext";

function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // the page the user wanted before being sent here (home if none)
  const from = location.state ? location.state.from : "/";

  function handleSubmit(e) {
    e.preventDefault();
    if (login(username, password)) {
      navigate(from, { replace: true });
    } else {
      setError(true);
    }
  }

  return (
    <div className="max-w-sm">
      <h1 className="text-2xl font-bold mb-4">{t("login")}</h1>

      <form onSubmit={handleSubmit}>
        <label className="block mb-1">{t("username")}</label>
        <input
          className="border rounded p-2 w-full mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="block mb-1">{t("password")}</label>
        <input
          type="password"
          className="border rounded p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 mb-3">{t("wrongLogin")}</p>}

        <button className="bg-blue-600 text-white rounded px-4 py-2">
          {t("loginButton")}
        </button>
      </form>

      <p className="text-gray-500 mt-4">{t("loginHint")}</p>
    </div>
  );
}

export default Login;
