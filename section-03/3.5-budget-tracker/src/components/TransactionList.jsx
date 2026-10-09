function TransactionList({ transactions }) {
  return (
    <div className="border p-4">
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
          <p
            className={t.type === "income" ? "text-green-600" : "text-red-600"}
          >
            {t.type === "income" ? "+" : "-"}
            {t.amount}
          </p>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
