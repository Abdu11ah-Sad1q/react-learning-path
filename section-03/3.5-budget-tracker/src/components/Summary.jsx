function Summary({ transactions }) {
  let totalIncome = 0;
  let totalExpenses = 0;

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "income") {
      totalIncome = totalIncome + transactions[i].amount;
    } else {
      totalExpenses = totalExpenses + transactions[i].amount;
    }
  }

  const balance = totalIncome - totalExpenses;

  return (
    <div className="border p-4 mb-4 flex justify-between">
      <div>
        <p className="text-sm text-gray-500">Income</p>
        <p className="font-semibold text-green-600">
          {totalIncome.toLocaleString()}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Expenses</p>
        <p className="font-semibold text-red-600">
          {totalExpenses.toLocaleString()}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Balance</p>
        <p
          className={
            balance < 0 ? "font-semibold text-red-600" : "font-semibold"
          }
        >
          {balance.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default Summary;
