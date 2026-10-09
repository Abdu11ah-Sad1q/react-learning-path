# Budget Tracker

A simple monthly budget tracker built with React, Tailwind CSS and Redux Toolkit. You can add income and expenses, pick a month, and see the summary and spending for that month.

## Features

- Add a transaction with description, amount, type (income or expense), category and date
- Summary of total income, total expenses and balance (a negative balance is shown in red)
- Choose a month to see only that month's transactions and summary
- Spending per category for the chosen month, highest first
- Delete a transaction
- Friendly message and zero totals when a month has no transactions
- Zero or negative amounts cannot be added

## Tech Used

- React (Vite)
- Redux Toolkit and React-Redux
- Tailwind CSS

## Getting Started

1. Clone the repository and open the project folder:

```
   cd 3.5-budget-tracker
```

2. Install the dependencies:

```
   npm install
```

3. Start the development server:

```
   npm run dev
```

4. Open the local link shown in the terminal (usually http://localhost:5173).

## Project Structure

```
src/
  components/
    CategorySpending.jsx   -> spending per category (highest first)
    Summary.jsx            -> total income, expenses and balance
    TransactionForm.jsx    -> form to add a transaction
    TransactionList.jsx    -> list of transactions with delete button
  slices/
    TransactionSlice.jsx   -> Redux state and actions (add, delete)
  store/
    store.jsx              -> Redux store
  App.jsx                  -> month picker and main layout
  main.jsx                 -> app entry point with Redux Provider
  index.css                -> Tailwind import
```

## How It Works

- All transactions are stored in the Redux store.
- `App.jsx` keeps the selected month in state and filters the transactions by the first 7 characters of the date (for example `2026-10`).
- The filtered list is passed to the summary, category spending and transaction list, so they all update together when the month changes.

## Example

| Transaction    | Type    | Amount |
| -------------- | ------- | ------ |
| Salary         | Income  | 30,000 |
| Rent and bills | Expense | 12,500 |

Balance: **17,500**

## Notes

- Data is kept in memory only, so it resets when the page is refreshed.
- Categories are a fixed list: Food, Rent, Transport, Shopping, Salary and Other.
