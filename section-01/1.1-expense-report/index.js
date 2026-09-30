const expenses = [
  { id: 1, category: "Food", amount: 120, date: "2026-08-03" },
  { id: 2, category: "Transport", amount: 45, date: "2026-08-05" },
  { id: 3, category: "Food", amount: 80, date: "2026-08-19" },
  { id: 4, category: "Rent", amount: 9000, date: "2026-08-01" },
  { id: 5, category: "Fun", amount: 350, date: "2026-09-02" },
  { id: 6, category: "Food", amount: 200, date: "2026-09-10" },
  { id: 7, category: "Transport", amount: 60, date: "2026-09-15" },
];

function getTotalByCategory(items) {
  if (!items || items.length === 0) return {};

  /*
  for (const item of items) {
  totals[item.category] = (totals[item.category] || 0) + item.amount;
  } 
  */

  return items.reduce((totals, item) => {
    totals[item.category] = (totals[item.category] || 0) + item.amount;
    return totals;
  }, {});
}

function getCategoriesBySpend(items) {
  if (!items || items.length === 0) return [];

  const totals = getTotalByCategory(items);
  // Object.keys gives an array of category names
  return Object.keys(totals).sort((a, b) => totals[b] - totals[a]);
}

function getTotalByMonth(items) {
  if (!items || items.length === 0) return {};

  return items.reduce((totals, item) => {
    // Extract year and month, e.g. "2026-08" from "2026-08-03"
    const monthKey = item.date.slice(0, 7);
    totals[monthKey] = (totals[monthKey] || 0) + item.amount;
    return totals;
  }, {});
}

function getLargestExpense(items) {
  if (!items || items.length === 0) return null;

  return items.reduce((max, current) => {
    return current.amount > max.amount ? current : max;
  }, items[0]);
}

console.log(" Expense Report");
console.log("Total per Category:", getTotalByCategory(expenses));
console.log("Categories Ordered by Spend:", getCategoriesBySpend(expenses));
console.log("Total per Month:", getTotalByMonth(expenses));
console.log("Largest Expense:", getLargestExpense(expenses));

console.log("\n Edge Case: Empty List");
console.log("Empty totals:", getTotalByCategory([]));
console.log("Empty ordered categories:", getCategoriesBySpend([]));
console.log("Empty months:", getTotalByMonth([]));
console.log("Empty largest:", getLargestExpense([]));

// Immutability check
console.log("\nCheck Immutability ");
console.log("Original List:", expenses);
console.log("Original list length:", expenses.length);
