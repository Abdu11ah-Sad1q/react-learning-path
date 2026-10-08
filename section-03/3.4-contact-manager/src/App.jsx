import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Manager</h1>
      <ContactForm />
      <ContactList />
    </div>
  );
}

export default App;
