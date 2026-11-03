## Task 6.2: Login and language

**Language:** All fixed texts are in `src/translations.js`, one object
for English (`en`) and one for Norwegian (`no`). `LanguageContext`
keeps the chosen language and saves it in `localStorage`, so it stays
after a refresh. Pages call `t("key")` to get the text. To add a new
text, I add the same key in both objects. The language logic does not
change. If a Norwegian text is missing, English is used. Post titles and
content come from the API, so they stay as they are.

**Login:** `AuthContext` keeps the username (saved in `localStorage`).
Any username with the password `test123` logs in. This is fake login for
learning only and is not secure.

**Protected page:** `/reading-list` is wrapped in `ProtectedRoute`. If
nobody is logged in, it sends the user to `/login` and remembers the
page in the router state. After login, the user is taken back there.

**Reading list:** Logged-in users get a save button on each post page.
The post ids are saved in `localStorage`, one list per username.
