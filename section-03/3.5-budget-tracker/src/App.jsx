import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Budget Tracker</h1>
      <TransactionForm />
      <TransactionList />
    </div>
  );
}

export default App;
