import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../slices/ContactSlice.jsx";

function ContactList() {
  const contacts = useSelector((state) => state.contacts.list);
  const dispatch = useDispatch();

  const sortByName = (a, b) => a.name.localeCompare(b.name);

  const favorites = contacts.filter((c) => c.favorite).sort(sortByName);
  const others = contacts.filter((c) => !c.favorite).sort(sortByName);

  function renderContact(contact) {
    return (
      <div
        key={contact.id}
        className="border p-2 mb-2 flex justify-between items-center"
      >
        <div>
          <p className="font-bold">{contact.name}</p>
          <p>{contact.phone}</p>
          <p>{contact.email}</p>
        </div>
        <button
          onClick={() => dispatch(toggleFavorite(contact.id))}
          className="border px-2 py-1"
        >
          {contact.favorite ? "★ Favorite" : "☆ Favorite"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Favorites</h2>
      {favorites.length === 0 && <p className="mb-2">No favorites yet.</p>}
      {/* favorites.map((contact) => renderContact(contact)) */}
      {favorites.map(renderContact)}

      <h2 className="text-lg font-bold mt-4 mb-2">Everyone else</h2>
      {others.length === 0 && <p>No other contacts.</p>}
      {/* {others.map((contact) => renderContact(contact))} */}
      {others.map(renderContact)}
    </div>
  );
}

export default ContactList;
