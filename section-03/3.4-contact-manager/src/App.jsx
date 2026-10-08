import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { useState } from "react";

function App() {
  // null means "we are adding". A contact object means "we are editing it".
  const [editingContact, setEditingContact] = useState(null);

  /* The key line is probably the confusing part.
    normally React reuses the same form and keeps what you typed.
    By changing the key,
    we tell React "this is a different form now,
    throw the old one away and start a new one."
    The new form then starts with the right values: */
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Manager</h1>
      <ContactForm
        key={editingContact ? editingContact.id : "new"}
        contactToEdit={editingContact}
        onDone={() => setEditingContact(null)}
      />
      <ContactList onEdit={setEditingContact} />
    </div>
  );
}

export default App;
