import { useDispatch } from "react-redux";
import { deleteTransaction } from "../slices/TransactionSlice";

function TransactionList({ transactions }) {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 mb-4">
      <h2 className="font-semibold mb-2">Transactions</h2>

      {transactions.length === 0 && (
        <p className="text-gray-500">
          No transactions for this month. Add one above!
        </p>
      )}

      {transactions.map((t) => (
        <div key={t.id} className="flex justify-between border-b py-2">
          <div>
            <p className="font-medium">{t.description}</p>
            <p className="text-sm text-gray-500">
              {t.category} | {t.date}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <p
              className={
                t.type === "income" ? "text-green-600" : "text-red-600"
              }
            >
              {t.type === "income" ? "+" : "-"}
              {t.amount}
            </p>
            <button
              onClick={() => dispatch(deleteTransaction(t.id))}
              className="text-sm text-red-600 border border-red-600 px-2"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
