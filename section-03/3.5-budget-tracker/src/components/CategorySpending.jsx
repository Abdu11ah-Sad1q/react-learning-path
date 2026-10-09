function CategorySpending({ transactions }) {
  // add up expenses for each category
  const totals = {};

  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    if (t.type === "expense") {
      if (totals[t.category] === undefined) {
        totals[t.category] = 0;
      }
      totals[t.category] = totals[t.category] + t.amount;
    }
  }

  // turn the object into an array and sort highest first
  const list = [];
  for (const name in totals) {
    list.push({ name: name, total: totals[name] });
  }
  list.sort((a, b) => b.total - a.total);

  return (
    <div className="border p-4 mb-4">
      <h2 className="font-semibold mb-2">Spending by Category</h2>

      {list.length === 0 && (
        <p className="text-gray-500">No expenses for this month.</p>
      )}

      {list.map((item) => (
        <div key={item.name} className="flex justify-between border-b py-2">
          <p>{item.name}</p>
          <p className="text-red-600">{item.total.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default CategorySpending;
