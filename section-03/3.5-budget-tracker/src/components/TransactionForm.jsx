import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../slices/TransactionSlice";

function TransactionForm() {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // validation
    if (description.trim() === "") {
      setError("Please enter a description.");
      return;
    }
    if (Number(amount) <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }
    if (date === "") {
      setError("Please choose a date.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description: description,
      amount: Number(amount),
      type: type,
      category: category,
      date: date,
    };

    dispatch(addTransaction(newTransaction));

    // clear the form
    setDescription("");
    setAmount("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="border p-4 mb-4">
      <h2 className="font-semibold mb-2">Add Transaction</h2>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 w-full mb-2"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full mb-2"
      >
        <option>Food</option>
        <option>Rent</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Salary</option>
        <option>Other</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Add
      </button>
    </form>
  );
}

export default TransactionForm;
