# Product Catalog Browser

A responsive React application that fetches product categories and displays filtered products using the [DummyJSON API](https://dummyjson.com/).

## Features

- **Dynamic Category Loading:** Automatically retrieves available product categories on initial mount and selects the first one by default.
- **Category Filtering:** Allows users to filter products by clicking category badges.
- **Race Condition Handling:** Uses an `ignore` flag inside `useEffect` cleanup to ensure stale network requests do not overwrite newer user selections.
- **Loading Indicators:** Provides visual feedback while product data is being retrieved.
- **Responsive Layout:** Built with Tailwind CSS utility classes for flexible display across device screen sizes.

---

## Tech Stack

- **Framework:** React (Hooks: `useState`, `useEffect`)
- **Styling:** Tailwind CSS
- **Data Source:** [DummyJSON Products API](https://dummyjson.com/docs/products)

---

## Project Structure

```text
src/
├── components/
│   └── ProductCard.jsx      # Component to render individual product details
├── App.jsx                  # Main application component with category & product fetching
├── main.jsx                 # Application entry point
└── index.css                # Global styles and Tailwind directives
```
