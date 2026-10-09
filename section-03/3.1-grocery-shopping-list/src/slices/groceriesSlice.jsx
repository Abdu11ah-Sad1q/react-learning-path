import { createSlice } from "@reduxjs/toolkit";

const groceriesSlice = createSlice({
  name: "groceries",
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const { id, name, quantity, section } = action.payload;

      // same name in any case counts as the same item
      const existing = state.items.find(
        (item) => item.name.toLowerCase() === name.toLowerCase(),
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ id, name, quantity, section, bought: false });
      }
    },

    toggleBought(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.bought = !item.bought;
      }
    },

    renameItem(state, action) {
      const { id, name } = action.payload;
      const newName = name.trim();

      // ignore empty names
      if (newName === "") {
        alert("Item name cannot be empty.");
        return;
      }

      // ignore a name that already belongs to a different item
      const taken = state.items.some(
        (item) =>
          item.id !== id && item.name.toLowerCase() === newName.toLowerCase(),
      );
      if (taken) {
        alert("That name is already taken by another item.");
        return;
      }

      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.name = newName;
      }
    },
  },
});

export const { addItem, toggleBought, renameItem } = groceriesSlice.actions;
export default groceriesSlice.reducer;
