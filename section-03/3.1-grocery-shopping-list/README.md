# Grocery List

A grocery shopping list that groups items by store section. Built with React, Redux Toolkit and Tailwind CSS.
\

## Features

- **Add items** with a name, quantity and section (Fruit & veg, Dairy, Bakery, Other)
- **Validation**: an empty name or a quantity that is not a whole number of 1 or more shows an error
- **Grouped by section**: items appear under their section, and empty sections are hidden
- **Tick as bought**: the item moves to the bottom of its section and is greyed out
- **Rename**: double-click an item's name. Enter saves, Escape cancels
- **No duplicates**: adding an existing name (any case) increases its quantity instead. For example, "Milk" then "milk" gives one Milk row with the quantities added together
- **Counter**: shows "5 of 12 items bought" and is always correct

## Tech stack

- React (Vite)
- Redux Toolkit and React-Redux
- Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

Then open the local address shown in the terminal (usually http://localhost:5173).

## Project structure

```
src/
  main.jsx                  Provider wraps the app
  App.jsx                   Counter and groups items by section
  sections.js               List of sections (shared by form and list)
  store/
    store.jsx               Redux store
  slices/
    groceriesSlice.js       items + addItem / toggleBought / renameItem
  components/
    AddForm.jsx             Add form with validation
    sectionGroup.jsx        One section, bought items sorted last
    ItemRow.jsx             One row: tick and rename
```

## How it works

### State

There is one Redux slice, `groceriesSlice`, holding a single `items` array. Each item looks like this:

```js
{ id: "…", name: "Milk", quantity: 2, section: "Dairy", bought: false }
```

The slice has three actions:

| Action         | What it does                                                                             |
| -------------- | ---------------------------------------------------------------------------------------- |
| `addItem`      | Adds a new item, or increases the quantity if the name already exists (case-insensitive) |
| `toggleBought` | Flips `bought` for the item with the given id                                            |
| `renameItem`   | Changes an item's name. Empty names and names already used by another item are ignored   |

### Derived data

Grouping by section, sorting bought items to the bottom, and the "bought" counter are calculated from `items` on every render. They are never stored, so they cannot get out of sync with the list.

### Local state

Form inputs, the form error message, and the rename draft are kept in local `useState`, because only one component needs each of them.

### Renaming

Double-clicking a name shows an input filled with the current name. The typed text lives in a local draft, so:

- **Enter** dispatches `renameItem` with the draft
- **Escape** closes the input without dispatching anything, so the old name stays
- Clicking away also cancels

## Behaviour checklist

- [x] Adding "Milk" then "milk" gives one Milk row with combined quantity
- [x] Ticking an item moves it to the bottom of its section
- [x] Escape while renaming keeps the old name
- [x] The bought counter is always correct
