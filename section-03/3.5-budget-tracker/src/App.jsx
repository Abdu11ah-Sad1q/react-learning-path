import { useState } from "react";
import { useSelector } from "react-redux";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";

function App() {
  const allTransactions = useSelector((state) => state.transactions.items);

  // current month in the format "2026-10"
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [month, setMonth] = useState(currentMonth);

  // keep only the transactions of the chosen month
  const monthTransactions = allTransactions.filter(
    (t) => t.date.slice(0, 7) === month,
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Budget Tracker</h1>

      <div className="mb-4">
        <label className="mr-2">Month:</label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2"
        />
      </div>

      <Summary transactions={monthTransactions} />
      <TransactionForm />
      <TransactionList transactions={monthTransactions} />
    </div>
  );
}

export default App;
